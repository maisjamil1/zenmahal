import React, { ReactNode, useCallback } from "react";
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
  const { id, name, price, mainImageUrl } = data;
  const { addItem } = useCartActions();
  const toggleItemInCart = useCallback(() => {
    try {
      if (id && name && price && mainImageUrl) {
        addItem({
          id,
          name,
          price,
          imageUrl: mainImageUrl,
        });
      } else {
        toast.error("Missing product information");
      }
    } catch (err) {
      toast.error("Failed to add item to cart");
    }
  }, [id, name, price, mainImageUrl, addItem]);

  return <>{TriggerBtn({ onClick: toggleItemInCart })}</>;
};

export default AddToCartHandler;
