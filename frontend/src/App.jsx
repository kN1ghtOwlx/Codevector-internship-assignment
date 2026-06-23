import { useEffect, useState } from "react";
import { getProducts } from "./api/productApi";
import ProductCard from "./components/ProductCard";
import Filters from "./components/Filters";

export default function App() {
  const [products, setProducts] = useState([]);

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [cursor, setCursor] =
    useState(null);

  const [hasMore, setHasMore] =
    useState(true);

  const loadProducts = async (
    reset = false
  ) => {
    try {
      setLoading(true);

      const data = await getProducts({
        category,
        cursor: reset ? null : cursor,
        limit: 20,
      });

      if (reset) {
        setProducts(data.data);
      } else {
        setProducts((prev) => [
          ...prev,
          ...data.data,
        ]);
      }

      setCursor(
        data.pageInfo.nextCursor
      );

      setHasMore(
        data.pageInfo.hasMore
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCursor(null);
    setHasMore(true);
    loadProducts(true);
  }, [category]);

  return (
    <div className="container">
      <header>
        <h1>
          CodeVector Labs Assignment
        </h1>

        <p>
          Browse 200,000 products.
        </p>
      </header>

      <Filters
        category={category}
        setCategory={setCategory}
      />

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {loading && (
        <div className="loading">
          Loading...
        </div>
      )}

      {!loading && hasMore && (
        <div className="load-more">
          <button
            onClick={() =>
              loadProducts()
            }
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}