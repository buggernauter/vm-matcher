import test from 'node:test';
import assert from 'node:assert/strict';

const { isFinishedMatch, parseKickoffTime, shouldRunOpenAIForMatch } = await import(
	new URL('./match-window.mts', import.meta.url).href
);

test('parseKickoffTime parses stockholm summer offset timestamps', () => {
	const kickoffTime = parseKickoffTime('2026-06-14', '03.00');

	assert.equal(kickoffTime.toISOString(), '2026-06-14T01:00:00.000Z');
});

test('isFinishedMatch returns true once the two-hour result window has passed', () => {
	const now = Date.parse('2026-06-14T03:00:00.000Z');

	assert.equal(isFinishedMatch('2026-06-14', '03.00', now), true);
	assert.equal(isFinishedMatch('2026-06-14', '03.00', now - 1), false);
});

test('shouldRunOpenAIForMatch blocks matches that already have results', () => {
	const now = Date.parse('2026-06-14T04:00:00.000Z');

	assert.equal(
		shouldRunOpenAIForMatch({
			date: '2026-06-14',
			hasBaseResult: true,
			hasStoredResult: false,
			now,
			startTime: '03.00',
		}),
		false,
	);

	assert.equal(
		shouldRunOpenAIForMatch({
			date: '2026-06-14',
			hasBaseResult: false,
			hasStoredResult: true,
			now,
			startTime: '03.00',
		}),
		false,
	);
});

test('shouldRunOpenAIForMatch waits until the minimum match age threshold', () => {
	const beforeThreshold = Date.parse('2026-06-14T03:29:59.000Z');
	const atThreshold = Date.parse('2026-06-14T03:30:00.000Z');

	assert.equal(
		shouldRunOpenAIForMatch({
			date: '2026-06-14',
			hasBaseResult: false,
			hasStoredResult: false,
			now: beforeThreshold,
			startTime: '03.00',
		}),
		false,
	);

	assert.equal(
		shouldRunOpenAIForMatch({
			date: '2026-06-14',
			hasBaseResult: false,
			hasStoredResult: false,
			now: atThreshold,
			startTime: '03.00',
		}),
		true,
	);
});
