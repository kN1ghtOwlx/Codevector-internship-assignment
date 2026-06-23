export default function ProductCard({ product }) {
    return (
      <div className="product-card">
        <div className="category-badge">
          {product.category}
        </div>
  
        <h3>{product.name}</h3>
  
        <p className="price">
          ₹{product.price.toLocaleString()}
        </p>
  
        <div className="dates">
          <small>
            Created:
            {new Date(
              product.created_at
            ).toLocaleDateString()}
          </small>
  
          <small>
            Updated:
            {new Date(
              product.updated_at
            ).toLocaleDateString()}
          </small>
        </div>
      </div>
    );
  }