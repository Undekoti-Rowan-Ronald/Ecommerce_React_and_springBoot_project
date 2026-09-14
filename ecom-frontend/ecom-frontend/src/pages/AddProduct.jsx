import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddProduct() {

    const navigate = useNavigate();


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        releaseDate: "",
        avaliable: true

    });


    // ==========================================
    // IMAGE
    // ==========================================

    const [image, setImage] = useState(null);

    const [imagePreview, setImagePreview] = useState("");


    // ==========================================
    // SUBMIT / LOADING
    // ==========================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setFormData((previousData) => ({

            ...previousData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };


    // ==========================================
    // HANDLE IMAGE
    // ==========================================

    const handleImageChange = (event) => {

        const selectedFile =
            event.target.files[0];


        if (!selectedFile) {
            return;
        }


        // Save actual image file
        setImage(selectedFile);


        // Create image preview
        const preview =
            URL.createObjectURL(selectedFile);


        setImagePreview(preview);

    };


    // ==========================================
    // SUBMIT PRODUCT
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        // Make sure image is selected
        if (!image) {

            setError(
                "Please select a product image."
            );

            return;
        }


        setLoading(true);


        try {

            /*
             * ======================================
             * CREATE PRODUCT OBJECT
             * ======================================
             *
             * This object matches your
             * Spring Boot Product entity.
             */

            const product = {

                name: formData.name,

                brand: formData.brand,

                description: formData.description,

                price: Number(formData.price),

                category: formData.category,

                quantity: Number(formData.quantity),

                releaseDate: formData.releaseDate,

                avaliable: formData.avaliable

            };


            /*
             * ======================================
             * CREATE MULTIPART FORM DATA
             * ======================================
             */

            const formDataToSend =
                new FormData();


            /*
             * Your backend expects:
             *
             * @RequestPart Product product
             *
             * Therefore the part MUST be
             * named "product".
             */

            const productBlob = new Blob(

                [
                    JSON.stringify(product)
                ],

                {
                    type: "application/json"
                }

            );


            formDataToSend.append(
                "product",
                productBlob
            );


            /*
             * Your backend expects:
             *
             * @RequestPart MultipartFile imageFile
             *
             * Therefore the part MUST be
             * named "imageFile".
             */

            formDataToSend.append(
                "imageFile",
                image
            );


            /*
             * ======================================
             * SEND TO SPRING BOOT
             * ======================================
             *
             * POST:
             *
             * http://localhost:8080/api/product
             */

            const response = await fetch(
                "http://localhost:8080/api/product",
                {
                    method: "POST",
                    body: formDataToSend
                }
            );


            /*
             * ======================================
             * HANDLE BACKEND RESPONSE
             * ======================================
             */

            if (!response.ok) {

                const message =
                    await response.text();

                throw new Error(
                    message ||
                    `Server returned ${response.status}`
                );

            }


            const savedProduct =
                await response.json();


            console.log(
                "Product added successfully:",
                savedProduct
            );


            alert(
                "Product added successfully!"
            );


            // Go back to home
            navigate("/");


        } catch (error) {

            console.error(
                "Error adding product:",
                error
            );


            setError(
                error.message ||
                "Unable to add product."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="add-product-page">


            {/* ==================================
                HEADER
                ================================== */}

            <div className="add-product-header">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Products
                </button>


                <h1>
                    Add New Product
                </h1>


                <p>
                    Add a new product to your store.
                </p>

            </div>


            {/* ==================================
                ERROR MESSAGE
                ================================== */}

            {error && (

                <div className="form-error">

                    ⚠️ {error}

                </div>

            )}


            {/* ==================================
                FORM
                ================================== */}

            <form
                className="add-product-form"
                onSubmit={handleSubmit}
            >


                {/* ==================================
                    LEFT SIDE
                    ================================== */}

                <div className="form-left">


                    {/* NAME */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Product Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />

                    </div>


                    {/* BRAND */}

                    <div className="form-group">

                        <label htmlFor="brand">
                            Brand
                        </label>

                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Enter brand name"
                            required
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label htmlFor="category">
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select a category
                            </option>

                            <option value="Mobile">
                                Mobile
                            </option>

                            <option value="Laptop">
                                Laptop
                            </option>

                            <option value="Tablet">
                                Tablet
                            </option>

                            <option value="Computer">
                                Computer
                            </option>

                            <option value="Accessories">
                                Accessories
                            </option>

                            <option value="Electronics">
                                Electronics
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows="5"
                            required
                        />

                    </div>


                    {/* PRICE + QUANTITY */}

                    <div className="form-row">


                        <div className="form-group">

                            <label htmlFor="price">
                                Price (₹)
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="69999"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="quantity">
                                Stock Quantity
                            </label>

                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="0"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="25"
                                required
                            />

                        </div>

                    </div>


                    {/* RELEASE DATE */}

                    <div className="form-group">

                        <label htmlFor="releaseDate">
                            Release Date
                        </label>

                        <input
                            id="releaseDate"
                            name="releaseDate"
                            type="date"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* AVAILABLE */}

                    <div className="available-checkbox">

                        <input
                            id="avaliable"
                            name="avaliable"
                            type="checkbox"
                            checked={formData.avaliable}
                            onChange={handleChange}
                        />

                        <label htmlFor="avaliable">
                            Product is available
                        </label>

                    </div>

                </div>


                {/* ==================================
                    RIGHT SIDE - IMAGE
                    ================================== */}

                <div className="form-right">

                    <div className="image-upload-container">


                        <h2>
                            Product Image
                        </h2>


                        <p>
                            Upload an image for your product.
                        </p>


                        {/* IMAGE PREVIEW */}

                        <div className="image-preview">

                            {imagePreview ? (

                                <img
                                    src={imagePreview}
                                    alt="Product preview"
                                />

                            ) : (

                                <div className="image-placeholder">

                                    <span>
                                        🖼️
                                    </span>

                                    <p>
                                        No image selected
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* FILE INPUT */}

                        <label
                            htmlFor="product-image"
                            className="upload-button"
                        >

                            📷 Choose Image

                        </label>


                        <input
                            id="product-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />


                        {/* FILE NAME */}

                        {image && (

                            <p className="selected-file">

                                Selected:
                                {" "}
                                {image.name}

                            </p>

                        )}

                    </div>

                </div>


                {/* ==================================
                    ACTION BUTTONS
                    ================================== */}

                <div className="form-actions">


                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/")}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="submit-product-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Adding Product..."
                            : "➕ Add Product"
                        }

                    </button>

                </div>


            </form>

        </main>

    );

}


export default AddProduct;