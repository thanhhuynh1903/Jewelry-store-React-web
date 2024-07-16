import React from 'react';
import BlogHomePage from '../../assets/img/banner/blog.png';

const App = () => {
  return (
    <div className="flex flex-col justify-between md:flex-row">
      <div className="w-full p-10 mt-32 md:w-1/2 left-content">
        <h1 className="text-3xl text-bloom">Blog</h1>
        <p className="mt-3 text-xl">
          If diamonds are a girl's best friend, why can they be so intimidating? A moment in time, a
          memory to be remembered by a uniquely custom diamond creation should be magic and we're
          here to reclaim that; to redefine fine jewelry. From our unique position as diamond suppliers as
          well as personal jewelers, we have access to the most coveted stones to fit any budget. If you can
          dream it, we can make it happen and still exceed your expectations. We're your personal jewelry
          concierge intent on putting the magic back into moments.
        </p>
        <p className="mt-3 text-xl">
        Our approach to jewelry is more than just about aesthetics; 
        it's about creating an emotional connection. 
        Each piece we craft is designed with your unique story in mind, 
        whether it's an engagement ring that captures the essence of your love, or a necklace that holds sentimental value.
        We believe that jewelry should not only be beautiful but also deeply meaningful, a tangible reminder of life's most precious moments.
        </p>
        <p className="mt-3 text-xl">
        At our atelier, we blend tradition with innovation. 
        Our artisans are masters of their craft, 
        combining age-old techniques with modern technology to create pieces that are both timeless and contemporary. 
        We take pride in our meticulous attention to detail, ensuring that every diamond is perfectly set to maximize its brilliance. 
        With us, you are not just buying a piece of jewelry; you are investing in an heirloom that will be cherished for generations to come.
        </p>
        <button className="px-4 py-2 mt-5 text-hemp bg-bloom">Learn More</button>
      </div>
      <div className="relative flex items-center justify-center w-full md:w-1/2 right-content">
        <img src={BlogHomePage} alt="Woman with diamonds" className="object-cover object-center mt-10 w-screen-full h-screen-full md:mt-0" />
      </div>
    </div>
  );
};

export default App;
