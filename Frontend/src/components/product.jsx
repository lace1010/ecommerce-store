import styled from 'styled-components';
import { Search, ShoppingCartTwoTone } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux.js';

const IconContainer =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Icon = styled.div`
    opacity:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    margin-left: 10px;
    transition: all .4s ease;

    &:hover {
        background-color: darkgray;
        transform:scale(1.2);
        cursor: pointer;
    }
`

const InfoContainer = styled.div`
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.35);
    transition: all .4s ease;
`

const Container = styled.div`
    flex:1;
    min-width: 350px;
    height: 350px;
    background: lightgrey;
    margin: 3px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all .4s ease;

    &:hover ${Icon}{
        opacity: 1;
    }
    &:hover ${InfoContainer}{
        opacity: 1;
    }

    @media (max-width: 700px) {
        margin: 3px 0px 3px 0;
  }
`

const Img = styled.img`
    height: 75%;
    width: 280px;
    object-position: center;
`

const Price = styled.div`
    margin-top: 20px;
    color: white;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
`

const Product = ({item}) => {
    const dispatch = useDispatch();
    const handleClick = (item) => {
        // using redux to send product to cart with also showing the product quantity and color
        dispatch(addProduct({...item, quantity: 1 }))
    }
    return (
        <Container>
            <Img src={item.img} alt={item.title}/>
            <InfoContainer>
                <IconContainer>
                    <Icon>
                        <Link to={`/product/${item._id}`} aria-label={item.title}>
                            <Search />
                        </Link>
                    </Icon>
                    <Icon onClick={() => handleClick(item)}>
                        <ShoppingCartTwoTone />
                    </Icon>
                </IconContainer>
                <Price>${item.price}.00</Price>
            </InfoContainer>
            
        </Container>
    )
}

export default Product
