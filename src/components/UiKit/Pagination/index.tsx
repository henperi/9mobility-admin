import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styled from 'styled-components';
import { Style } from './styles';

import { ReactComponent as ArrowComponent } from '../../../assets/images/arrowDown.svg';
import { Colors } from '../../../themes/colors';

export const ArrowIcon = styled(ArrowComponent)<{
  angle?: number;
  color?: string;
}>`
  transform: ${({ angle }) => `rotate(${angle}deg)`};
  color: ${(props) => props.color || Colors.darkGreen};
`;

const Arrow = styled(ArrowComponent)<{
  angle?: number;
}>`
  background-color: ${Colors.white};
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  transform: ${({ angle }) => `rotate(${angle || 90}deg)`};

  * {
    color: ${Colors.blackGrey};
  }
`;

export const Pagination: React.FC<ReactPaginateProps> = (props) => {
  return (
    <Style.Pagination>
      <ReactPaginate
        previousLabel={<Arrow angle={90} />}
        nextLabel={<Arrow angle={-90} />}
        {...props}
      />
    </Style.Pagination>
  );
};
