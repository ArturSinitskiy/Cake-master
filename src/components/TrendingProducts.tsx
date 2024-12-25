import { FC, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Product } from "../models/Product";

const TrendingProducts: FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTrendingProducts = () => {
      fetch("http://localhost:3001/api/trending-products")
        .then((res) => res.json())
        .then((products) => setTrendingProducts(products))
        .catch((error) => console.error('Error fetching trending products:', error));
    };

    fetchTrendingProducts();
  }, []);

  return <ProductList title="Популярные товары" products={trendingProducts} />;
};

export default TrendingProducts;
