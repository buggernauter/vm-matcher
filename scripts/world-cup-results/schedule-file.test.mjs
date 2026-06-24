import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const [{ SCHEDULE_PATH }, { readStoredSchedule }] = await Promise.all([
	import(new URL('./config.mts', import.meta.url).href),
	import(new URL('./schedule-file.mts', import.meta.url).href),
]);

test('result update flow uses world-cup-schedule.json as the canonical file', async () => {
	assert.equal(path.basename(SCHEDULE_PATH), 'world-cup-schedule.json');
	assert.equal(SCHEDULE_PATH.includes('updated-results.json'), false);

	const directFileContent = await readFile(SCHEDULE_PATH, 'utf8');
	const directSchedule = JSON.parse(directFileContent);
	const loadedSchedule = await readStoredSchedule();

	assert.deepEqual(loadedSchedule, directSchedule);
});

test('legacy updated-results.json file is not present anymore', async () => {
	const legacyResultsPath = path.join(process.cwd(), 'src/server/data/updated-results.json');

	await assert.rejects(() => access(legacyResultsPath));
});
