import styled from 'styled-components';

const ContentContainer = styled.div`
  flex-flow: column;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  overflow-y: auto;
  padding: 2rem;

  > *:not(:first-child) {
    margin-top: 2rem;
  }
`;

export default ContentContainer;
