import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar.jsx';
import Announcement from '../components/announcement.jsx';
import Footer from '../components/footer.jsx';
import { Add, Remove, DeleteForever } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'; 
import { userRequest} from '../requestMethods';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct, deleteAllProducts, subtractProductQuantity, addProductQuantity } from '../redux/cartRedux.js';

const Container = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-size: 40px;
    font-weight: 200;
    text-align: center;

    @media (max-width: 800px) {
        font-size: 30px;
    }
`

const TopContainer = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 15px;
    font-size: 15px;
    font-weight: 100;
    background: ${props => props.type === "filled" ? "black" : "transparent" };
    color: ${props => props.type === "filled" ? "white" : "black" };
    border: 1px solid black;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        background-color: ${props => props.type === "filled" ? "gray" : "black" };
        border: ${props => props.type === "filled" ? "1px solid gray" : "1px solid black" };
        color: white;
    }

    @media (max-width: 800px) {
        padding: 10px;
        font-size: 12px;
    }

    @media (max-width: 600px) {
        padding: 8px;
        font-size: 11px;
    }
`
const TopTexts = styled.div`
    display: flex;
    @media (max-width: 600px) {
        display: none;
    }
`
const TopText = styled.div`
    font-size: 12px;
    font-weight: 100;
    margin: 0 10px;
    cursor: pointer;
    text-decoration: underline;
    transition: all .3s ease;

    &:hover {
        transform: scale(1.05);
    }
    @media (max-width: 800px) {
        font-size: 11px;
    }
`

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`

const ProductContainer = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
`

const Product = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border-bottom: 1px solid #d2d2d2;

    @media (max-width: 650px) {
        padding-bottom: 15px;
    }
`

const ProductInfoContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

`

const Img = styled.img`
    width: 200px;
    height: 200px;

    @media (max-width: 900px) {
        width: 150px;
        height: 150px;
    }
`

const ProductDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const ProductName = styled.span`
    font-weight: 200;
`

const ProductId = styled.span`
    margin: 20px 0;
    font-weight: 200;
`

const ProductColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid lightgray;
    background-color: ${props => props.color};
`

const ProductPriceContainer = styled.div`
    position: relative;
    flex: .5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
        align-items: flex-start
    }
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 10px;
`

const ProductAmount = styled.div`
    font-weight: bold;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease;

    @media (max-width: 850px) {
    font-size: 14px;
    width: 25px;
    height: 25px;
    border-radius: 7px;
  }
`
const ProductPrice = styled.div`
    font-size: 18px;
    font-weight: 200;
`

const SummaryContainer = styled.div`
    flex: 1.2;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 800px) {
        margin-top: 20px;
    }
`

const SummaryTitle = styled.h2`
    font-size: 30px;
    font-weight: 200;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    font-weight: 200;
    @media (max-width: 850px) {
        font-size: 14px;
    }
`

const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Icon = styled.span`
    cursor: pointer;
`
const IconDelete = styled.span`
    cursor: pointer;
    color: red;
`
const SummaryTotalText = styled.span`
    font-size: 24px;
    font-weight: 600;
`

const SummaryTotalPrice = styled.span`
    font-size: 24px;
    font-weight: 600;
`

const SummaryButton = styled.button`
    padding: 15px;
    font-size: 15px;
    font-weight: 100;
    background: black;
    color: white;
    border: 1px solid black;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        background-color: gray;
        border: 1px solid gray;
        color: white;
    }

    @media (max-width: 800px) {
        padding: 10px;
        font-size: 12px;
    }

    @media (max-width: 600px) {
        padding: 8px;
        font-size: 11px;
    }
`

const Cart = () => {
    const KEY = process.env.REACT_APP_KEY;
    const quantity = useSelector(state => state.cart.quantity)
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                });
                dispatch(deleteAllProducts())
                history.push("/success", {stripeData: res.data, products: cart})
            } catch(err) {
                console.log(err + "<= makeRequest error")
            }
        }
        if (stripeToken && cart.total > 0) makeRequest();
    }, [stripeToken, cart.total, cart, history, dispatch])

    const handleClick = (item) => {
        dispatch(deleteProduct(item))
    }

    // Problem here ishat the inital quantity of items in cart will vary. because we use map to display all products i am not sure how to manipulate the amount by using usestate
    const handleProductQuantity = (item, type) => {
        if (type === "dec") {
            dispatch(subtractProductQuantity(item));
        } 
        // not being called.
        if (type === "inc") {
            dispatch(addProductQuantity(item));
        }
    }
    return (
        <div>
            <Navbar />
            <Announcement />
            <Container>
                <Title>YOUR BAG</Title>
                <TopContainer>
                    <Link to="/products/all">
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag {quantity}</TopText>
                    </TopTexts>
                    <StripeCheckout
                            name="ecommerce shop"
                            image=""
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                    </StripeCheckout>
                </TopContainer>

                <BottomContainer>
                    <ProductContainer>
                        {cart.products.map((item) => (
                        <Product key={item._id}>
                            <ProductInfoContainer>
                                <Img src={item.img} alt={item.title}/>
                                <ProductDetails>
                                    <ProductName><b>Product: </b>{item.title}</ProductName>
                                    <ProductId><b>ID: </b>{item._id}</ProductId>
                                    <ProductColor color={item.color}/>
                                </ProductDetails>
                            </ProductInfoContainer>
                            <ProductPriceContainer>
                                <ProductAmountContainer>
                                    {/* onClick={() => handleQuantity("dec"), item.quantity} */}
                                    <Icon onClick={() => handleProductQuantity(item, "dec")}><Remove /></Icon>
                                    <ProductAmount>{item.quantity}</ProductAmount>
                                    {/* onClick={() => handleQuantity("inc", item.quantity)} */}
                                    <Icon onClick={() => handleProductQuantity(item, "inc")}><Add/></Icon>
                                    <IconDelete><DeleteForever onClick={() => handleClick(item)}/></IconDelete>
                                </ProductAmountContainer>
                                <ProductPrice>${item.price * item.quantity}.00</ProductPrice>
                            </ProductPriceContainer>
                        </Product>
                        ))}

                    </ProductContainer>

                    <SummaryContainer>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>${cart.total.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>${(cart.total * .05).toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>-${(cart.total * .05).toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryTotalText>Total</SummaryTotalText>
                            <SummaryTotalPrice>${(cart.total).toFixed(2)}</SummaryTotalPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="ecommerce shop"
                            image=""
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <SummaryButton>CHECKOUT NOW</SummaryButton>
                        </StripeCheckout>
                    </SummaryContainer>
                </BottomContainer>
            </Container>
            <Footer />
        </div>
    )
}

export default Cart;
;