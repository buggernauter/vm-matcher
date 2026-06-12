import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const TWO_HOURS_IN_MS = 120 * 60 * 1000;
export const MIN_MATCH_AGE_BEFORE_CHECK_MS = 150 * 60 * 1000;
export const STOCKHOLM_SUMMER_OFFSET = '+02:00';
export const DEFAULT_MODEL = 'gpt-5.5';
export const OUTPUT_PATH = resolve(
	dirname(fileURLToPath(import.meta.url)),
	'../../src/server/data/updated-results.json',
);
