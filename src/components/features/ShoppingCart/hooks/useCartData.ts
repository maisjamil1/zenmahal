import useClientStore from "@/hooks/useStore";
import {useCartStore} from "@/components/features/ShoppingCart/store/cartStore";
function useCartData() {
  const items = useClientStore(useCartStore, (state) => state.items);
  const itemCount = useClientStore(useCartStore, (state) =>
    state.getItemCount(),
  );
  const total = useClientStore(useCartStore, (state) => state.getTotal());

  return {
    items: items || [],
    itemCount: itemCount || 0,
    total: total || 0,
    isReady: items !== undefined,
  };
}

export default useCartData;
