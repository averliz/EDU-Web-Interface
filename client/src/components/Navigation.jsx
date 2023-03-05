import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #4e73df;
  width: 100%;
  padding: 1rem 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavMenuItem = styled.li`
  &:first-child {
    margin-right: auto;
  }
`;

const NavMenuLink = styled(NavLink)`
  display: block;
  padding: 0.5rem 1.5rem;
  color: #fff;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: #3e63b9;
  }

  &.active {
    background-color: #375ab5;
  }
`;

const Navigation = () => {
  return (
    <NavContainer>
      <NavList>
        <NavMenuItem>
          <NavMenuLink to="/" end>
            Home
          </NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink to="/dashboard">Dashboard</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink to="/tables">Tables</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink to="/forms">Forms</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink to="/cards">Cards</NavMenuLink>
        </NavMenuItem>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;
