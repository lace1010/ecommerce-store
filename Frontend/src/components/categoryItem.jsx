import styled from 'styled-components';
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
    flex: 1; 
    height: 70vh;
    margin: 3px;
    position: relative;

    @media (max-width: 650px) {
    height: 50vh;
    margin: 3px 0 3px 0;
  }
  @media (max-height: 330px) {
    height: 300px;
  }
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

const InfoContainer = styled.div`
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(0,0,0,.35);
`

const Title = styled.h1`
    font-size: 60px;
    @media (max-width: 800px) {
    font-size: 40px;
  }
`

const Button = styled.button`
   padding: 10px;
   font-size: 20px;
   background: transparent;
   border: 1px solid white;
   cursor: pointer;
   color: white;
   transition: all .4s ease;

   &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 800px) {
    padding: 7px;
    font-size: 15px;
  }
`


const categoryItem = ({item}) => {
    return (
       <Container> 
            <Img src={item.img} alt={item.title + "background"}/>
                <InfoContainer>
                    <Title>
                        {item.title}
                    </Title>
                    <Link to={`/products/${item.category}`}>
                      <Button>SHOP NOW</Button>
                    </Link>
                </InfoContainer> 
       </Container>
    )
}

export default categoryItem
