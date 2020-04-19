import styled from 'styled-components';
import background from '../../assets/images/background.svg';

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  overflow-y: auto;

  text-align: center;
  background: url(${background}) #333333;
  background-repeat: no-repeat;
  background-position: center;
`;

export default AppContainer;
