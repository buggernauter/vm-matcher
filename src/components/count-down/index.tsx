"use client";

import { useEffect, useState } from "react";
import { StyledCounter, StyledLabel, StyledWrapper } from "./styles";

const WORLD_CUP_START = new Date("2026-06-11T21:00:00+02:00").getTime();

const getTimeRemaining = () => {
  const difference = WORLD_CUP_START - Date.now();

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
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining();

      if (!remaining) {
        clearInterval(interval);

        setTimeRemaining(null);

        return;
      }

      setTimeRemaining(remaining);
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
        {timeRemaining.totalHours}h {timeRemaining.minutes}m{" "}
        {timeRemaining.seconds}s
      </StyledCounter>
    </StyledWrapper>
  );
};
