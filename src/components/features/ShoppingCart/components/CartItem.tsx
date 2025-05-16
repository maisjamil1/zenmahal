import Image from "next/image";
import {Trash} from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  mainImageUrl: string;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}


export default function CartItem({
  id,
  name,
  price,
  quantity,
  mainImageUrl,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
    const getImageSrc = (imageData: any): string => {
        if (!imageData) return "/product.png";

        if (typeof imageData === "string") {
            return imageData;
        }

        if (typeof imageData === "object" && imageData !== null) {
            if (imageData.src) return imageData.src;
        }

        return "/product.png";
    };
  return (
    <div key={id} className="border rounded-lg p-4 flex flex-col">
      <div className="flex gap-4">
        <div className="relative w-24 h-24">
          <Image
            src={getImageSrc(mainImageUrl)}
            alt={name}
            fill
            sizes="100px"
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-600 text-sm mb-2">${price.toFixed(2)}</p>

          <div className="flex items-center mt-2">
            <button
              onClick={() => onQuantityChange(id, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border rounded-l-md"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-10 h-8 flex items-center justify-center border-t border-b">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border rounded-r-md"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => onRemove(id)}
          className="text-gray-500 hover:text-red-500"
          aria-label="Remove item"
        >
            <Trash className="h-5 w-5"/>
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
