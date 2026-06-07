import { StyledEmptyState } from "./styles";

type Props = {
  message: string;
};

export const EmptyStateCard = ({ message }: Props) => {
  return <StyledEmptyState>{message}</StyledEmptyState>;
};
