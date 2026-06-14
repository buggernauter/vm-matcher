import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { WorldCupResults } from '@/types';

export const loadLocalResults = async (): Promise<WorldCupResults> => {
	try {
		const fileContents = await readFile(
			path.join(process.cwd(), 'src/server/data/updated-results.json'),
			'utf8',
		);
		return JSON.parse(fileContents) as WorldCupResults;
	} catch {
		return {};
	}
};
