import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import "./App.css";


function ComingSoon({ title }) {

    return (

        <main className="coming-soon-page">

            <div className="coming-soon-card">

                <div className="coming-soon-icon">
                    🚧
                </div>

                <h1>
                    {title}
                </h1>

                <p>
                    This page is coming soon.
                </p>

                <span>
                    We are currently working on this feature.
                </span>

            </div>

        </main>

    );
}


function App() {

    // Controls dark/light theme
    const [darkMode, setDarkMode] = useState(false);


    // Stores products added to cart
    const [cart, setCart] = useState([]);


    // Add product to cart
    const addToCart = (product) => {

        setCart((previousCart) => {

            // Check whether product already exists
            const existingProduct = previousCart.find(
                (item) => item.id === product.id
            );


            // If product already exists,
            // increase its cart quantity
            if (existingProduct) {

                return previousCart.map((item) =>

                    item.id === product.id
                        ? {
                            ...item,
                            cartQuantity: item.cartQuantity + 1
                        }
                        : item

                );

            }


            // If product is new,
            // add it to the cart
            return [
                ...previousCart,
                {
                    ...product,
                    cartQuantity: 1
                }
            ];

        });

    };


    return (

        <BrowserRouter>

            <div className={darkMode ? "app dark" : "app"}>

                {/* Navbar */}
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    cartCount={cart.length}
                />


               <Routes>

    {/* Home */}
    <Route
        path="/"
        element={
            <Home
                addToCart={addToCart}
            />
        }
    />


    {/* Product details */}
    <Route
        path="/product/:id"
        element={
            <ProductDetails
                addToCart={addToCart}
            />
        }
    />


    {/* Add Product */}
    <Route
        path="/add-product"
        element={
            <ComingSoon title="Add Product" />
        }
    />


    {/* Categories */}
    <Route
        path="/categories"
        element={
            <ComingSoon title="Categories" />
        }
    />


    {/* Cart */}
    <Route
        path="/cart"
        element={
            <ComingSoon title="Shopping Cart" />
        }
    />

</Routes>

            </div>

        </BrowserRouter>

    );
}


export default App;