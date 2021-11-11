import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar.jsx';
import Announcement from '../components/announcement.jsx';
import Footer from '../components/footer.jsx';
import { Remove, Add } from '@material-ui/icons';
import { useLocation } from 'react-router';
import { addProduct } from '../redux/cartRedux.js';
import { useDispatch } from 'react-redux';
import { publicRequest } from '../requestMethods';
// Use publicRequest to use axios with a baseURL so can be easy to deploy and connect to backend

const Container = styled.div`
    min-height: 60vh;
    display: flex;
    margin: 50px;

    @media (max-width: 850px) {
    margin: 50px 20px;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    margin: 0 20px;
  }
`
const ImgContainer = styled.div`
    flex:1;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: scale-down;
`

const InfoContainer = styled.div`
    flex:1;
    padding: 0 50px;

    @media (max-width: 850px) {
    padding: 0 20px;
  }
  @media (max-width: 650px) {
    padding: 0 10px;
  }
`

const Title = styled.h1`
    font-size: 50px;
    font-weight: 600;
    transition: all .3s ease;

    @media (max-width: 850px) {
    font-size: 35px;
  }

  @media (max-width: 650px) {
    text-align: center;
  }

`
const Desc = styled.div`
    margin: 20px 0;
    font-weight: 200;

    @media (max-width: 850px) {
    font-size: 15px;
  }
`
const FilterAndAddContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const FilterContainer = styled.div`
    margin-top: 40px;

    @media (max-width: 650px) {
    margin: 0;
  }
`
const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
    transition: all .3s ease;

    @media (max-width: 850px) {
    font-size: 30px;
  }
`

const Filter = styled.div`
    display: flex;
    margin-top: 10px;
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 100;
    transition: all .3s ease;

    @media (max-width: 850px) {
    font-size: 16px;
  }
`

const FilterColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid lightgray;
    background-color: ${props => props.color};
    margin-left: 5px;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        transform: scale(1.2);
        cursor: pointer;
    }
`

const AddContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NumberContainer = styled.div`
    display: flex;
    align-items: center;
`

const Icon = styled.span`
    &:hover {
        cursor: pointer;
    }
`
const Amount = styled.span`
    font-size: 20px;
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

const Button = styled.button`
   padding: 15px;
   font-size: 15px;
   font-weight: 100;
   background: transparent;
   border: 1px solid black;
   cursor: pointer;
   margin-left: 5px;
   transition: all .4s ease;

   &:hover {
    background-color: black;
    color: white;
  }

  @media (max-width: 850px) {
    padding: 8px;
    font-size: 12.5px;
  }
`

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
               const res = await publicRequest.get(`/products/find/` + id)
               setProduct(res.data);
            }catch(err) {
                console.log(err)
            }
        }
        getProduct()
    },[id])

    const handleQuantity = (type) => {
        if(type === "dec" && quantity > 1) {
            setQuantity(quantity -1);
        } else if (type === "inc" && quantity < 20) {
            setQuantity(quantity + 1);
        }
    }

    const handleClick = (e) => {
        // using redux to send product to cart with also showing the product quantity and color
        dispatch(addProduct({...product, quantity }))
    }
    return (
        <div>
            <Navbar />
            <Announcement />
            <Container>
                <ImgContainer>
                    <Img src={product.img} alt={product.title}></Img>
                </ImgContainer>
                    
                <InfoContainer>
                    {/* got to add condition or else toUpperCase() returns error bc product.title is undefined */}
                    <Title>{product.title && product.title.toUpperCase()}</Title>
                    <Desc>{product.desc}</Desc>

                    <FilterAndAddContainer>
                        <FilterContainer>
                            <Price>${product.price}</Price>
                                <Filter>
                                    <FilterText>Color:</FilterText>
                                    <FilterColor color={product.color}/>
                                </Filter>
                        </FilterContainer>

                        <AddContainer>
                            <NumberContainer>
                                <Icon><Remove onClick={() => handleQuantity("dec")}/></Icon>
                                <Amount>{quantity}</Amount>
                                <Icon><Add onClick={() => handleQuantity("inc")}/></Icon>
                            </NumberContainer>
                            <Button onClick={() => handleClick()}>ADD TO CART</Button>
                        </AddContainer>
                    </FilterAndAddContainer>
                </InfoContainer>
            </Container>
            <Footer />
        </div>
    )
}

export default Product;
