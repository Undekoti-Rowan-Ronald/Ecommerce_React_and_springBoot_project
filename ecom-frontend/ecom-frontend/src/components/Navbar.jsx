import { Link } from "react-router-dom";


function Navbar({
    darkMode,
    setDarkMode,
    cartCount
}) {

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

            <input
                type="text"
                placeholder="Search products..."
                className="search-input"
            />


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