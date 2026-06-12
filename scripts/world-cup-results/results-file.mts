const { OUTPUT_PATH } = await import(new URL('./config.mts', import.meta.url).href);
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import type { StoredMatchResult } from './types.mts';

// Reads the persisted result file so the script can avoid re-fetching known results.
export const readStoredResults = async (): Promise<Record<string, StoredMatchResult>> => {
	try {
		const fileContent = await readFile(OUTPUT_PATH, 'utf8');
		const parsed = JSON.parse(fileContent) as Record<string, StoredMatchResult>;

		return parsed ?? {};
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
			return {};
		}

		throw error;
	}
};

// Writes the updated result map only when the file contents have actually changed.
export const writeResultsFile = async (results: Record<string, StoredMatchResult>) => {
	const sortedResults = Object.fromEntries(
		Object.entries(results).sort(([leftId], [rightId]) => leftId.localeCompare(rightId, 'sv')),
	);
	const nextFileContent = `${JSON.stringify(sortedResults, null, 2)}\n`;

	await mkdir(dirname(OUTPUT_PATH), { recursive: true });

	let currentFileContent = '';

	try {
		currentFileContent = await readFile(OUTPUT_PATH, 'utf8');
	} catch (error) {
		if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
			throw error;
		}
	}

	if (currentFileContent === nextFileContent) {
		return false;
	}

	await writeFile(OUTPUT_PATH, nextFileContent, 'utf8');
	return true;
};
