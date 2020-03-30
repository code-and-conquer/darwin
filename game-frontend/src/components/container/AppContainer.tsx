import styled from 'styled-components';
import background from '../../assets/images/background.svg';

const AppContainer = styled.div`
  text-align: center;
  background: #333333;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  background: url(${background}) #333333;
  background-repeat: no-repeat;
  background-position: center;
`;

export default AppContainer;
