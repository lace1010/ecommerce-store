import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 775px) {
    font-size: 40px;
  }
`;

const Spacer = ({ title }) => {
  return <Container>{title}</Container>;
};

export default Spacer;
