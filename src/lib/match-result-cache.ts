import { getLocalStorage, setLocalStorage } from '@/lib/storage';
import { ScrapedMatchResult } from '@/types/tournament';

export const MATCH_RESULTS_STORAGE_KEY = 'match-results';
export const MISSING_RETRY_MS = 30 * 60 * 1000;
export const ERROR_RETRY_MS = 15 * 60 * 1000;

export type MatchResults = Record<string, ScrapedMatchResult>;

export type SuccessCacheEntry = {
	result: ScrapedMatchResult;
	status: 'success';
};

export type MissingCacheEntry = {
	checkedAt: number;
	retryAfter: number;
	status: 'missing';
};

export type ErrorCacheEntry = {
	checkedAt: number;
	retryAfter: number;
	status: 'error';
};

export type MatchResultCacheEntry = SuccessCacheEntry | MissingCacheEntry | ErrorCacheEntry;
export type MatchResultCache = Record<string, MatchResultCacheEntry>;

export const isScrapedMatchResult = (value: unknown): value is ScrapedMatchResult => {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const candidate = value as Partial<ScrapedMatchResult>;

	return typeof candidate.homeScore === 'number' && typeof candidate.awayScore === 'number';
};

export const isSuccessCacheEntry = (value: unknown): value is SuccessCacheEntry => {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const candidate = value as Partial<SuccessCacheEntry>;

	return candidate.status === 'success' && isScrapedMatchResult(candidate.result);
};

export const isTimedCacheEntry = (
	value: unknown,
	status: 'missing' | 'error',
): value is MissingCacheEntry | ErrorCacheEntry => {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const candidate = value as Partial<MissingCacheEntry | ErrorCacheEntry>;

	return (
		candidate.status === status &&
		typeof candidate.checkedAt === 'number' &&
		typeof candidate.retryAfter === 'number'
	);
};

export const normalizeCacheEntry = (value: unknown): MatchResultCacheEntry | null => {
	if (isSuccessCacheEntry(value)) {
		return value;
	}

	if (isTimedCacheEntry(value, 'missing')) {
		return value;
	}

	if (isTimedCacheEntry(value, 'error')) {
		return value;
	}

	if (isScrapedMatchResult(value)) {
		return {
			result: value,
			status: 'success',
		};
	}

	if (value === null) {
		return {
			checkedAt: 0,
			retryAfter: 0,
			status: 'missing',
		};
	}

	return null;
};

export const normalizeMatchResultCache = (value: unknown): MatchResultCache => {
	if (!value || typeof value !== 'object') {
		return {};
	}

	const cacheEntries = Object.entries(value as Record<string, unknown>);

	return cacheEntries.reduce<MatchResultCache>((normalizedCache, [matchId, cacheEntry]) => {
		const normalizedEntry = normalizeCacheEntry(cacheEntry);

		if (!normalizedEntry) {
			return normalizedCache;
		}

		normalizedCache[matchId] = normalizedEntry;

		return normalizedCache;
	}, {});
};

export const getResolvedResults = (cache: MatchResultCache): MatchResults =>
	Object.entries(cache).reduce<MatchResults>((resolvedResults, [matchId, cacheEntry]) => {
		if (cacheEntry.status === 'success') {
			resolvedResults[matchId] = cacheEntry.result;
		}

		return resolvedResults;
	}, {});

export const readMatchResultCache = (): MatchResultCache => {
	const storedCache = getLocalStorage<Record<string, unknown>>(MATCH_RESULTS_STORAGE_KEY, {});

	return normalizeMatchResultCache(storedCache);
};

export const writeMatchResultCache = (cache: MatchResultCache) => {
	setLocalStorage(MATCH_RESULTS_STORAGE_KEY, cache);
};
