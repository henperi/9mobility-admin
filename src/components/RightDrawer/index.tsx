import React, { HtmlHTMLAttributes } from 'react';

import { Styles } from './style';
import { Column } from '../UiKit/Column';
import { Button } from '../UiKit/Button';

interface IDrawer extends HtmlHTMLAttributes<HTMLDivElement> {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<boolean>;
}

export const Drawer: React.FC<IDrawer> = (props) => {
  const { setShowDrawer, children } = props;

  return (
    <Styles.Drawer {...props}>
      <Button
        onClick={() => setShowDrawer(false)}
        type="button"
        className="x-close"
      >
        x
      </Button>
      {children}
    </Styles.Drawer>
  );
};
