"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import useCartData from "@/components/features/ShoppingCart/hooks/useCartData";

const CartCounter = () => {
  const { itemCount, isReady } = useCartData();
  const router = useRouter();

  const onClickCart = () => router.push("/cart");

  return (
    <div className="relative cursor-pointer" onClick={onClickCart}>
      <ShoppingCart className="mr-2 cursor-pointer text-primary-gray-500 w-6 h-6" />
      {isReady && (
        <span className="bg-purple-600 text-white rounded-full absolute top-[-6px] right-0 w-5 h-5 flex justify-center items-center text-[12px]">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartCounter;
