import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledLoader = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 90vh;
  width: 100vw;
  
  .text {
    margin-top: 10px;
  }
`;

export default function ContentLoader ({ text }) {
  return (
    <StyledLoader>
      <CircularProgress className="loader" />
      <h2 className="text">{text}</h2>
    </StyledLoader>
  );
}
