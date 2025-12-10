import Header from './Components/Header/Header'
import CarouselEffect from './Components/Carousel/Carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css'
import Category from './Components/Category/Category';

function App() {

  return (
    <>
      <Header />
      <CarouselEffect />
      <Category />
    </>
  );
}

export default App
