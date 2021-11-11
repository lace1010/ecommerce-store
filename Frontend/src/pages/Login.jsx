import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar.jsx';
import Announcement from '../components/announcement.jsx';
import Footer from '../components/footer.jsx';
import furnitureBG from '../images/furniture-bg-9.png';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentUser } from '../redux/userRedux.js';
import { publicRequest } from '../requestMethods';
import { login } from '../redux/apiCalls';

const Container = styled.div`
    height: 100vh;
    min-height: 300px;
    width: 100vw;
    background: url(${furnitureBG});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    background-color: white;
    padding: 20px;
    width: 40%;
    @media (max-width: 700px) {
        width: 70%;
    }
`

const Title = styled.h1`
    font-size: 30px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: start;
`

const Input = styled.input` 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    flex: 1;
    margin: 20px 10px 0 0;
    padding: 15px 10px;
    font-weight: 20px;
    border: 1px solid black;
`

const ALinkButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Button = styled.button`
    align-self: flex-start;
    margin-top: 20px;
    padding: 15px 20px;
    font-size: 15px;
    font-weight: 100;
    background: transparent;
    border: 1px solid black;
    cursor: pointer;
    transition: all .3s ease;
    &:disabled {
        background-color: lightgray;
        cursor: not-allowed;
    }

    &:hover {
        &:disabled {
        background-color: lightgray;
        cursor: not-allowed;
    }
        background-color: black;
        color: white;
  }

  @media (max-width: 850px) {
    padding: 8px;
    font-size: 13px;
  }
`

const ALinkContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin: 20px 10px 0 0;
`

const ALink = styled.a`
    text-decoration: underline;
    color: blue;
    font-size: 10px;
    font-weight: 200;
    margin-bottom: 5px;
    transition: all .3s ease;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
`

const ErrorMessage = styled.span`
    color: red;
    font-size: 10px;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const {isFetching} = useSelector((state) => state.user);

    const handleClick = async (e) => {
        const user = {
            username: username,
            password: password
        }

        e.preventDefault();
        // First wer call our login and see if user inputs are valid.  
        publicRequest.post('/auth/login', user).then(resp => {
            // set up conditions to display appropriate error messages
            if (
                resp.data === "incorrect password" 
                || resp.data === "Username does not exist. Usernames are case sensitive"
            ) {
                dispatch(changeCurrentUser({currentUser: ""}));
                setError(true);
                setErrorMessage(resp.data)
            } else {
                setErrorMessage("")
                setError(false);
                dispatch(changeCurrentUser({currentUser: username}));
                loginAfterSuccess();
            }
        })
    }

    const loginAfterSuccess = () => {
        if (username !== "" && password !== "") {
            login(dispatch, {username, password});
        }
    }
    return (
        <div>
            <Navbar />
            <Announcement />
            <Container>
                <Wrapper>
                <Title>Sign In</Title>
                    <Form>
                        <Input 
                            placeholder="Username" 
                            onChange={(e) => {setUsername(e.target.value)}}
                        />
                        <Input 
                            placeholder="Password" type="password"
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        {/* Change to if what we returned from /login is not successful then display message on why */}
                        { error && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <ALinkButtonContainer>
                            <Button onClick={handleClick} disabled={isFetching} >Login</Button>
                            <ALinkContainer>
                                <ALink href="#">Don't remember your password?</ALink>
                                <ALink href="/register">Create a new account</ALink>
                            </ALinkContainer>
                        </ALinkButtonContainer>
                    </Form>     
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default Login;
