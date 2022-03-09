import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/navbar.jsx";
import Announcement from "../components/announcement.jsx";
import Footer from "../components/footer.jsx";
import furnitureBG from "../images/furniture-bg-7.png";
import { publicRequest } from "../requestMethods.js";
// Use publicRequest to use axios with a baseURL so can be easy to deploy and connect to backend
import { frontEndUrl } from "../requestMethods.js";

const Container = styled.div`
  height: 100vh;
  min-height: 400px;
  padding: 20px 0;
  width: 100vw;
  background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    url(${furnitureBG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  width: 50%;
  @media (max-width: 800px) {
    width: 70%;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 15px 10px;
  font-weight: 20px;
  border: 1px solid black;
  border-radius: 2px;
`;

const AgreementButtonContainer = styled.div`
  display: block;
`;
const Agreement = styled.div`
  font-size: 12px;
  margin: 20px 0;
  @media (max-width: 800px) {
    font-size: 10px;
  }
`;
const Button = styled.button`
  padding: 15px;
  font-size: 15px;
  font-weight: 100;
  background: transparent;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }

  @media (max-width: 850px) {
    padding: 8px;
    font-size: 13px;
  }
`;
const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
`;

const Register = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let email = e.target.email.value;
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // set up email regex. and regex for valid names.
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage("invalid email address.");
      return false;
    } else if (password.length <= 8) {
      setError(true);
      setErrorMessage("password needs to be at least 8 characters");
      return false;
    } else if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("passwords do not match.");
      return false;
    } else {
      setError(false);
      const newUser = {
        username: username,
        email: email,
        password: password,
      };
      publicRequest.post("/auth/register", newUser).then(handleRedirect);
    }
  };

  const handleRedirect = () => {
    alert(
      "Thank you for registering. Now sign in to your account and enjoy shopping"
    );
    // Could use useHistory.goBack() but wouldn't necessarilty go back to home page. would just go to previous page shopper was on.
    // will have to change when hosting.
    window.location.href = `${frontEndUrl}/login`;
  };
  return (
    <div>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form id="registerForm" onSubmit={handleSubmit}>
            <Input placeholder="First name" required />
            <Input placeholder="Last name" required />
            <Input placeholder="Username" name="username" required />
            <Input placeholder="Email" name="email" required />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              required
            />
            <Input
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              required
            />

            <AgreementButtonContainer>
              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>Privacy Policy</b>
              </Agreement>
              <Button type="submit" form="registerForm" value="Create">
                Create
              </Button>
            </AgreementButtonContainer>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
          {/* Then redirect page after button click once form is submitted */}
        </Wrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default Register;
