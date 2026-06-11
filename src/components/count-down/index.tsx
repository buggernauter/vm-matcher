'use client';

import { useEffect, useState } from 'react';
import { StyledCounter, StyledLabel, StyledWrapper } from './styles';
import { WORLD_CUP_START } from '@/server/constants';

type TimeRemaining = {
	totalHours: number;
	minutes: number;
	seconds: number;
};

const getTimeRemaining = (now: number): TimeRemaining | null => {
	const difference = WORLD_CUP_START - now;

	if (difference <= 0) {
		return null;
	}

	const totalHours = Math.floor(difference / (1000 * 60 * 60));

	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

	const seconds = Math.floor((difference % (1000 * 60)) / 1000);

	return {
		totalHours,

		minutes,

		seconds,
	};
};

export const Countdown = () => {
	const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

	useEffect(() => {
		const updateTimeRemaining = () => {
			const remaining = getTimeRemaining(Date.now());

			setTimeRemaining(remaining);

			return remaining;
		};

		const initialRemaining = updateTimeRemaining();

		if (!initialRemaining) {
			return;
		}

		const interval = setInterval(() => {
			const remaining = updateTimeRemaining();

			if (!remaining) {
				clearInterval(interval);
				return;
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);
	if (!timeRemaining) {
		return null;
	}
	return (
		<StyledWrapper>
			<StyledLabel>VM startar om</StyledLabel>

			<StyledCounter>
				{timeRemaining.totalHours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
			</StyledCounter>
		</StyledWrapper>
	);
};
