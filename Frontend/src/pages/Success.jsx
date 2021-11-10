import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import { CheckCircleOutline } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import paperAirplane from "../images/paper-airplane.png";
import { Facebook, Twitter } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { publicRequest } from '../requestMethods.js';
// Use publicRequest to use axios with a baseURL so can be easy to deploy and connect to backend

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Icon = styled.div`
    color: #00cb00;
    transform: scale(5);
    margin: 80px 0 40px 0;
`
const Message = styled.span`
    font-size: 40px;
    padding: 20px;
    text-align: center;
`
const ThankYou = styled.span`
    color: #00cb00;
`

const Wrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    @media (max-width: 800px) {
        flex-direction: column;
  }
`

const ShareContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid lightgrey;
    width: 100%;
    padding: 30px;
    margin: 0 20px;

    @media (max-width: 800px) {
    margin: auto;
    width: 85%;
  }
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ShareTitle = styled.h1`
    font-weight: bold;
    font-size: 30px;
`

const ShareText = styled.span`
    margin: 20px 10px 20px 0;
`
const ShareButtonContainer = styled.div`
    display: flex;
`
const ShareButton = styled.a`
   font-size: 20px;
   width: 35%;
   padding: 10px 0;
   background-color: ${props => props.color};
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   transition: all .4s ease;

   &:hover {
    transform: scale(1.08);
    filter: brightness(80%);
  }

  @media (max-width: 850px) {
    padding: 8px;
    font-size: 17px;
  }
  @media (max-height: 600px) {
    padding: 8px;
    font-size: 17px;
  }
`

const ImgContainer = styled.div`
    width: 150px;
    align-self: center;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`

const OrderContainer = styled.div`
    flex:1;
    padding: 30px;
    margin-right: 20px;
    background-color: whitesmoke;
    border: 1px solid lightgrey;

    @media (max-width: 800px) {
    margin: auto;
    margin-top: 10px;
    width: 85%;
  }
`

const Title = styled.h1`
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
`

const OrderDetailTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
`

const OrderDetail = styled.div`
    margin: 10px 0;
`

const HomeButton = styled(Link)`
   margin: 30px 30px 20px 30px;
   padding: 10px;
   font-size: 20px;
   background: transparent;
   border: 1px solid black;
   cursor: pointer;
   transition: all .4s ease;

   &:hover {
    background-color: black;
    color: white;
  }

  @media (max-width: 850px) {
    padding: 8px;
    font-size: 17px;
  }
  @media (max-height: 600px) {
    padding: 8px;
    font-size: 17px;
  }
`

const Success = () => {

    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.products;
    let currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    console.log(data);
    console.log(cart);

    if (currentUser === "") {
        currentUser = { _id: "guest" }
    }

    console.log(currentUser, "<= currentUser")
    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await publicRequest.post("/order", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                      productId: item._id,
                      quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                  });
                  setOrderId(res.data._id);
            }catch(err) {
                console.log(err);
            }
        }
        data && createOrder();
    }, [cart.products, cart.total, currentUser._id, data])

    return (
        <div>
            <Navbar />
            <Container>
                <Icon><CheckCircleOutline /></Icon>
                <Message><ThankYou>THANK YOU!</ThankYou> Your order has been processed</Message>
                <Wrapper>
                    <ShareContainer>
                        <InfoContainer>
                            <ShareTitle>SHARE WITH FRIENDS!</ShareTitle>
                            <ShareText>
                                Help us spread the word by sharing our website with your friends and followers on social media!
                            </ShareText>
                            <ShareButtonContainer>
                                <ShareButton href="https://www.facebook.com/" target="_blank" color={"#3b5998"}>
                                   <Facebook/> facebook
                                </ShareButton>
                                <ShareButton href="https://twitter.com/" target="_blank" color={"#1DA1F2"} style={{"margin-left": "15px"}}>
                                   <Twitter/> twitter
                                </ShareButton>
                            </ShareButtonContainer>
                        </InfoContainer>
                        <ImgContainer>
                            <Img src={paperAirplane}/>
                        </ImgContainer>
                    </ShareContainer>

                    <OrderContainer>
                        <Title>Order Confirmation</Title>
                        <OrderDetail>Your order ID: <b>{orderId}</b></OrderDetail>
                        <OrderDetailTitle>Shipping Address: </OrderDetailTitle>
                        <OrderDetail>{data.source.name}</OrderDetail>
                        <OrderDetail>{data.source.address_line1} </OrderDetail>
                        <OrderDetail>{data.source.address_city}, {data.source.address_state}, {data.source.address_zip}</OrderDetail>
                        <OrderDetail>{data.billing_details.email}</OrderDetail>
                    </OrderContainer>
                </Wrapper>

                <HomeButton to="/">
                    Go to Homepage
                </HomeButton>

            </Container>
            <Footer/>
        </div>
    )
}

export default Success;
