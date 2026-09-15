import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

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

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // ==========================================
  // GET EXISTING PRODUCT
  // ==========================================

  useEffect(() => {

    fetch(`http://localhost:8080/api/product/${id}`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })

      .then((product) => {

        setFormData({
          name: product.name || "",
          brand: product.brand || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          quantity: product.quantity || "",
          releaseDate: product.releaseDate || "",
          avaliable: product.avaliable ?? true
        });

        // Show existing image
        setPreview(
          `http://localhost:8080/api/product/${product.id}/image`
        );

        setLoading(false);
      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load product");
        setLoading(false);
      });

  }, [id]);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (event) => {

    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    setPreview(URL.createObjectURL(selectedImage));
  };


  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");


    // Product object
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


    // ==========================================
    // CREATE MULTIPART FORM DATA
    // ==========================================

    const formDataToSend = new FormData();


    // Convert product object to JSON
    const productBlob = new Blob(
      [JSON.stringify(product)],
      {
        type: "application/json"
      }
    );


    // IMPORTANT:
    // These names MUST match @RequestPart
    // in your Spring Boot controller.

    formDataToSend.append(
      "product",
      productBlob
    );


    // Image is optional here.
    // If user selects a new image,
    // send it to backend.

    if (image) {

      formDataToSend.append(
        "imageFile",
        image
      );

    }


    // ==========================================
    // SEND PUT REQUEST
    // ==========================================

    try {

      const response = await fetch(
        `http://localhost:8080/api/product/${id}`,
        {
          method: "PUT",
          body: formDataToSend
        }
      );


      if (!response.ok) {

        throw new Error("Failed to update product");

      }


      const result = await response.text();

      console.log("Backend response:", result);


      setMessage("Product updated successfully");


      // Go back to product details
      setTimeout(() => {

        navigate(`/product/${id}`);

      }, 1000);


    } catch (error) {

      console.error("Update error:", error);

      setError("Unable to update product");

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <main className="add-product-page">

        <h1>Loading product...</h1>

      </main>
    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error && !formData.name) {

    return (
      <main className="add-product-page">

        <h1>{error}</h1>

        <button
          onClick={() => navigate("/")}
        >
          Back to Products
        </button>

      </main>
    );

  }


  // ==========================================
  // FORM
  // ==========================================

  return (

    <main className="add-product-page">

      <button
        className="back-button"
        onClick={() => navigate(`/product/${id}`)}
      >
        ← Back to Product
      </button>


      <div className="add-product-card">

        <h1>Update Product</h1>

        <p className="form-subtitle">
          Update the product information below.
        </p>


        <form onSubmit={handleSubmit}>


          {/* ==============================
              PRODUCT NAME
          ============================== */}

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              BRAND
          ============================== */}

          <div className="form-group">

            <label>Brand</label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              DESCRIPTION
          ============================== */}

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              PRICE
          ============================== */}

          <div className="form-group">

            <label>Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              CATEGORY
          ============================== */}

          <div className="form-group">

            <label>Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              QUANTITY
          ============================== */}

          <div className="form-group">

            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              RELEASE DATE
          ============================== */}

          <div className="form-group">

            <label>Release Date</label>

            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==============================
              IMAGE
          ============================== */}

          <div className="form-group">

            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>


          {/* IMAGE PREVIEW */}

          {preview && (

            <div className="image-preview">

              <img
                src={preview}
                alt="Product preview"
              />

            </div>

          )}


          {/* ==============================
              AVAILABLE
          ============================== */}

          <div className="checkbox-group">

            <input
              type="checkbox"
              name="avaliable"
              checked={formData.avaliable}
              onChange={handleChange}
            />

            <label>Available</label>

          </div>


          {/* ==============================
              MESSAGE
          ============================== */}

          {message && (

            <p className="form-success">
              {message}
            </p>

          )}

          {error && (

            <p className="form-error">
              {error}
            </p>

          )}


          {/* ==============================
              BUTTONS
          ============================== */}

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(`/product/${id}`)}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="submit-button"
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </main>

  );
}

export default UpdateProduct;