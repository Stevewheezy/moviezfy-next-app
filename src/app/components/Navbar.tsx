"use client";

import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: #111;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 1.5rem;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.li`
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #f39c12;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Logo>Moviezfy</Logo>
      <NavLinks>
        <NavLink>Home</NavLink>
        <NavLink>Genres</NavLink>
        <NavLink>Search</NavLink>
      </NavLinks>
    </Nav>
  );
}
