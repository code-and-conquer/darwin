import styled from 'styled-components';

const Tab = styled.span`
  display: inline-block;
  padding: 0.5em 1em;
  color: #d4d4d4;
  cursor: pointer;
  background: #2021248c;

  &.active,
  &:hover {
    background: #202124;
  }
`;
export default Tab;
