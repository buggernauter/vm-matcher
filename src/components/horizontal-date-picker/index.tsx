import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Flag from 'react-world-flags';

import {
	StyledDateChipContainer,
	StyledDateChip,
	StyledDateChipDay,
	StyledDateChipFlag,
	StyledDateChipMonth,
	StyledDateChipWeekday,
	StyledDatePicker,
} from './styles';

type DatePickerItem = {
	date: string;
	flagCode?: string;
	flagLabel?: string;
	hasTopRankedMatch?: boolean;
	id: string;
	label: string;
	meta?: string;
};

type Props = {
	ariaLabel: string;
	items: DatePickerItem[];
	selectedIndex: number;
	onSelect: (item: DatePickerItem, index: number) => void;
};

const DRAG_THRESHOLD = 6;

export const HorizontalDatePicker = ({ ariaLabel, items, selectedIndex, onSelect }: Props) => {
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const chipRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
	const dragStartXRef = useRef(0);
	const dragScrollLeftRef = useRef(0);
	const isPointerDownRef = useRef(false);
	const pendingSelectIndexRef = useRef<number | null>(null);
	const suppressClickRef = useRef(false);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const activeChip = chipRefs.current.get(selectedIndex);

		activeChip?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}, [selectedIndex]);

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (event.pointerType === 'mouse' && event.button !== 0) {
			return;
		}

		const chipElement = (event.target as HTMLElement).closest<HTMLButtonElement>(
			'[data-date-index]',
		);
		const chipIndex = chipElement?.dataset.dateIndex;

		pendingSelectIndexRef.current = chipIndex === undefined ? null : Number(chipIndex);
		dragStartXRef.current = event.clientX;
		dragScrollLeftRef.current = pickerRef.current?.scrollLeft ?? 0;
		isPointerDownRef.current = true;
		suppressClickRef.current = false;
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!isPointerDownRef.current || !pickerRef.current) {
			return;
		}

		const deltaX = event.clientX - dragStartXRef.current;

		if (Math.abs(deltaX) > DRAG_THRESHOLD) {
			suppressClickRef.current = true;
			if (!isDragging) {
				setIsDragging(true);
			}
		}

		if (!suppressClickRef.current) {
			return;
		}

		pickerRef.current.scrollLeft = dragScrollLeftRef.current - deltaX;
	};

	const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
		if (!suppressClickRef.current && pendingSelectIndexRef.current !== null) {
			const index = pendingSelectIndexRef.current;
			onSelect(items[index], index);
		}

		isPointerDownRef.current = false;
		pendingSelectIndexRef.current = null;
		suppressClickRef.current = false;
		setIsDragging(false);

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	return (
		<StyledDatePicker
			ref={pickerRef}
			aria-label={ariaLabel}
			$dragging={isDragging}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerEnd}
			onPointerCancel={handlePointerEnd}
			onPointerLeave={handlePointerEnd}
		>
			{items.map((item, index) => (
				<StyledDateChipContainer key={item.id}>
					{item.flagCode ? (
						<StyledDateChipFlag>
							<Flag code={item.flagCode} height="10" alt={item.flagLabel ?? ''} />
						</StyledDateChipFlag>
					) : null}
					<StyledDateChip
						type="button"
						aria-label={[
							item.label,
							item.flagLabel,
							item.hasTopRankedMatch ? 'Toppmöte' : undefined,
						]
							.filter(Boolean)
							.join(', ')}
						aria-pressed={index === selectedIndex}
						ref={(chip) => {
							if (chip) {
								chipRefs.current.set(index, chip);
								return;
							}

							chipRefs.current.delete(index);
						}}
						$active={index === selectedIndex}
						$highlighted={Boolean(item.hasTopRankedMatch)}
						data-date-index={index}
					>
						<StyledDateChipWeekday>{getCompactWeekday(item.date)}</StyledDateChipWeekday>
						<StyledDateChipDay>{getDayNumber(item.date)}</StyledDateChipDay>
						<StyledDateChipMonth>{getCompactMonth(item.date)}</StyledDateChipMonth>
					</StyledDateChip>
				</StyledDateChipContainer>
			))}
		</StyledDatePicker>
	);
};

const getCompactWeekday = (date: string) =>
	new Intl.DateTimeFormat('sv-SE', {
		weekday: 'short',
		timeZone: 'Europe/Stockholm',
	}).format(new Date(`${date}T12:00:00`));

const getDayNumber = (date: string) =>
	new Intl.DateTimeFormat('sv-SE', {
		day: '2-digit',
		timeZone: 'Europe/Stockholm',
	}).format(new Date(`${date}T12:00:00`));

const getCompactMonth = (date: string) =>
	new Intl.DateTimeFormat('sv-SE', {
		month: 'short',
		timeZone: 'Europe/Stockholm',
	}).format(new Date(`${date}T12:00:00`));
