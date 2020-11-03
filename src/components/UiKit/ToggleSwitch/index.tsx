import React, { FC, useEffect, useState } from 'react';
import { Styles } from './styles';

export const ToggleSwitch: FC<{
  checked?: boolean;
  onChange?: any;
  id: string;
}> = (props) => {
  const { checked, children, onChange = () => null, id, ...rest } = props;
  const [state, setState] = useState(checked);

  useEffect(() => {
    setState(checked);
  }, [checked]);

  return (
    <Styles.CheckBoxWrapper>
      <Styles.CheckBox
        id={id}
        type="checkbox"
        onClick={() => onChange()}
        onKeyDown={() => onChange()}
        active={state}
        {...rest}
      />
      <Styles.CheckBoxLabel htmlFor={id} />
    </Styles.CheckBoxWrapper>
  );
};
