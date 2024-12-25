import { FC, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Product } from "../models/Product";

const LatestProducts: FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLatestProducts = () => {
      fetch("http://localhost:3001/api/latest-products")
        .then((res) => res.json())
        .then((products) => setLatestProducts(products))
        .catch((error) => console.error('Error fetching latest products:', error));
    };

    fetchLatestProducts();
  }, []);

  return <ProductList title="Новые продукты" products={latestProducts} />;
};

export default LatestProducts;
