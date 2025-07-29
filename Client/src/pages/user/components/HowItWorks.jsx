import Buyer from '../../../assets/buyer.png';
import Farmerwoman from '../../../assets/farmerwoman.png';
export default function HowItWorks() {
  return (
   <div className="bg-white py-10 px-4">
  <h2 className="md:text-4xl text-2xl font-semibold text-center mb-10">How it works?</h2>

  <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
    {/* For Buyers */}
    <div className="bg-[#467612] text-white rounded-lg p-8 w-full md:w-96 h-[400px] text-center relative">
      <h3 className="text-2xl font-semibold mb-4">For Buyers</h3>
      <div className="text-left italic space-y-1 mb-4 text-lg">
        <p>Browse →</p>
        <p>Add to Cart →</p>
        <p>Delivered</p>
      </div>
      <img
        src={Buyer}
        alt="Buyer"
        className="w-48 h-auto mx-auto mt-6"
      />
    </div>
    <div className="bg-[#467612] text-white rounded-lg p-8 w-full md:w-96 h-[400px] text-center relative">
      <h3 className="text-2xl font-semibold mb-4">For Farmers</h3>
      <div className="text-left italic space-y-1 mb-4 text-lg">
        <p>Register →</p>
        <p>Upload</p>
        <p>Products → Start Selling</p>
      </div>
      <img
        src={Farmerwoman}
        alt="Buyer"
        className="w-48 h-auto mx-auto mt-6"
      />
    </div>
  </div>
</div>

  );
}
