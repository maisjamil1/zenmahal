import Link from "next/link";
const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
        <Link
          href="/"
          className="bg-lama text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
