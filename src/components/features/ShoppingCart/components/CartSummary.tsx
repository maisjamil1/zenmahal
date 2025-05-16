interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
  checkoutLabel?: string;
  returnLink?: string;
  returnText?: string;
}

export default function CartSummary({
  getTotalPrice,
  onCheckout,
  checkoutLabel = "Proceed to Checkout",
  returnLink = "/",
  returnText = "Continue Shopping",
}: CartSummaryProps) {
  return (
    <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${getTotalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount</span>
          <span>0</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
          <span>Total</span>
          <span>${getTotalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-lama text-white py-3 rounded-md mt-6 hover:bg-opacity-90 transition"
      >
        {checkoutLabel}
      </button>

      <a
        href={returnLink}
        className="block text-center mt-4 text-lama hover:underline"
      >
        {returnText}
      </a>
    </div>
  );
}
