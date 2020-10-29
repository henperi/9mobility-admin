import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const TableNavLink = styled(NavLink)<{ active?: boolean }>`
  padding: 13px 0px;
  margin-right: 48px;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
  color: #8181a5;
  border-bottom: 3px solid rgba(129, 129, 165, 0);
  transition: 0.6s;
  &.active-table-nav-link {
    color: #006848;
    font-weight: 700;
    border-bottom: 3px solid #006848;
  }
`;

export const Styles = {
  TableNavLink,
};
