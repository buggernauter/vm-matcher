const { SCHEDULE_PATH } = await import(new URL('./config.mts', import.meta.url).href);
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import type { WorldCup } from '../../src/types/index.ts';

export const readStoredSchedule = async (): Promise<WorldCup[]> => {
	const fileContent = await readFile(SCHEDULE_PATH, 'utf8');

	return JSON.parse(fileContent) as WorldCup[];
};

export const writeScheduleFile = async (schedule: WorldCup[]) => {
	const nextFileContent = `${JSON.stringify(schedule, null, 2)}\n`;

	await mkdir(dirname(SCHEDULE_PATH), { recursive: true });

	let currentFileContent = '';

	try {
		currentFileContent = await readFile(SCHEDULE_PATH, 'utf8');
	} catch (error) {
		if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
			throw error;
		}
	}

	if (currentFileContent === nextFileContent) {
		return false;
	}

	await writeFile(SCHEDULE_PATH, nextFileContent, 'utf8');
	return true;
};
