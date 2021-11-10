import React from 'react';
import styled from "styled-components";
import CategoryItem from './categoryItem';
import { categories } from '../data';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 3px;

    @media (max-width: 650px) {
    margin-top: -3px;
    flex-direction: column;
  }
  @media (max-height: 330px) {
    margin-top: -3px;
    flex-direction: column;
    height: 920px;
  }
`

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem key={item.id} item={item}/>
            ))}
        </Container>

    )
}

export default Categories
