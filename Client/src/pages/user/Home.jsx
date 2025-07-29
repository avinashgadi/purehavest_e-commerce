import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryCarousel from './components/CategoryCarousel';
import DealsOfTheDay from './components/DealsOfTheDay';
import WhyChooseUs from './components/WhyChooseUs'; 
import HowItWorks from './components/HowItWorks';
import JoinUsBanner from './components/JoinUsBanner';
import Footer from '../../components/common/Footer';


const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <FeaturedProducts />
      <DealsOfTheDay/>
      <WhyChooseUs />
      <HowItWorks />
      <JoinUsBanner />
      <Footer />
    </div>
  );
};

export default Home;
