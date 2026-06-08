"use client";
import styled from "styled-components";

import { Activity, ComponentProps, useMemo } from "react";

export const FieldError = ({
  children,
  errors,
  ...props
}: ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <StyledErrorList>
        {uniqueErrors.map((error, index) => (
          <Activity key={index} mode={error?.message ? "visible" : "hidden"}>
            <StyledErrorItem>{error?.message}</StyledErrorItem>
          </Activity>
        ))}
      </StyledErrorList>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }
  return (
    <StyledFieldError role="alert" data-slot="field-error" {...props}>
      {content}
    </StyledFieldError>
  );
};

const StyledFieldError = styled.div`
  font-size: 0.875rem;

  font-weight: 400;

  color: ${({ theme }) => theme.palette.fail};
`;

const StyledErrorList = styled.ul`
  display: flex;

  flex-direction: column;

  gap: 0.25rem;

  margin-left: 1rem;

  list-style: disc;
`;

const StyledErrorItem = styled.li``;
