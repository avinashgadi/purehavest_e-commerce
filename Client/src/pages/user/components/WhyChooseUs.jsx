import Farmer from '../../../assets/farmer.png';
import Fruits1 from '../../../assets/fruits1.png';
import Fruits2 from '../../../assets/fruits2.png';
import Fruits3 from '../../../assets/fruits3.png';
import Fruits4 from '../../../assets/fruits4.png';
export default function WhyChooseUs() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch bg-white">
      {/* Left Image */}
      <div className="lg:w-1/2 w-full">
        <img
          src={Farmer}
          alt="Farmer in field"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 w-full bg-[#a2a141] text-white md:p-10 p-4 flex flex-col justify-center">
        <h2 className="md:text-4xl text-2xl font-semibold mb-4 text-black">Why Choose Us?</h2>
        <p className="md:text-lg text-sm mb-4 text-white ">
          We cut out the middlemen so you get farm-fresh products
          while farmers receive the full value they deserve.
        </p>
        <ul className="list-none mb-6 md:text-lg text-sm space-y-1 text-white italic">
          <li>Direct From Farm to Home</li>
          <li>Empowering Local Farmers</li>
          <li>Fresh, Organic & Authentic</li>
        </ul>

        {/* Bottom Grid Images */}
        <div className="grid grid-cols-2 gap-1 mt-auto">
          <img src={Fruits1} alt="fruits1" className="w-full md:h-70 h-50 object-cover" />
          <img src={Fruits2} alt="fruits2" className="w-full md:h-70 h-50 object-cover" />
          <img src={Fruits3} alt="berries" className="w-full md:h-70 h-50 object-cover" />
          <img src={Fruits4} alt="orange" className="w-full md:h-70 h-50 object-cover" />
        </div>
      </div>
    </div>
  );
}
