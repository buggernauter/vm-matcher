const { DEFAULT_MODEL } = await import(new URL('./config.mts', import.meta.url).href);
import type { OpenAIResponsePayload, PendingMatch } from './types.mts';

const buildOpenAIPrompt = ({
	pendingMatches,
	unresolvedMatches,
}: {
	pendingMatches: PendingMatch[];
	unresolvedMatches: PendingMatch[];
}) =>
	[
		'Sammanställ slutresultat för följande herr-VM-matcher i fotboll 2026.',
		'Använd webbsökning och returnera bara matcher där du kan bekräfta ett slutresultat från trovärdiga källor.',
		'Returnera bara matcher där källan tydligt visar att matchen är avslutad och att resultatet är slutresultatet.',
		'Om en match fortfarande spelas, är uppskjuten eller har oklar status ska den utelämnas.',
		'',
		'Uppdatera även kommande matcher där hemlag eller bortelag är en obekräftad platshållare (till exempel 1A, 3CEFHI, W73).',
		'Uppdatera enbart lag baserat på FIFAs officiella tillkännagivanden om vilka lag som ska spela — gör aldrig beräkningar eller förutsägelser baserat på grupp-resultat.',
		'Behåll befintlig platshållare exakt oförändrad om FIFA inte officiellt har meddelat vilket lag som spelar på den platsen.',
		'Returnera bara laguppdateringar för matcher där minst en sida kan verifieras från ett officiellt FIFA-tillkännagivande.',
		'För lagnamn ska du använda fullständiga lokaliserade lagnamn i stället för FIFA-koder, till exempel Tyskland, Mexiko, Argentina och USA.',
		'',
		'Prioritera officiella eller etablerade sportkällor. Alla datum och tider nedan är i svensk tid.',
		JSON.stringify(
			{
				pendingMatches,
				unresolvedMatches,
			},
			null,
			2,
		),
	].join('\n');

export const fetchResultsFromOpenAI = async ({
	pendingMatches,
	unresolvedMatches,
}: {
	pendingMatches: PendingMatch[];
	unresolvedMatches: PendingMatch[];
}): Promise<OpenAIResponsePayload> => {
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
				unresolvedMatches,
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
							teamUpdates: {
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
						required: ['results', 'teamUpdates'],
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
