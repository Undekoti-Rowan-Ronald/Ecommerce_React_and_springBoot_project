import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar({
    darkMode,
    setDarkMode,
    cartCount
}) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();


    // =========================
    // SEARCH PRODUCTS
    // =========================

    const handleSearch = async (event) => {

        const keyword = event.target.value;

        setSearch(keyword);


        // If search box is empty
        if (keyword.trim() === "") {

            setSearchResults([]);

            return;
        }


        try {

            const response = await fetch(
                `http://localhost:8080/api/product/search?keyword=${encodeURIComponent(keyword)}`
            );


            if (!response.ok) {

                throw new Error("Search failed");

            }


            const data = await response.json();

            console.log("Search results:", data);

            setSearchResults(data);


        } catch (error) {

            console.error("Search error:", error);

            setSearchResults([]);

        }

    };


    // =========================
    // PRODUCT CLICK
    // =========================

    const handleProductClick = (id) => {

        navigate(`/product/${id}`);

        setSearch("");

        setSearchResults([]);

    };


    return (

        <nav className="navbar">


            {/* =========================
                WEBSITE TITLE
                ========================= */}

            <a
                href="https://your-profile-website.com"
                target="_blank"
                rel="noreferrer"
                className="logo"
            >
                MyShop
            </a>


            {/* =========================
                NAVIGATION LINKS
                ========================= */}

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>


                <Link to="/add-product">
                    Add Product
                </Link>


                <Link to="/categories">
                    Categories
                </Link>

            </div>


            {/* =========================
                SEARCH BAR
                ========================= */}

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-input"
                    value={search}
                    onChange={handleSearch}
                />


                {/* =========================
                    SEARCH RESULTS
                    ========================= */}

                {searchResults.length > 0 && (

                    <div className="search-results">

                        {searchResults.map((product) => (

                            <div
                                key={product.id}
                                className="search-result-item"
                                onClick={() =>
                                    handleProductClick(product.id)
                                }
                            >

                                <img
                                    src={`http://localhost:8080/api/product/${product.id}/image`}
                                    alt={product.name}
                                />


                                <div className="search-result-info">

                                    <strong>
                                        {product.name}
                                    </strong>


                                    <p>
                                        {product.brand}
                                    </p>


                                    <span>
                                        ₹{product.price}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* =========================
                CART
                ========================= */}

            <Link
                to="/cart"
                className="cart-link"
            >

                🛒 Cart

                {cartCount > 0 && (

                    <span className="cart-count">
                        {cartCount}
                    </span>

                )}

            </Link>


            {/* =========================
                DARK / LIGHT MODE
                ========================= */}

            <button
                className="theme-button"
                onClick={() => setDarkMode(!darkMode)}
                title={
                    darkMode
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                }
            >

                {darkMode ? "☀️" : "🌙"}

            </button>


        </nav>

    );

}


export default Navbar;