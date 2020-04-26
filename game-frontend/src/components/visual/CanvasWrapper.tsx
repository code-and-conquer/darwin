import styled from 'styled-components';

const CanvasWrapper = styled.div`
  & > canvas {
    display: flex;
    justify-content: center;
    max-width: 800px;
    width: calc(100% - 20px);
    margin: 0 auto;
  }
`;

export default CanvasWrapper;
