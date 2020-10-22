import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';

interface IAvatar extends HtmlHTMLAttributes<HTMLDivElement> {
  image?: string;
  name?: string;
}
export const Avatar: React.FC<IAvatar> = ({
  image = 'https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png',
  name,
  ...props
}) => {
  return (
    <Styles.Avatar {...props}>
      <img src={image} alt={name} />
    </Styles.Avatar>
  );
};
