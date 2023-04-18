"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { CartType, ProductsType } from "../types";

interface ContextProps {
  products: ProductsType[];
  setProducts: Dispatch<SetStateAction<ProductsType[]>>;
  cart: CartType[];
  setCart: Dispatch<SetStateAction<CartType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  products: [],
  setProducts: () => [],
  cart: [],
  setCart: () => [],
});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [cart, setCart] = useState<CartType[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;
