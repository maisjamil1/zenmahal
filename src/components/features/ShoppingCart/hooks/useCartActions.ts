import {useCartStore} from "@/components/features/ShoppingCart/store/cartStore";
function useCartActions() {
  const { addItem, removeItem, updateQuantity, clearCart } = useCartStore();

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}

export default useCartActions;
