import Products from "./components/Products";
import { ProductsType } from "./types";

const getProducts = async (): Promise<ProductsType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const Home = async (): Promise<JSX.Element> => {
  const products = await getProducts();

  return (
    <div>
      <Products productItems={products} />;
    </div>
  );
};

export default Home;
