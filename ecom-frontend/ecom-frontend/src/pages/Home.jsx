import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ addToCart }) {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch("http://localhost:8080/api/products")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })

      .then((data) => {

        console.log("Products received:", data);

        setProducts(data);
        setLoading(false);
      })

      .catch((error) => {

        console.error("Error fetching products:", error);

        setError("Unable to load products");
        setLoading(false);
      });

  }, []);


  // Loading screen
  if (loading) {
    return (
      <main className="main-container">
        <h1>Loading products...</h1>
      </main>
    );
  }


  // Error screen
  if (error) {
    return (
      <main className="main-container">
        <h1>{error}</h1>
      </main>
    );
  }


  return (
    <main className="main-container">

      <h1>Products</h1>

      <div className="product-grid">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >

            {/* =========================
                PRODUCT IMAGE
            ========================== */}

            <div className="product-image">

              <img
                src={`http://localhost:8080/api/product/${product.id}/image`}
                alt={product.name}

                onError={(event) => {

                  // Hide broken image
                  event.currentTarget.style.display = "none";

                  // Show fallback icon
                  if (event.currentTarget.nextElementSibling) {
                    event.currentTarget.nextElementSibling.style.display = "block";
                  }

                }}
              />

              {/* Fallback if image doesn't exist */}
              <span style={{ display: "none" }}>
                🛍️
              </span>

            </div>


            {/* =========================
                PRODUCT INFORMATION
            ========================== */}

            <div className="product-info">

              <h2>
                {product.name}
              </h2>


              <p className="product-brand">
                Brand: {product.brand}
              </p>


              <p>
                {product.description}
              </p>


              <p>
                Category: {product.category}
              </p>


              <h3>
                ₹{product.price}
              </h3>


              <p>
                Quantity: {product.quantity}
              </p>


              <button
                className="add-cart-button"

                disabled={
                  !product.avaliable ||
                  product.quantity <= 0
                }

                onClick={(event) => {

                  // VERY IMPORTANT:
                  // Prevent clicking the button
                  // from opening Product Details.

                  event.stopPropagation();

                  addToCart(product);

                }}
              >

                {product.avaliable && product.quantity > 0
                  ? "🛒 Add to Cart"
                  : "Out of Stock"
                }

              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}

export default Home;