import React, { FC } from 'react';
import styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap';
import { Tab } from '.';
import Button from '../visual/Button';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }

  .ml-auto {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

type Props = {
  setActiveTab: (activeTab: Tab) => void;
};

const NavigationBar: FC<Props> = ({ setActiveTab }) => {
  return (
    <>
      <Styles>
        <Navbar expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <button onClick={() => setActiveTab(Tab.START)}>Start</button>
              </Nav.Item>
              <Nav.Item>
                <button onClick={() => setActiveTab(Tab.POWERUPS)}>
                  PowerUps
                </button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    </>
  );
};

export default NavigationBar;
