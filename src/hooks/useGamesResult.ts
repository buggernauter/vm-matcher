'use client';

import { useCallback, useRef, useState } from 'react';
import {
	ERROR_RETRY_MS,
	getResolvedResults,
	MISSING_RETRY_MS,
	MatchResultCache,
	readMatchResultCache,
	writeMatchResultCache,
} from '@/lib/match-result-cache';
import { fetchGameResult } from '@/server/fetch-game-result';
import { MatchToCheck, ScrapedMatchResult } from '@/types/tournament';

export const useGamesResult = () => {
	const [resultCache, setResultCache] = useState<MatchResultCache>(() => readMatchResultCache());
	const inFlightRequestsRef = useRef<Record<string, Promise<ScrapedMatchResult | null>>>({});

	const result = getResolvedResults(resultCache);

	const persistResultCache = useCallback((nextResultCache: MatchResultCache) => {
		writeMatchResultCache(nextResultCache);
	}, []);

	const checkResult = useCallback(
		async (match: MatchToCheck) => {
			const currentCacheEntry = resultCache[match.id];
			const now = Date.now();
			if (currentCacheEntry?.status === 'success') {
				return currentCacheEntry.result;
			}
			if (
				(currentCacheEntry?.status === 'missing' || currentCacheEntry?.status === 'error') &&
				now < currentCacheEntry.retryAfter
			) {
				return null;
			}
			const inFlightRequest = inFlightRequestsRef.current[match.id];
			if (inFlightRequest) {
				return inFlightRequest;
			}
			const request = (async () => {
				try {
					const fetchedResult = await fetchGameResult(match);
					setResultCache((currentResultCache) => {
						const checkedAt = Date.now();
						const nextResultCache = {
							...currentResultCache,
							[match.id]: fetchedResult
								? {
										result: fetchedResult,
										status: 'success' as const,
									}
								: {
										checkedAt,
										retryAfter: checkedAt + MISSING_RETRY_MS,
										status: 'missing' as const,
									},
						};
						persistResultCache(nextResultCache);
						return nextResultCache;
					});
					return fetchedResult;
				} catch {
					setResultCache((currentResultCache) => {
						const checkedAt = Date.now();
						const nextResultCache = {
							...currentResultCache,
							[match.id]: {
								checkedAt,
								retryAfter: checkedAt + ERROR_RETRY_MS,
								status: 'error' as const,
							},
						};
						persistResultCache(nextResultCache);
						return nextResultCache;
					});
					return null;
				} finally {
					delete inFlightRequestsRef.current[match.id];
				}
			})();
			inFlightRequestsRef.current[match.id] = request;
			return request;
		},
		[persistResultCache, resultCache],
	);
	return {
		result,
		checkResult,
	};
};
