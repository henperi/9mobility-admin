import styled, { css, keyframes } from 'styled-components';
import { Colors } from '../../../themes/colors';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div.attrs({})<{
  isFixed: boolean;
  size: number;
}>`
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isFixed &&
    css`
      position: absolute;
      display: flex;
      z-index: 10;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      justify-content: center;
      align-items: center;
      margin: 0;
    `}

  &::before {
    content: '';
    position: absolute;
    height: inherit;
    width: inherit;
    background-color: rgba(0, 0, 0, 0.025);
    z-index: 1;
  }

  &::after {
    position: absolute;
    content: '';
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border: solid ${(props) => props.size / 10}px #fff;
    border-bottom-color: ${Colors.darkGreen};
    border-radius: 50%;
    will-change: animation;
    animation: 1.35s linear infinite ${spin};
    z-index: 1;
  }
`;

const Styles = {
  Spinner,
};

export { Styles };
