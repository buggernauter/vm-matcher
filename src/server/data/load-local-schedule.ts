import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { WorldCup } from '@/types';

export const loadLocalSchedule = async (): Promise<WorldCup[]> => {
	const fileContents = await readFile(
		path.join(process.cwd(), 'src/server/data/world-cup-schedule.json'),
		'utf8',
	);

	return JSON.parse(fileContents) as WorldCup[];
};
