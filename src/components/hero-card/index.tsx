import type { ReactNode } from "react";

import {
  StyledHeroActions,
  StyledHeroBadge,
  StyledHeroCard,
  StyledHeroText,
  StyledHeroTitle,
} from "./styles";

type Props = {
  action?: ReactNode;
  badge: ReactNode;
  description: string;
  title: string;
};

export const HeroCard = ({ action, badge, description, title }: Props) => {
  return (
    <StyledHeroCard>
      <StyledHeroBadge>{badge}</StyledHeroBadge>
      <StyledHeroTitle>{title}</StyledHeroTitle>
      <StyledHeroText>{description}</StyledHeroText>
      {action ? <StyledHeroActions>{action}</StyledHeroActions> : null}
    </StyledHeroCard>
  );
};
