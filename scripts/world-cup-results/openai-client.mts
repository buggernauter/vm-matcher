const { DEFAULT_MODEL } = await import(new URL('./config.mts', import.meta.url).href);
import type { OpenAIResponsePayload, PendingMatch, PendingPlayoffMatch } from './types.mts';

// Builds the instruction payload that tells OpenAI which matches need verified final scores.
const buildOpenAIPrompt = ({
	pendingMatches,
	playoffMatchesToResolve,
}: {
	pendingMatches: PendingMatch[];
	playoffMatchesToResolve: PendingPlayoffMatch[];
}) =>
	[
		'Sammanställ slutresultat för följande herr-VM-matcher i fotboll 2026.',
		'Använd webbsökning och returnera bara matcher där du kan bekräfta ett slutresultat från trovärdiga källor.',
		'Returnera bara matcher där källan tydligt visar att matchen är avslutad och att resultatet är slutresultatet.',
		'Verifiera även vilka lag som nu är klara för framtida slutspelsmatcher när det går att bekräfta från trovärdiga källor.',
		'För slutspelsuppdateringar ska du använda fullständiga lokaliserade lagnamn i stället för FIFA-koder, till exempel Tyskland, Mexiko, Argentina och USA.',
		'Behåll befintlig placeholder exakt oförändrad för den sida som ännu inte kan verifieras, till exempel 1A, 3CEFHI, W73 eller RU101.',
		'Returnera bara slutspelsuppdateringar för matcher där minst en sida kan verifieras tydligt från trovärdiga källor.',
		'Prioritera officiella eller etablerade sportkällor. Om en match inte kan verifieras ska den utelämnas.',
		'Om en match fortfarande spelas, är uppskjuten eller har oklar status ska den utelämnas.',
		'Alla datum och tider nedan är i svensk tid.',
		JSON.stringify(
			{
				pendingMatches,
				playoffMatchesToResolve,
			},
			null,
			2,
		),
	].join('\n\n');

// Calls the Responses API with web search and structured output so the reply can be written directly to JSON.
export const fetchResultsFromOpenAI = async (
	{
		pendingMatches,
		playoffMatchesToResolve,
	}: {
		pendingMatches: PendingMatch[];
		playoffMatchesToResolve: PendingPlayoffMatch[];
	},
): Promise<OpenAIResponsePayload> => {
	const apiKey = process.env.OPENAI_API_KEY;

	if (!apiKey) {
		throw new Error('OPENAI_API_KEY is required');
	}

	const response = await fetch('https://api.openai.com/v1/responses', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			input: buildOpenAIPrompt({
				pendingMatches,
				playoffMatchesToResolve,
			}),
			model: process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
			text: {
				format: {
					name: 'world_cup_results',
					schema: {
						type: 'object',
						properties: {
							results: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										matchId: { type: 'string' },
										homeScore: { type: 'number' },
										awayScore: { type: 'number' },
										sourceUrl: { type: 'string' },
									},
									required: ['matchId', 'homeScore', 'awayScore', 'sourceUrl'],
									additionalProperties: false,
								},
							},
							playoffTeams: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										matchId: { type: 'string' },
										homeTeam: { type: 'string' },
										awayTeam: { type: 'string' },
										sourceUrl: { type: 'string' },
									},
									required: ['matchId', 'homeTeam', 'awayTeam', 'sourceUrl'],
									additionalProperties: false,
								},
							},
						},
						required: ['results', 'playoffTeams'],
						additionalProperties: false,
					},
					strict: true,
					type: 'json_schema',
				},
			},
			tool_choice: 'required',
			tools: [{ type: 'web_search' }],
		}),
	});

	if (!response.ok) {
		throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
	}

	const payload = (await response.json()) as {
		output?: Array<{
			content?: Array<{
				text?: string;
				type?: string;
			}>;
			type?: string;
		}>;
		output_text?: string;
	};
	const outputText =
		payload.output_text ??
		payload.output
			?.find((item) => item.type === 'message')
			?.content?.find((contentItem) => contentItem.type === 'output_text')?.text;

	if (!outputText) {
		throw new Error('OpenAI response did not include output_text');
	}

	return JSON.parse(outputText) as OpenAIResponsePayload;
};
