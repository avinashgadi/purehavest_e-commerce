import Turmeric from '../../../assets/turmeric.png';
import Tamarind from '../../../assets/tamarind.png';
import Apples from '../../../assets/apples.png';
import Eggs from '../../../assets/eggs.png';
import Moongdal from '../../../assets/moongdal.png';
import Rice from '../../../assets/rice.png';
const products = [
  {
    name: 'Sonamasoori Rice',
    quantity: '25 kgs',
    unit: '25kg',
    price: 500,
    discount: 0.5,
    image: Rice,
  },
  {
    name: 'Moong Dal',
    quantity: '5 kgs',
    unit: '5kg',
    price: 200,
    discount: 0.5,
    image: Moongdal,
  },
  {
    name: 'Apples',
    quantity: '5 kgs',
    unit: '5kg',
    price: 200,
    discount: 0.5,
    image: Apples,
  },
  {
    name: 'Eggs',
    quantity: 'Dozen',
    unit: 'dozen',
    price: 30,
    discount: 0.5,
    image: Eggs,
  },
  {
    name: 'Tamarind',
    quantity: '2kgs',
    unit: '2kg',
    price: 100,
    discount: 0.5,
    image: Tamarind,
  },
  {
    name: 'Turmeric',
    quantity: '2kgs',
    unit: '2kg',
    price: 100,
    discount: 0.5,
    image: Turmeric,
  },
];

export default function DealsOfTheDay() {
  return (
    <div className="max-w-6xl mx-auto pb-6">
      <h1 className="md:text-4xl text-2xl font-semibold text-center mb-10">Deals of the Day</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center text-center relative"
          >
            <span className="absolute top-2 left-2 text-red-500 font-semibold text-sm">-50%</span>
            <img
              src={item.image}
              alt={item.name}
              className="w-48 h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.quantity}</p>
            <p className="text-green-700 font-semibold mt-2">{item.price}/-</p>
            <button className="mt-3 bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded cursor-pointer">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
