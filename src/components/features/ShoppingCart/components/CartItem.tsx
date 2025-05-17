import { Trash } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  mainImageUrl: string;
  onQuantityChange: (id: string | number, newQuantity: number) => void;
  onRemove: (id: string | number) => void;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  // Removed unused getImageSrc function
  return (
    <div key={id} className="border rounded-lg p-4 flex flex-col">
      <div className="flex gap-4">
        <div className="relative w-24 h-24">
          <Image
            src={imageUrl || "/product-placeholder.png"}
            alt={name}
            width={100}
            height={100}
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-600 text-sm mb-2">${price.toFixed(2)}</p>

          <div className="flex items-center mt-2">
            <button
              onClick={() => onQuantityChange(id, quantity - 1)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center border rounded-l-md"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-10 h-8 flex items-center justify-center border-t border-b">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center border rounded-r-md"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => onRemove(id)}
          className="cursor-pointer text-gray-500 hover:text-red-500"
          aria-label="Remove item"
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-2 text-right">
        <p className="font-medium">
          Subtotal: ${(price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
