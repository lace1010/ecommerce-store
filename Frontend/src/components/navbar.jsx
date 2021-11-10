import React, { useState } from 'react'
import styled from "styled-components";
import { Badge } from '@material-ui/core';
import { ShoppingCartTwoTone } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteAllProducts } from '../redux/cartRedux';
import { changeCurrentUser } from '../redux/userRedux';

/* styled-componnts is basically same as CSS, but makes naming things easier for 
each file. This way certain names won't ger overriden and we don't have to think of a bunch of different 
classNames throughout the large project. Example <div className="Container"> is same as <Container>  
with us setting Container up with styled.div */

const Container = styled.div`
    position: relative;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) {
        padding: 5px 10px;
    }
`

const Left = styled.div`
    flex: 1;
    align-items: center;
    @media (max-width: 500px) {
    flex: .8;
  }
`
const Center = styled.div`
    flex:1;
    align-items: center;
`
const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 500px) {
    flex: 1.1;
  }
`

const Shop = styled.div`
    transform-origin: left top;
    transition: all .3s ease;

    &:hover {
        color: lightblue;
        transform: scale(1.1);
    } 

    @media (max-width: 675px) {
    margin-left: 10px;
    font-size: 15px;
  }

  @media (max-width: 500px) {
    margin-left: 5px;
    font-size: 13px;
  }
`
const Logo = styled.div`
    font-weight: bold;
    text-align: center;
    transition: all .3s ease;

    &:hover {
        color: lightblue;
        transform: scale(1.1);
    } 

    @media (max-width: 675px) {
    font-size: 13px;
  }
`
const MenuItem = styled.div`
    margin-left: 25px;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        color: lightblue;
        transform: scale(1.1);
    }

    @media (max-width: 675px) {
    margin-left: 10px;
    font-size: 15px;
  }

  @media (max-width: 500px) {
    margin-left: 5px;
    font-size: 13px;
  }
`

const LogoutContainer = styled.div`
    right: 0;
    position: absolute;
    padding: 15px 30px 15px 30px;
    margin-right: 55px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 8px 1px gray;

    transition: all .3s ease;
    cursor: pointer;
    z-index: 100;
    &:hover {
        color: red;
        transform: scale(1.08);
    } 

    @media (max-width: 675px) {
    padding: 15px;
  }
  @media (max-width: 600px) {
    padding: 15px;
    font-size: 13px;
    margin-right: 50px;
  }
  @media (max-width: 500px) {
    margin-right: 45px;
    padding: 10px;
  }
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const username = useSelector(state => state.user.currentUser.username);
    const [showLogout, setShowLogout] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        setShowLogout(false);
        // logging out by just resetting user and cart in store. Will learn how to set up site with users in future to import their carts from database.
        dispatch(changeCurrentUser(""))
        dispatch(deleteAllProducts());
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Shop>
                        <Link to="/products/all">
                            SHOP
                        </Link>
                    </Shop>
                </Left>
                <Center>
                    <Logo>
                        <Link to="/">
                            ECOMMERCE
                        </Link>
                    </Logo>
                </Center>
                <Right>
                    {!username && <MenuItem>
                        <Link to="/register">
                            Register
                        </Link>
                    </MenuItem>}
                    { username 
                    ? <MenuItem>
                        <Link onClick={() => {showLogout ? setShowLogout(false) : setShowLogout(true)}} to="/">
                            Hello, {username}
                        </Link>
                      </MenuItem>
                    : <MenuItem>
                        <Link to="/login">
                            Sign In
                        </Link>
                      </MenuItem>}
                    <MenuItem>
                        <Link to="/cart">
                            <Badge color="secondary" badgeContent={quantity} max={999}>
                                <ShoppingCartTwoTone />
                            </Badge>
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper>

            {showLogout ? <LogoutContainer onClick={handleLogout}>
                Logout
            </LogoutContainer> : null}


        </Container>
    )
}

export default Navbar;
