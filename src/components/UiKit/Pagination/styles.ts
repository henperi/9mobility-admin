// import { ReactPaginateProps } from 'react-paginate';
import styled from 'styled-components';
import { Colors } from '../../../themes/colors';

const Pagination = styled.div`
  .pagination {
    display: flex;
    width: 100%;
    list-style: none;
    padding: 0;

    .disabled {
      opacity: 0.5;
    }

    li.active {
      a {
        background-color: ${Colors.darkGreen};
        color: #fff;
      }
    }

    li {
      a {
        flex: 1;
        padding: 10px 15px;
        margin: 0 0.5px;
        border-radius: 5px;
        outline: none;
      }
    }
  }
`;

export const Style = { Pagination };
