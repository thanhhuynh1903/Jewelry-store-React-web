import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/FooterHomePage';
import Banner from '../../components/banner/Banner';
import Products from '../../components/products/Products';
import TopProducts from '../../components/products/TopProduct';
import Hero from '../../components/banner/Hero';
import Blog from '../../components/banner/Blog'
import Features from 'components/banner/Feature';
import AOS from "aos";

const Home = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen mx-auto duration-200 bg-white max-w-screen-4xl dark:bg-gray-900 dark:text-white">
            <Navbar handleOrderPopup={handleOrderPopup}/>
            <Hero/>
            <Banner handleOrderPopup={handleOrderPopup}/>
            <Products />
            <Blog/>
            <Features/>
            <TopProducts handleOrderPopup={handleOrderPopup}/>
            <Footer />
        </div>
    );
};

export default Home;