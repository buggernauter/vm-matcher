"use client";

import { Activity } from "react";

import { SearchIcon, XIcon } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { FieldError } from "../field";

import { InputGroupAddon } from "../input-group-addon";

import {
  StyledForm,
  StyledInput,
  StyledInputGroup,
  StyledSubmitButton,
} from "./styles";

interface Props {
  handleSubmit: (values: string) => Promise<void> | void;
  loading: boolean;
  onClear?: () => void;
  value: string;
}

const searchSchema = z.object({
  value: z.string().min(2, { message: "At least 2 characters" }),
});

export const SearchBar = ({ handleSubmit, onClear, value }: Props) => {
  const form = useForm({
    defaultValues: { value },
    validators: { onSubmit: searchSchema },
    onSubmit: async (ctx) => {
      const { value } = searchSchema.parse(ctx.value);
      await handleSubmit(value);
    },
  });

  const hasSearchValue = value.trim().length > 0;

  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="value">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          const hasErrors = Boolean(field.state.meta.errors?.length);
          const showErrors = isInvalid && hasErrors;
          const errorId = `${field.name}-error`;

          return (
            <>
              <StyledInputGroup>
                <StyledInput
                  id="search"
                  name={field.name}
                  type="text"
                  inputMode="search"
                  role="searchbox"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    field.handleChange(nextValue);
                    if (nextValue.trim().length === 0) {
                      onClear?.();
                    }
                  }}
                  aria-invalid={isInvalid}
                  aria-describedby={showErrors ? errorId : undefined}
                  placeholder=""
                />
                <InputGroupAddon align="inline-end">
                  {hasSearchValue ? (
                    <StyledSubmitButton
                      type="button"
                      aria-label="Clear search"
                      size="sm"
                      onClick={() => {
                        field.handleChange("");

                        onClear?.();
                      }}
                    >
                      <XIcon aria-hidden="true" />
                    </StyledSubmitButton>
                  ) : (
                    <StyledSubmitButton
                      type="submit"
                      aria-label="Submit search"
                      disabled={field.state.value.trim().length === 0}
                      size="sm"
                    >
                      <SearchIcon aria-hidden="true" />
                    </StyledSubmitButton>
                  )}
                </InputGroupAddon>
              </StyledInputGroup>
              <Activity mode={isInvalid ? "visible" : "hidden"}>
                <FieldError errors={field.state.meta.errors} />
              </Activity>
            </>
          );
        }}
      </form.Field>
    </StyledForm>
  );
};
