import styled from 'styled-components';
import Product from "./product.jsx";
// import { popularProducts } from '../data';
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';
// Use publicRequest to use axios with a baseURL so can be easy to deploy and connect to backend


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Products = ({category, filters, sort}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
   

    useEffect(() => {
            const getProducts = async () => {
                try {
                    let receivedAPI;
                    if (category === "sofas" || category === "chairs" || category === "outdoors") {
                        receivedAPI = await publicRequest.get(`/products?category=${category}`)
                    } else {
                        receivedAPI = await publicRequest.get("/products")
                    }
                    // console.log(receivedAPI.data + " <= receivedAPI.data");
                    setProducts(receivedAPI.data);
                } catch(err) {
                    console.log(err +" <= error")
                }
            }
            getProducts();
    }, [category])

    useEffect(() => {
        category &&
          setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
              // can't use key because item from database uses "categories" as an array instead of category. then a string. I am not changing the database as it is a waste of time so this way fixes it.
                item[key].includes(value)
              )
            )
          );
      }, [products, category, filters]);

    useEffect(() => {
        if(sort === "newest") {
            setFilteredProducts((prev) => 
            [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          );
        } else if (sort === "asc") {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.price - b.price)
              );
        } else if (sort === "desc") {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => b.price - a.price)
              );
        } else if (sort === "reset") {
            setFilteredProducts(products);
        }
    }, [sort, products])  

    return (
        <Container>
            {category 
            ? filteredProducts.map((item) => (<Product item={item} key={item._id}/> ))
            : products.slice(0,8).map((item) => (<Product item={item} key={item._id}/> ))
            }
        </Container>
    )
}

export default Products
