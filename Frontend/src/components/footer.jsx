import { Facebook, Instagram, Pinterest, Twitter, LocationOn, Phone, EmailOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import paymentImage from '../images/payment.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    color: #616161;
    background-color: whitesmoke;

    @media (max-width: 775px) {
        flex-direction: column;
  }
`
const InfoContainer = styled.div`
    flex: 1;
    margin: 20px 20px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 775px) {
        padding: 0 20px;
  }
`
const InfoTitle = styled.h2`
    font-size: 25px;
    font-weight: 520;
`
const Desc = styled.div`
    font-weight: 100;
    margin: 20px 0;
`
const SocialContainer = styled.div`
    display:flex;
`

const SocialLink = styled.div`
    margin-right: 10px;
    transition: all .4s ease;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
        transform: scale(1.2);
    }
`
const UsefulLinksContainer = styled.div`
    flex: 1;
    margin: 20px 20px 20px 10px;
    @media (max-width: 775px) {
        padding: 0 20px;
  }
`

const UsefulTitle = styled.h2`
    font-size: 15px;
    font-weight: 600;
`

const List = styled.ul`
    margin: 20px 0 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    list-style-type: none;
    margin-bottom: 10px;
    transition: all .3s ease;
    transform-origin: left top;

    &:hover {
        transform: scale(1.05);
    }
`

const StyledLink = styled(Link)`
    color: #616161;
    transition: all .3s ease;

    &:hover {
        cursor: pointer;
        color: lightblue;
    }
`

const ContactContainer = styled.div`
    margin: 20px 20px 20px 10px;
    flex: 1;
    @media (max-width: 775px) {
        padding: 0 20px;
  }
`
const ContactTitle = styled.h2`
    font-size: 15px;
    font-weight: 600;
`
const ContactItem = styled.a`
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: #616161;
    transition: all .3s ease;

    &:hover {
        font-size: 16.5px;
        cursor: pointer;
        color: lightblue;
    }
`
const Payment = styled.img`
    margin-top: 20px;
`

const Copyright = styled.div`
    background-color: #505050;
    color: white;
    text-align: center;
    padding: 8px;
    font-size: 14px;
`
    
const Footer = () => {

    return (
        <div>
        <Container>
            <InfoContainer>
                <InfoTitle>ECOMMERCE</InfoTitle>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Venenatis urna cursus eget nunc. </Desc>
                <SocialContainer>
                    <SocialLink color="3B5999">
                        <Facebook/>
                    </SocialLink>
                    <SocialLink color="E4405F">
                        <Instagram />
                    </SocialLink>
                    <SocialLink color="55ACEE" >
                        <Twitter />
                    </SocialLink>
                    <SocialLink color="E60023">
                        <Pinterest />
                    </SocialLink>
                </SocialContainer>
            </InfoContainer>

            <UsefulLinksContainer>
                <UsefulTitle>USEFUL LINKS</UsefulTitle>
                <List>
                    <ListItem><StyledLink to="/">Home</StyledLink></ListItem>
                    <ListItem><StyledLink to="/cart">Cart</StyledLink></ListItem>
                    <ListItem><StyledLink to="/products/all">Shop</StyledLink></ListItem>
                    <ListItem><StyledLink to="/products/sofas">Sofas</StyledLink></ListItem>
                    <ListItem><StyledLink to="/products/chairs">Chairs</StyledLink></ListItem>
                    <ListItem><StyledLink to="/products/outdoors">Outdoors</StyledLink></ListItem>
                </List>
            </UsefulLinksContainer>

            <ContactContainer>
                <ContactTitle>CONTACT US</ContactTitle>
                <ContactItem href="https://www.google.com/maps/place/1000+Iowa+Ave,+Holton,+KS+66436,+USA/@39.4720408,-95.7411546,17z/data=!3m1!4b1!4m5!3m4!1s0x87be4ad70b8dc829:0xebeafaacb84abb81!8m2!3d39.4720408!4d-95.7389659"
                 target="_blank">
                     <LocationOn/> 1000 Iowa Ave, Holton, Kansas(KS), 66436
                </ContactItem>
                <ContactItem href="tel: +1-(123)-456-7890"><Phone/> +1-(123)-456-7890</ContactItem>
                <ContactItem href="mailto: contact@ecommerce.com"><EmailOutlined/> contact@ecommerce.com</ContactItem>
                <Payment src={paymentImage}/>
            </ContactContainer>
        </Container>
        <Copyright>	&copy; 2021 Hunter Lacefield </Copyright>
        </div>
    )
}

export default Footer
