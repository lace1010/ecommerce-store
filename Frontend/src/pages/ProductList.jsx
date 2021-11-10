import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar.jsx';
import Announcement from '../components/announcement.jsx';
import Footer from '../components/footer.jsx';
import Products from '../components/products.jsx';
import { useLocation } from 'react-router-dom';
import { RefreshOutlined } from '@material-ui/icons';


const Title = styled.h1`
    font-size: 50px;
    margin: 20px;

    @media (max-width: 675px) {
        font-size: 40px;
    }
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 650px) {
        flex-direction: column;
    }
`

const Filter = styled.div`
    display: flex;
    margin: 15px;
    @media (max-width: 650px) {
        margin: 5px;
    }
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 60px;

    @media (max-width: 675px) {
        font-size: 17px;
    }
`

const Select = styled.select`
    margin-left: 5px;
    padding: 5px;
`
const Option = styled.option``

const Refresh = styled.div`
    margin-left: 5px;
    align-items: center;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        color: lightgray;
        transform: scale(1.1);
    } 
`
const ProductList = () => {
    // gets the path name inside location object from url (import it from react-router-dom)
    const location = useLocation();
    //gets the category from pathname
    const category = location.pathname.split("/")[2];
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState("select");

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value 
        })
    }
    return (
        <div>
            <Navbar />
            <Announcement />
            <Title>{(category === "sofas" || category === "chairs" || category === "outdoors") ? category.toUpperCase() : "All"}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter products:</FilterText>
                    <Select name="color" onChange={handleFilter}>
                        <Option disabled>Color</Option>
                        <Option>white</Option>
                        <Option>gray</Option>
                        <Option>green</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>tan</Option>
                    </Select>
                    <Refresh onClick={() => {window.location.reload(true)}}><RefreshOutlined /></Refresh>
                </Filter>
                <Filter>
                    <FilterText>Sort products:</FilterText>
                    <Select onChange={(e) => {setSort(e.target.value)}}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>

            <Products category={category} filters={filter} sort={sort} />
            <Footer />
        </div>
    )
}

export default ProductList
