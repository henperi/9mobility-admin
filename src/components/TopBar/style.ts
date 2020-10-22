import styled from 'styled-components';
import { ITopBar } from '.';
// import { Colors } from '../../themes/colors';
import { ScreenSizes } from '../UiKit/Column/styles';

const TopBar = styled.div<ITopBar>`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.05);
  height: 96px;
  display: flex;
  align-items: center;
  padding: 0 4%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  z-index: 10;

  div {
    span,
    img {
      /* margin-left: 20px; */
    }

    .mobile-dowloads {
      @media (max-width: ${ScreenSizes.md}px) {
        position: fixed;
        bottom: 1%;
        right: 2%;
        display: flex;
        flex-direction: column;

        img {
          opacity: 0.5;
          margin-left: 0;
          margin-top: 10px;

          &:hover,
          &:focus {
            opacity: unset;
          }
        }
      }
    }
  }
`;

const HanburgerMenu = styled.div`
  width: 25px;
  height: 15px;
  position: relative;
  margin-right: 20px;
  cursor: pointer;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e9e9f1;
  }

  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 70%;
    height: 3px;
    background-color: #e9e9f1;
  }
`;

export const Styles = {
  TopBar,
  HanburgerMenu,
};
