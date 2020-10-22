import React from 'react';
import { Styles } from './styles';

export const PageBody: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    centeralize?: boolean;
    dark?: boolean;
  }
> = (props) => {
  const { children, centeralize = false, ...rest } = props;
  return (
    <Styles.PageBody {...rest} centeralize={centeralize}>
      {children}
    </Styles.PageBody>
  );
};
