import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';
import { ScreenSizes } from '../UiKit/Column/styles';
// import { ScreenSizes } from '../../Column/styles';

const SideBar = styled.div<{ showSidebar?: boolean }>`
  height: 100vh;
  width: fill-available;
  background-color: ${Colors.white};
  padding-left: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;
  max-width: 240px;
  min-width: 240px;
  background: linear-gradient(145.03deg, #1c1d21 2.22%, #8181a5 147.97%);

  @media (max-width: ${ScreenSizes.lg - 0.1}px) {
    /* display: none; */
    position: fixed;
    transform: ${({ showSidebar }) =>
      showSidebar ? 'translateX(0)' : `translateX(-${rem(240)})`};
    transition: transform 600ms ease-in-out;
  }
`;

// Link

const SideBarLink = styled(NavLink)<{ active?: boolean }>`
  padding: ${rem(8)};
  padding-left: ${rem(25)};
  margin-top: ${rem(6)};
  position: relative;
  display: flex;
  color: #b5bfbc;
  font-size: ${rem(14)};
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${rem(6)};
    path {
      stroke: ${Colors.white} !important;
    }
    color: ${Colors.white} !important;
  }

  &.active-sidebar-link {
    font-weight: 600;
    color: #ffffff;

    svg {
      path {
        stroke: ${Colors.yellowGreen} !important;
      }
      color: ${Colors.yellowGreen} !important;
    }

    &:after {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      width: ${rem(6)};
      height: 100%;
      background-color: ${Colors.yellowGreen};
    }
  }

  ${({ active }) =>
    active &&
    css`
      font-weight: 600;
      color: ${Colors.yellowGreen};

      &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: ${rem(6)};
        height: 100%;
        background-color: ${Colors.yellowGreen};
      }
    `}
`;

export const Styles = {
  SideBar,
  SideBarLink,
};
