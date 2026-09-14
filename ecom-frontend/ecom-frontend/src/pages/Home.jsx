import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home({ addToCart }) {

    // ==========================================
    // React Router navigation
    // ==========================================

    const navigate = useNavigate();


    // ==========================================
    // Products received from Spring Boot
    // ==========================================

    const [products, setProducts] = useState([]);


    // ==========================================
    // Loading state
    // ==========================================

    const [loading, setLoading] = useState(true);


    // ==========================================
    // Error state
    // ==========================================

    const [error, setError] = useState("");


    /*
     * ==========================================
     * GET ALL PRODUCTS
     * ==========================================
     *
     * Spring Boot API:
     *
     * GET
     * http://localhost:8080/api/products
     *
     */

    useEffect(() => {

        fetch("http://localhost:8080/api/products")

            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to fetch products"
                    );

                }

                return response.json();

            })

            .then((data) => {

                console.log(
                    "Products received:",
                    data
                );

                setProducts(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setError(
                    "Unable to load products"
                );

                setLoading(false);

            });

    }, []);


    // ==========================================
    // LOADING SCREEN
    // ==========================================

    if (loading) {

        return (

            <main className="main-container">

                <h1>
                    Loading products...
                </h1>

            </main>

        );

    }


    // ==========================================
    // ERROR SCREEN
    // ==========================================

    if (error) {

        return (

            <main className="main-container">

                <h1>
                    {error}
                </h1>

            </main>

        );

    }


    // ==========================================
    // PRODUCT PAGE
    // ==========================================

    return (

        <main className="main-container">


            {/* Page title */}

            <h1>
                Products
            </h1>


            {/* Product grid */}

            <div className="product-grid">


                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product.id}

                        // Clicking the card opens
                        // the product details page
                        onClick={() =>
                            navigate(
                                `/product/${product.id}`
                            )
                        }
                    >


                        {/* =========================
                            PRODUCT IMAGE
                            ========================= */}

                        <div className="product-image">

                            🛍️

                        </div>


                        {/* =========================
                            PRODUCT INFORMATION
                            ========================= */}

                        <div className="product-info">


                            {/* Product name */}

                            <h2>
                                {product.name}
                            </h2>


                            {/* Brand */}

                            <p className="product-brand">

                                Brand:
                                {" "}
                                {product.brand}

                            </p>


                            {/* Description */}

                            <p>

                                {product.description}

                            </p>


                            {/* Category */}

                            <p>

                                Category:
                                {" "}
                                {product.category}

                            </p>


                            {/* Price */}

                            <h3>

                                ₹{product.price}

                            </h3>


                            {/* Quantity */}

                            <p>

                                Quantity:
                                {" "}
                                {product.quantity}

                            </p>


                            {/* =========================
                                ADD TO CART
                                ========================= */}

                            <button
                                className="add-cart-button"

                                disabled={
                                    !product.avaliable ||
                                    product.quantity <= 0
                                }

                                onClick={(event) => {

                                    // Prevent the card's
                                    // onClick from running
                                    event.stopPropagation();

                                    // Add product to cart
                                    addToCart(product);

                                }}
                            >

                                {product.avaliable &&
                                product.quantity > 0

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