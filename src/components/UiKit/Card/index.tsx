import React, { HtmlHTMLAttributes } from 'react';
import { Styles, ICardProps } from './styles';

export const Card: React.FC<HtmlHTMLAttributes<HTMLDivElement> & ICardProps> = (
  props,
) => {
  const { children, cardHeader, ...rest } = props;
  return <Styles.Card {...rest}>{children}</Styles.Card>;
};
