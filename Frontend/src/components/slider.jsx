import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { sliderItems } from '../data';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    overflow: hidden;
    height: 80vh;
    position: relative;

    @media (max-width: 650px) {
        display: none;
  }

  @media (max-height: 330px) {
        display: none;
  }

`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    cursor: pointer;
    position: absolute;
    top:0;
    bottom: 0;
    /* part of styled-components library. can give props to div Arrow. depending on the prop we will set a left or right value */
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: .6;
    background-color: lightgray;
    z-index:99;
    transition: all .4s ease;

    &:hover {
    transform: scale(1.2);
  }
`
const Wrapper = styled.div`
    height: 80vh;
    display: flex;
    transform: translateX(${(props) =>  props.slideIndex * -100}vw);
    transition: all .5s ease;
`

const Slide = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
`

const ImgContainer = styled.div`
    height: 100%;
    flex: 1.75;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`
const InfoContainer = styled.div`
    flex:1;
    padding: 50px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 850px) {
    padding: 40px;
  }

  @media (max-height: 410px) {
    margin-top: 0px;
  }
`

const Title = styled.h1`
    font-size: 70px;
    transition: all .3s ease;

    @media (max-width: 850px) {
        font-size: 40px;
  }
  @media (max-height: 600px) {
        font-size: 40px;
  }
`
const Desc = styled.div`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;

    @media (max-width: 850px) {
    font-size: 17px;
  }
  @media (max-height: 600px) {
    font-size: 17px;
  }
`

const Button = styled.button`
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

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }
        if (direction === "right") {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeft style={{ fontSize: 40 }}/>
            </Arrow>

            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item)=> (
                    <Slide key={item.id}>
                        <ImgContainer>
                            <Img src={item.img} alt={item.title + "background"}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>
                                {item.title}
                            </Title>
                            <Desc>
                                {item.desc}
                            </Desc>
                            <Link to="/products/all">
                                <Button>
                                    SHOP NOW
                                </Button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}

            </Wrapper>

            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRight style={{ fontSize: 40 }}/>
            </Arrow>

        </Container>
    )
}

export default Slider
