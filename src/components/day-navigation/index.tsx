import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  StyledDayLabel,
  StyledDayMeta,
  StyledDayNavigation,
  StyledDaySummary,
  StyledIconButton,
} from "./styles";

type Props = {
  isOnFirst: boolean;
  isOnLast: boolean;
  label: string;
  meta: string;
  onNext: () => void;
  onPrevious: () => void;
};

export const DayNavigation = ({
  isOnFirst,
  isOnLast,
  label,
  meta,
  onNext,
  onPrevious,
}: Props) => {
  return (
    <StyledDayNavigation>
      <StyledIconButton
        type="button"
        aria-label="Föregående matchdag"
        onClick={onPrevious}
        disabled={isOnFirst}
      >
        <ChevronLeft aria-hidden="true" />
      </StyledIconButton>

      <StyledDaySummary>
        <StyledDayLabel>{label}</StyledDayLabel>
        <StyledDayMeta>{meta}</StyledDayMeta>
      </StyledDaySummary>

      <StyledIconButton
        type="button"
        aria-label="Nästa matchdag"
        onClick={onNext}
        disabled={isOnLast}
      >
        <ChevronRight aria-hidden="true" />
      </StyledIconButton>
    </StyledDayNavigation>
  );
};
