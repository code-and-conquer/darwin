import styled from 'styled-components';

const CanvasWrapper = styled.div`
  & > canvas {
    max-width: 800px;
    width: calc(100% - 20px);
    margin: 0 auto;
    opacity: 0.7;
    box-shadow: 0 0 14px 7px rgba(0, 0, 0, 0.5);
  }
`;

export default CanvasWrapper;
