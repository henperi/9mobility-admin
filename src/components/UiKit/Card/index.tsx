import React, { HtmlHTMLAttributes } from 'react';
import { Styles, ICardProps } from './styles';
import { Column } from '../Column';

export const Card: React.FC<HtmlHTMLAttributes<HTMLDivElement> & ICardProps> = (
  props,
) => {
  const { children, cardHeader, ...rest } = props;
  return (
    <Styles.Card {...rest}>
      <Column fullHeight>{children}</Column>
    </Styles.Card>
  );
};
