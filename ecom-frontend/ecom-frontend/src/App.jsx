import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";

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

    const [darkMode, setDarkMode] =
        useState(false);


    const [cart, setCart] =
        useState([]);


    // ==========================================
    // ADD TO CART
    // ==========================================

    const addToCart = (product) => {

        setCart((previousCart) => {

            const existingProduct =
                previousCart.find(
                    (item) =>
                        item.id === product.id
                );


            if (existingProduct) {

                return previousCart.map(
                    (item) =>

                        item.id === product.id
                            ? {
                                ...item,
                                cartQuantity:
                                    item.cartQuantity + 1
                            }
                            : item

                );

            }


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

            <div
                className={
                    darkMode
                        ? "app dark"
                        : "app"
                }
            >


                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    cartCount={cart.length}
                />


                <Routes>


                    {/* HOME */}

                    <Route
                        path="/"
                        element={
                            <Home
                                addToCart={addToCart}
                            />
                        }
                    />


                    {/* PRODUCT DETAILS */}

                    <Route
                        path="/product/:id"
                        element={
                            <ProductDetails
                                addToCart={addToCart}
                            />
                        }
                    />


                    {/* ADD PRODUCT */}

                    <Route
                        path="/add-product"
                        element={
                            <AddProduct />
                        }
                    />


                    {/* CATEGORIES */}

                    <Route
                        path="/categories"
                        element={
                            <ComingSoon
                                title="Categories"
                            />
                        }
                    />


                    {/* CART */}

                    <Route
                        path="/cart"
                        element={
                            <ComingSoon
                                title="Shopping Cart"
                            />
                        }
                    />


                    {/* UPDATE */}

                    <Route
                        path="/product/:id/update"
                        element={
                            <ComingSoon
                                title="Update Product"
                            />
                        }
                    />


                </Routes>

            </div>

        </BrowserRouter>

    );

}


export default App;