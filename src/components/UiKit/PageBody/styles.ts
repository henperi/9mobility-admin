import styled, { css } from 'styled-components';

const PageBody = styled.div.attrs({})<{
  centeralize?: boolean;
  dark?: boolean;
}>`
  ${({ centeralize }) =>
    centeralize &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  min-height: calc(100vh - 96px);
  padding: 4%;
  position: relative;
  width: 100%;
  z-index: 1;
  background-color: #f5f5fa;

  ${({ dark }) =>
    dark
      ? css`
          background: linear-gradient(
            145.03deg,
            #1c1d21 2.22%,
            #8181a5 147.97%
          );
        `
      : ''}
`;

const Styles = {
  PageBody,
};

export { Styles };
