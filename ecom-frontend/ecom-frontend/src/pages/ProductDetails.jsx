import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function ProductDetails({ addToCart }) {

    // ==========================================
    // Get product ID from URL
    // ==========================================

    const { id } = useParams();


    // ==========================================
    // Navigation
    // ==========================================

    const navigate = useNavigate();


    // ==========================================
    // Product state
    // ==========================================

    const [product, setProduct] = useState(null);


    // ==========================================
    // Loading state
    // ==========================================

    const [loading, setLoading] = useState(true);


    // ==========================================
    // Error state
    // ==========================================

    const [error, setError] = useState("");


    // ==========================================
    // Fetch product
    // ==========================================

    useEffect(() => {

        fetch(`http://localhost:8080/api/product/${id}`)

            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        `Backend returned ${response.status}`
                    );

                }

                return response.json();

            })

            .then((data) => {

                console.log(
                    "Product received:",
                    data
                );

                setProduct(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setError(error.message);

                setLoading(false);

            });

    }, [id]);


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <main className="product-details-page">

                <h1>
                    Loading product...
                </h1>

            </main>

        );

    }


    // ==========================================
    // Error
    // ==========================================

    if (error) {

        return (

            <main className="product-details-page">

                <div className="error-card">

                    <h1>
                        Unable to load product
                    </h1>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        ← Back to Products
                    </button>

                </div>

            </main>

        );

    }


    return (

        <main className="product-details-page">


            {/* ==================================
                BACK BUTTON
                ================================== */}

            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Products
            </button>


            {/* ==================================
                PRODUCT DETAILS CARD
                ================================== */}

            <div className="product-details-card">


                {/* ==================================
                    LEFT SIDE
                    ================================== */}

                <div className="product-details-image">

                    <span>
                        🛍️
                    </span>

                </div>


                {/* ==================================
                    RIGHT SIDE
                    ================================== */}

                <div className="product-details-info">


                    {/* Category */}

                    <span className="details-category">

                        {product.category}

                    </span>


                    {/* Product name */}

                    <h1>

                        {product.name}

                    </h1>


                    {/* Brand */}

                    <p className="details-brand">

                        <strong>
                            Brand:
                        </strong>

                        {" "}

                        {product.brand}

                    </p>


                    {/* Description */}

                    <div className="details-section">

                        <h3>
                            Description
                        </h3>

                        <p>
                            {product.description}
                        </p>

                    </div>


                    {/* Product information */}

                    <div className="details-section">

                        <h3>
                            Product Information
                        </h3>


                        <div className="details-grid">


                            <div className="detail-item">

                                <span>
                                    Product ID
                                </span>

                                <strong>
                                    #{product.id}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Category
                                </span>

                                <strong>
                                    {product.category}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Price
                                </span>

                                <strong className="detail-price">
                                    ₹{product.price}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {product.quantity}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Availability
                                </span>

                                <strong
                                    className={
                                        product.avaliable
                                            ? "available"
                                            : "not-available"
                                    }
                                >

                                    {product.avaliable
                                        ? "Available"
                                        : "Not Available"
                                    }

                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Release Date
                                </span>

                                <strong>

                                    {product.releaseDate
                                        ? new Date(
                                            product.releaseDate
                                        ).toLocaleDateString()
                                        : "N/A"
                                    }

                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* Price */}

                    <div className="details-price-container">

                        <span>
                            Price
                        </span>

                        <strong>
                            ₹{product.price}
                        </strong>

                    </div>


                    {/* ==================================
                        ACTION BUTTONS
                        ================================== */}

                    <div className="product-actions">


                        {/* Add to cart */}

                        <button
                            className="details-cart-button"

                            disabled={
                                !product.avaliable ||
                                product.quantity <= 0
                            }

                            onClick={() =>
                                addToCart(product)
                            }
                        >

                            🛒 Add to Cart

                        </button>


                        {/* Update */}

                        <button
                            className="update-button"

                            onClick={() =>
                                navigate(
                                    `/product/${product.id}/update`
                                )
                            }
                        >

                            ✏️ Update

                        </button>


                        {/* Delete */}

                        <button
                            className="delete-button"

                            onClick={() => {

                                const confirmed =
                                    window.confirm(
                                        `Are you sure you want to delete ${product.name}?`
                                    );

                                if (confirmed) {

                                    fetch(
                                        `http://localhost:8080/api/product/${product.id}`,
                                        {
                                            method: "DELETE"
                                        }
                                    )
                                        .then((response) => {

                                            if (!response.ok) {

                                                throw new Error(
                                                    "Failed to delete product"
                                                );

                                            }

                                            return response.text();

                                        })
                                        .then(() => {

                                            alert(
                                                "Product deleted successfully"
                                            );

                                            navigate("/");

                                        })
                                        .catch((error) => {

                                            console.error(error);

                                            alert(
                                                "Unable to delete product"
                                            );

                                        });

                                }

                            }}
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