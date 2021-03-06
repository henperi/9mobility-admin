import styled from 'styled-components';
import { Colors } from '../../themes/colors';
import { ScreenSizes } from '../UiKit/Column/styles';

const Drawer = styled.div<{ showDrawer?: boolean }>`
  height: 100vh;
  background-color: ${Colors.white};
  padding: 50px 25px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  overflow-y: auto;
  max-width: 424px;
  min-width: 424px;
  box-shadow: 2px 0px 24px 2px #eee;

  transform: ${({ showDrawer }) =>
    showDrawer ? `translateX(0px)` : `translateX(424px)`};

  transition: transform 600ms ease-in-out;

  @media (max-width: ${ScreenSizes.sm - 0.1}px) {
    max-width: 90%;
    min-width: 90%;
    /* transform: ${({ showDrawer }) =>
      showDrawer ? `translateX(0px)` : `translateX(300px)`}; */
  }

  @media (min-width: ${ScreenSizes.sm}px) and (max-width: ${ScreenSizes.md -
    0.1}px) {
    max-width: 350px;
    min-width: 350px;
    transform: ${({ showDrawer }) =>
      showDrawer ? `translateX(0px)` : `translateX(350px)`};
  }

  .x-close {
    all: unset;
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 14px;
    font-size: 14px;
    background-color: ${Colors.white};
    box-shadow: 0px 2px 34px 0px ${Colors.blackGrey};
    outline: none;
    border: none;
  }
`;

export const Styles = {
  Drawer,
};
