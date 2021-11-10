import React from 'react'
import Navbar from '../components/navbar.jsx';
import Announcement from '../components/announcement.jsx';
import Slider from '../components/slider.jsx'
import Categories from '../components/categories.jsx';
import Products from '../components/products.jsx';
import Spacer from '../components/spacer.jsx';
import Footer from '../components/footer.jsx'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Announcement />
            <Slider />
            <Categories />
            <Spacer title={"TOP SELLERS"}/>
            <Products />
            <Footer />
        </div>
    )
}

export default Home
