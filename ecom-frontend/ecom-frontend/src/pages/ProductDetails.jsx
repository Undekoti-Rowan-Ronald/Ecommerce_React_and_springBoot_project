import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET PRODUCT
  // =========================
  useEffect(() => {
    fetch(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Product received:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to load product");
        setLoading(false);
      });
  }, [id]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/product/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete product");
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="product-details-page">
        <div className="details-loading">
          <h2>Loading product...</h2>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !product) {
    return (
      <main className="product-details-page">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Products
        </button>

        <div className="details-error">
          <h2>{error || "Product not found"}</h2>

          <button
            className="back-home-button"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
        </div>

      </main>
    );
  }

  // =========================
  // MAIN PRODUCT DETAILS
  // =========================
  return (
    <main className="product-details-page">

      {/* =========================
          BACK BUTTON
      ========================== */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Products
      </button>


      {/* =========================
          PRODUCT CARD
      ========================== */}
      <div className="product-details-card">

        {/* =========================
            PRODUCT IMAGE
        ========================== */}
        <div className="product-details-image">

          <img
            src={`http://localhost:8080/api/product/${product.id}/image`}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.style.display = "none";

              if (event.currentTarget.nextElementSibling) {
                event.currentTarget.nextElementSibling.style.display = "block";
              }
            }}
          />

          {/* Fallback */}
          <span style={{ display: "none" }}>
            🛍️
          </span>

        </div>


        {/* =========================
            PRODUCT INFORMATION
        ========================== */}
        <div className="product-details-info">

          {/* Product title */}
          <h1>{product.name}</h1>

          {/* Brand */}
          <p className="product-details-brand">
            Brand: <strong>{product.brand}</strong>
          </p>


          {/* Description */}
          <div className="product-details-description">

            <h3>Description</h3>

            <p>
              {product.description}
            </p>

          </div>


          {/* Product Information */}
          <div className="product-information">

            <h3>Product Information</h3>

            <div className="product-info-grid">

              <div className="info-item">
                <span>Product ID</span>
                <strong>{product.id}</strong>
              </div>

              <div className="info-item">
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div className="info-item">
                <span>Price</span>
                <strong>₹{product.price}</strong>
              </div>

              <div className="info-item">
                <span>Quantity</span>
                <strong>{product.quantity}</strong>
              </div>

              <div className="info-item">
                <span>Available</span>
                <strong>
                  {product.avaliable ? "Yes" : "No"}
                </strong>
              </div>

              <div className="info-item">
                <span>Release Date</span>
                <strong>{product.releaseDate}</strong>
              </div>

            </div>

          </div>


          {/* Price */}
          <div className="product-details-price">
            ₹{product.price}
          </div>


          {/* =========================
              ACTION BUTTONS
          ========================== */}
          <div className="product-actions">

            {/* ADD TO CART */}
            <button
              className="add-cart-button"
              disabled={
                !product.avaliable ||
                product.quantity <= 0
              }
              onClick={() => addToCart(product)}
            >
              {product.avaliable && product.quantity > 0
                ? "🛒 Add to Cart"
                : "Out of Stock"}
            </button>


            {/* UPDATE */}
            <button
              className="update-button"
              onClick={() =>
                navigate(`/product/${product.id}/update`)
              }
            >
              ✏️ Update
            </button>


            {/* DELETE */}
            <button
              className="delete-button"
              onClick={deleteProduct}
            >
              🗑️ Delete
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;