'use client';

import { useCallback, useEffect, useState } from 'react';

import { subscribeToPageActivation } from '@/lib/helper';
import { endpoints } from '@/server/endpoints';
import { fallbackScheduleData } from '@/server/data/schedule-base';
import { WorldCupScheduleResponse } from '@/types';

const REFRESH_INTERVAL_MS = 60_000;

export const useWorldCupSchedule = () => {
	const [schedule, setSchedule] = useState<WorldCupScheduleResponse>(fallbackScheduleData);

	const refreshSchedule = useCallback(async () => {
		try {
			const response = await fetch(endpoints.worldCupSchedule, {
				cache: 'no-store',
			});

			if (!response.ok) {
				return;
			}

			const nextSchedule = (await response.json()) as WorldCupScheduleResponse;
			setSchedule(nextSchedule);
		} catch {
			// Keep the last known schedule data if refresh fails.
		}
	}, []);

	useEffect(() => {
		const loadInitialSchedule = async () => {
			await refreshSchedule();
		};

		void loadInitialSchedule();

		const intervalId = window.setInterval(() => {
			void refreshSchedule();
		}, REFRESH_INTERVAL_MS);

		const unsubscribe = subscribeToPageActivation(() => {
			void refreshSchedule();
		});

		return () => {
			window.clearInterval(intervalId);
			unsubscribe();
		};
	}, [refreshSchedule]);

	return { schedule };
};
