import React, { ReactNode, useCallback, useEffect } from "react";
import { toast } from "sonner";
import useCartActions from "@/components/features/ShoppingCart/hooks/useCartActions";

interface IProps {
  data: {
    id: string;
    slug?: string;
    name?: string;
    price?: number;
    mainImageUrl?: string;
    hoverImageUrl?: string;
    description?: string;
  };
  TriggerBtn: (props: { onClick: () => void }) => ReactNode;
}

const AddToCartHandler = ({ TriggerBtn, data }: IProps) => {
  const { id, slug, name, price, mainImageUrl, hoverImageUrl, description } =
    data;
  const { addItem } = useCartActions();
  const toggleItemInCart = useCallback(() => {
    try {
      addItem({
        id,
        name,
        price,
      });
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error("Error adding item to cart:", err);
    }
  }, [id, addItem]);

  return <>{TriggerBtn({ onClick: toggleItemInCart })};</>;
};

export default AddToCartHandler;
