import React from "react";
import { Carousel } from "react-responsive-carousel";
import { carouselData } from "../../assets/Carousel-images/data";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carouselBanner from './Carousel.module.css';
const CarouselEffect = () => {
  return (
    <div className={carouselBanner.carousel_container}>
      <Carousel
        autoPlay={true}
        infiniteLoop
       showIndicators={false}
       showThumbs={false}
        showArrows={false}
        showStatus={false}
        stopOnHover={false}
      >
        {carouselData.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className={carouselBanner.carousel_bottom_fade}>
      </div>
    </div>
  );
};

export default CarouselEffect;
