import styled from "styled-components";

export const NavbarCard = styled.div`
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: self-start;
  padding: 20px 15px;
  min-height: 100%;
  position: relative;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    transform: translateX(-100%);
    padding: 30px 20px;

    &.open {
      transform: translateX(0);
    }
  }
`;

export const NavbarOption = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: #ddd6f3;
    border-radius: 10px;
    padding: 10px 0px 10px 10px;
  }
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

export const NavbarOptionText = styled.p`
  margin-left: 0.5rem;
`;

export const NavbarTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 15px 0px;

  @media (max-width: 768px) {
    margin: 30px 0px;
    font-size: 35px;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 1rem;
    left: 1rem;
    ${({ isOpen }) =>
      isOpen &&
      `
      right: 1rem;
      left: auto;
    `}
    font-size: 2rem;
    z-index: 1001;
    cursor: pointer;
    color: black;
  }
`;
