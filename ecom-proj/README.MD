# 🛒 Ecommerce Full-Stack Web Application

A full-stack Ecommerce Web Application built using **Java, Spring Boot, Spring Data JPA, Hibernate, PostgreSQL, React.js, and Vite**.

This project is built as a learning project to understand how a React frontend communicates with a Spring Boot REST API, how Spring Boot communicates with a PostgreSQL database, and how CRUD operations, image upload, dynamic search, routing, and frontend state management work together in a full-stack application.

---

# 📌 Project Overview

The application allows users to:

- View all products
- View individual product details
- Add new products
- Upload product images
- Display product images
- Update existing products
- Update product images
- Delete products
- Search products dynamically while typing
- Manage product availability
- Manage product quantity
- Add products to cart
- Switch between dark and light mode

The application consists of two main parts:

```text
React Frontend
      ↓
HTTP / REST API
      ↓
Spring Boot Backend
      ↓
Spring Data JPA / Hibernate
      ↓
PostgreSQL Database
```

---

# 🚀 Technologies Used

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- Lombok

## Frontend

- React.js
- Vite
- JavaScript
- React Router
- HTML
- CSS
- Fetch API

## Development Tools

- IntelliJ IDEA
- VS Code
- PostgreSQL
- Postman
- Git
- GitHub

---

# 🏗️ Application Architecture

The backend follows a layered architecture.

```text
                    React Frontend
                          |
                          | HTTP Request
                          ↓
                  ┌─────────────────┐
                  │   Controller    │
                  └─────────────────┘
                          |
                          ↓
                  ┌─────────────────┐
                  │     Service     │
                  └─────────────────┘
                          |
                          ↓
                  ┌─────────────────┐
                  │   Repository    │
                  └─────────────────┘
                          |
                          ↓
                  ┌─────────────────┐
                  │   PostgreSQL    │
                  └─────────────────┘
```

### Controller

The Controller receives HTTP requests from the frontend and sends HTTP responses.

### Service

The Service contains the business logic of the application.

### Repository

The Repository communicates with the database using Spring Data JPA.

### Entity

The Entity represents the database table.

---

# 📁 Backend Project Structure

```text
src
└── main
    ├── java
    │   └── com.mylearning.ecom_proj
    │       │
    │       ├── controllor
    │       │   └── ProductControlor.java
    │       │
    │       ├── model
    │       │   └── Product.java
    │       │
    │       ├── repo
    │       │   └── ProductRepo.java
    │       │
    │       └── service
    │           └── ProductService.java
    │
    └── resources
        └── application.properties
```

---

# 📁 Frontend Project Structure

```text
ecom-frontend
└── src
    │
    ├── components
    │   └── Navbar.jsx
    │
    ├── pages
    │   ├── Home.jsx
    │   ├── ProductDetails.jsx
    │   ├── AddProduct.jsx
    │   └── UpdateProduct.jsx
    │
    ├── App.jsx
    └── App.css
```

---

# 🗃️ Product Entity

The main entity in this project is `Product`.

Example:

```java
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private String brand;

    private BigDecimal price;

    private String category;

    private Date releaseDate;

    private boolean avaliable;

    private int quantity;

    private String imageName;

    private String imageType;

    @Lob
    private byte[] imageData;
}
```

The Product entity contains:

```text
id
name
description
brand
price
category
releaseDate
avaliable
quantity
imageName
imageType
imageData
```

---

# 📚 Spring Boot Annotation Revision

This project uses several important Spring Boot, JPA, and Lombok annotations.

---

## `@Entity`

```java
@Entity
public class Product {
}
```

`@Entity` tells JPA that the Java class represents a database entity.

The class will be mapped to a database table.

```text
Java Class
    ↓
@Entity
    ↓
Database Table
```

---

## `@Id`

```java
@Id
private Integer id;
```

`@Id` specifies the primary key of the entity.

A primary key uniquely identifies each record.

Example:

```text
id    name
-------------
1     iPhone
2     Samsung
3     OnePlus
```

Here, `id` is the primary key.

---

## `@GeneratedValue`

```java
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;
```

This tells JPA that the database should automatically generate the ID.

For example:

```text
Product 1 → ID 1
Product 2 → ID 2
Product 3 → ID 3
```

The frontend does not need to provide the ID when creating a new product.

---

## `@Lob`

```java
@Lob
private byte[] imageData;
```

`@Lob` means **Large Object**.

It is used for storing large data.

In this project it is used to store product image data.

```text
Image
  ↓
byte[]
  ↓
@Lob
  ↓
Database
```

---

# 🧩 Lombok Annotations

The project uses Lombok to reduce boilerplate code.

---

## `@Data`

```java
@Data
```

`@Data` automatically generates commonly required methods such as:

- Getters
- Setters
- `toString()`
- `equals()`
- `hashCode()`

Without Lombok, these methods would need to be written manually.

---

## `@AllArgsConstructor`

```java
@AllArgsConstructor
```

Creates a constructor containing all fields of the class.

Instead of manually writing:

```java
public Product(
    Integer id,
    String name,
    String description
    // ...
) {
}
```

Lombok generates the constructor.

---

## `@NoArgsConstructor`

```java
@NoArgsConstructor
```

Creates a constructor with no arguments.

Equivalent to:

```java
public Product() {
}
```

A no-argument constructor is important for JPA entity creation.

---

# 🌐 Spring REST Controller Annotations

The Controller handles HTTP requests from the React frontend.

---

## `@RestController`

```java
@RestController
public class ProductControlor {
}
```

`@RestController` tells Spring that the class is a REST controller.

It is commonly used for building REST APIs.

It allows methods to return data directly as the HTTP response body.

For example, a Java `Product` object can be returned as JSON.

---

## `@RequestMapping`

```java
@RequestMapping("/api")
```

Defines a common URL prefix for the controller.

For example:

```java
@RequestMapping("/api")

@GetMapping("/products")
```

The complete endpoint becomes:

```text
/api/products
```

---

## `@GetMapping`

```java
@GetMapping("/products")
```

Handles HTTP `GET` requests.

GET is generally used to retrieve data.

Example:

```http
GET /api/products
```

---

## `@PostMapping`

```java
@PostMapping("/product")
```

Handles HTTP `POST` requests.

POST is generally used to create new data.

Example:

```http
POST /api/product
```

In this project it is used to add a new product.

---

## `@PutMapping`

```java
@PutMapping("/product/{id}")
```

Handles HTTP `PUT` requests.

PUT is used to update existing data.

Example:

```http
PUT /api/product/5
```

This updates product ID `5`.

---

## `@DeleteMapping`

```java
@DeleteMapping("/product/{id}")
```

Handles HTTP `DELETE` requests.

Example:

```http
DELETE /api/product/5
```

This deletes product ID `5`.

---

# 🔗 `@PathVariable`

```java
@GetMapping("/product/{id}")
public ResponseEntity<Product> getProduct(
        @PathVariable int id) {
}
```

`@PathVariable` gets a value directly from the URL.

For:

```text
/api/product/10
```

the value is:

```text
id = 10
```

The `{id}` in the URL is mapped to:

```java
@PathVariable int id
```

---

# 🔍 `@RequestParam`

```java
@GetMapping("/product/search")
public ResponseEntity<List<Product>> searchProduct(
        @RequestParam String keyword) {
}
```

`@RequestParam` gets a value from the query string.

Example:

```text
/api/product/search?keyword=iphone
```

Here:

```text
keyword = iphone
```

The general structure is:

```text
/path?parameter=value
```

---

# 📦 `@RequestPart`

```java
@PostMapping("/product")
public ResponseEntity<?> addProduct(
        @RequestPart Product product,
        @RequestPart MultipartFile imageFile) {
}
```

`@RequestPart` is used when receiving parts of a `multipart/form-data` request.

This project sends:

```text
product   → JSON
imageFile → Image
```

This is required because a normal JSON request cannot directly contain a file.

---

# 📦 `@RequestPart(required = false)`

For updating a product, the image can be optional.

```java
@RequestPart(required = false)
MultipartFile imageFile
```

This allows two situations.

### New image selected

```text
Product details
      +
New image
      ↓
Update product
      +
Replace image
```

### No new image

```text
Product details
      +
No image
      ↓
Update product
      +
Keep existing image
```

This prevents the user from having to upload the same image every time another product field is changed.

---

# 🔌 `@Autowired`

```java
@Autowired
private ProductService service;
```

`@Autowired` tells Spring to inject the required dependency automatically.

The controller depends on `ProductService`.

Instead of manually creating the object:

```java
ProductService service = new ProductService();
```

Spring manages the object and injects it.

This is called **Dependency Injection**.

---

# 🌐 `@CrossOrigin`

```java
@CrossOrigin
```

CORS stands for:

**Cross-Origin Resource Sharing**

The frontend and backend run on different ports:

```text
Frontend
http://localhost:5173

Backend
http://localhost:8080
```

Because the ports are different, the browser treats them as different origins.

`@CrossOrigin` allows the frontend to communicate with the backend.

---

# 🗄️ Repository

The repository communicates with the database.

Example:

```java
public interface ProductRepo
        extends JpaRepository<Product, Integer> {
}
```

---

# `JpaRepository`

```java
JpaRepository<Product, Integer>
```

`JpaRepository` is provided by Spring Data JPA.

It provides common database operations automatically.

Examples:

```java
findAll()
findById()
save()
deleteById()
existsById()
```

This means we don't need to manually write SQL for basic CRUD operations.

---

# 🔄 CRUD Operations

CRUD stands for:

```text
C → Create
R → Read
U → Update
D → Delete
```

The application implements CRUD using REST APIs.

### Create

```http
POST /api/product
```

### Read

```http
GET /api/products
```

### Update

```http
PUT /api/product/{id}
```

### Delete

```http
DELETE /api/product/{id}
```

---

# 🌐 REST API Endpoints

Backend base URL:

```text
http://localhost:8080/api
```

---

## Get All Products

```http
GET /api/products
```

Returns all products.

---

## Get Product By ID

```http
GET /api/product/{id}
```

Example:

```http
GET /api/product/1
```

Returns the product with ID `1`.

---

## Add Product

```http
POST /api/product
```

The request uses:

```text
multipart/form-data
```

It contains:

```text
product
imageFile
```

---

## Get Product Image

```http
GET /api/product/{id}/image
```

Example:

```http
GET /api/product/1/image
```

Returns the image belonging to product ID `1`.

---

## Update Product

```http
PUT /api/product/{id}
```

Example:

```http
PUT /api/product/1
```

Updates product information.

The image is optional.

---

## Delete Product

```http
DELETE /api/product/{id}
```

Example:

```http
DELETE /api/product/1
```

Deletes the selected product.

---

## Search Products

```http
GET /api/product/search?keyword={keyword}
```

Example:

```http
GET /api/product/search?keyword=samsung
```

Returns products matching the search keyword.

---

# 🔍 Dynamic Product Search

The Navbar contains a product search box.

The search happens whenever the user types a character.

For example:

```text
User types:
s
```

React sends:

```http
GET /api/product/search?keyword=s
```

When the user types:

```text
sa
```

React sends:

```http
GET /api/product/search?keyword=sa
```

When the user types:

```text
sam
```

React sends:

```http
GET /api/product/search?keyword=sam
```

The matching products are displayed below the search box.

The flow is:

```text
User types
     ↓
onChange
     ↓
handleSearch()
     ↓
fetch()
     ↓
Spring Boot Controller
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
     ↓
JSON Response
     ↓
React State
     ↓
Search Results
```

---

# 🖼️ Product Image Handling

Product images are uploaded using Spring's:

```java
MultipartFile
```

The frontend sends:

```text
product
imageFile
```

The backend stores:

```text
imageName
imageType
imageData
```

The image can then be retrieved using:

```http
GET /api/product/{id}/image
```

The React frontend displays the image using:

```jsx
<img
    src={`http://localhost:8080/api/product/${product.id}/image`}
    alt={product.name}
/>
```

---

# 📦 Multipart Form Data

A normal JSON request looks like:

```text
JSON
 ↓
Backend
```

But this project needs to send both JSON and an image.

Therefore:

```text
multipart/form-data
       |
       ├── product
       |
       └── imageFile
```

The frontend creates a `FormData` object:

```javascript
const formDataToSend = new FormData();

const productBlob = new Blob(
    [JSON.stringify(product)],
    {
        type: "application/json"
    }
);

formDataToSend.append(
    "product",
    productBlob
);

formDataToSend.append(
    "imageFile",
    image
);
```

When using `FormData`, the browser automatically sets the correct multipart boundary.

Therefore, the frontend should not manually set:

```text
Content-Type: multipart/form-data
```

---

# 📡 `ResponseEntity`

The Controller uses `ResponseEntity` to control the HTTP response.

Example:

```java
return new ResponseEntity<>(
    product,
    HttpStatus.OK
);
```

`ResponseEntity` can contain:

- Response body
- HTTP status
- Headers

Common HTTP status codes:

```text
200 OK
201 CREATED
400 BAD REQUEST
404 NOT FOUND
500 INTERNAL SERVER ERROR
```

---

# 📅 Date Handling

The frontend uses:

```html
<input type="date">
```

HTML date inputs normally produce:

```text
yyyy-MM-dd
```

Example:

```text
2026-09-15
```

The backend should use a matching JSON date format when `@JsonFormat` is used.

Example:

```java
@JsonFormat(
    shape = JsonFormat.Shape.STRING,
    pattern = "yyyy-MM-dd"
)
private Date releaseDate;
```

Matching the frontend and backend date formats prevents date parsing problems.

---

# 🧠 Service Layer

The Service layer contains business logic.

Instead of directly accessing the database from the Controller:

```text
Controller
    ↓
Database
```

the application uses:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

This separation makes the application easier to:

- Understand
- Maintain
- Test
- Extend

---

# 🏠 Home Page

The Home page retrieves all products using:

```http
GET /api/products
```

React stores the returned products in state.

Example:

```javascript
const [products, setProducts] = useState([]);
```

The products are then displayed using:

```javascript
products.map(...)
```

Each product displays:

- Name
- Brand
- Description
- Category
- Price
- Quantity
- Availability
- Image

---

# ➕ Add Product

The Add Product page contains fields for:

```text
Name
Brand
Description
Price
Category
Quantity
Release Date
Availability
Image
```

The frontend creates a product object and sends it together with the image.

The request uses:

```text
multipart/form-data
```

The backend receives the data using:

```java
@RequestPart
```

---

# ✏️ Update Product

The Update Product page first retrieves the existing product:

```http
GET /api/product/{id}
```

The existing information is displayed in the form.

When the user submits the form:

```http
PUT /api/product/{id}
```

If a new image is selected:

```text
Old Image
    ↓
New Image
    ↓
Database updated
```

If no new image is selected:

```text
Old Image
    ↓
Keep Existing Image
```

---

# 🗑️ Delete Product

When the user clicks the Delete button, the frontend sends:

```http
DELETE /api/product/{id}
```

The backend checks whether the product exists.

If the product exists:

```text
Product deleted
```

If the product does not exist:

```text
404 NOT FOUND
```

---

# ⚛️ React Concepts

The frontend uses several important React concepts.

---

## `useState`

`useState` is used to store changing data.

Example:

```javascript
const [products, setProducts] = useState([]);
```

Here:

```text
products
    ↓
Current state

setProducts()
    ↓
Updates state
```

When state changes, React re-renders the component.

---

# `useEffect`

`useEffect` is used for side effects.

One common use is calling an API when a component loads.

Example:

```javascript
useEffect(() => {

    fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then(data => setProducts(data));

}, []);
```

The empty dependency array:

```javascript
[]
```

means the effect runs when the component initially loads.

---

# `useNavigate`

`useNavigate` is used to navigate programmatically.

Example:

```javascript
navigate(`/product/${product.id}`);
```

If the product ID is `5`, the user is taken to:

```text
/product/5
```

---

# `useParams`

`useParams` gets parameters from the URL.

Example:

```javascript
const { id } = useParams();
```

For:

```text
/product/10
```

we get:

```text
id = 10
```

---

# 🔀 React Router

React Router allows different URLs to display different React components.

Examples:

```text
/
```

Home page.

```text
/add-product
```

Add Product page.

```text
/product/:id
```

Product Details page.

```text
/product/:id/update
```

Update Product page.

```text
/categories
```

Categories page.

```text
/cart
```

Cart page.

---

# 🛒 Cart

Products can be added to the cart from the frontend.

The current cart implementation uses React state.

The Navbar displays the cart count.

Future improvements can include:

- Remove from cart
- Increase quantity
- Decrease quantity
- Calculate total
- Persistent cart
- Checkout

---

# 🌙 Dark / Light Mode

The application supports:

```text
☀️ Light Mode
🌙 Dark Mode
```

React stores the current theme using state.

Example:

```javascript
const [darkMode, setDarkMode] = useState(false);
```

The Navbar contains a button that changes the theme.

---

# 🗄️ PostgreSQL

The application uses PostgreSQL as the database.

Example configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

PostgreSQL provides persistent storage for the products.

Unlike an in-memory database, the data remains available after restarting the Spring Boot application.

---

# 🔐 Security Note

Do not commit real passwords, API keys, or other sensitive credentials to GitHub.

For example, do not push:

```properties
spring.datasource.password=myRealPassword
```

Use environment variables or a local configuration file that is included in `.gitignore`.

---

# ▶️ How to Run the Project

## Prerequisites

Install:

- Java
- Maven
- PostgreSQL
- Node.js
- npm
- Git

---

# ☕ Run the Backend

Navigate to the Spring Boot project:

```bash
cd ecom-proj
```

Run:

```bash
mvn spring-boot:run
```

Or run the Spring Boot main class from IntelliJ IDEA.

The backend runs on:

```text
http://localhost:8080
```

---

# ⚛️ Run the Frontend

Open another terminal.

Navigate to:

```bash
cd ecom-frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# 🌐 Frontend ↔ Backend Communication

The frontend runs on:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:8080
```

React communicates with Spring Boot using HTTP requests.

Example:

```javascript
fetch("http://localhost:8080/api/products")
```

The backend processes the request and returns JSON.

---

# 🧪 Testing APIs with Postman

The APIs can also be tested using Postman.

### Get all products

```http
GET http://localhost:8080/api/products
```

### Get product

```http
GET http://localhost:8080/api/product/1
```

### Search

```http
GET http://localhost:8080/api/product/search?keyword=iphone
```

### Delete

```http
DELETE http://localhost:8080/api/product/1
```

For Add Product and Update Product requests containing an image:

```text
Body
 ↓
form-data
```

Use:

```text
product     → JSON
imageFile   → File
```

---

# 🔄 Complete Request Flow Example

Suppose the user wants to retrieve product ID `5`.

### 1. React

```javascript
fetch("http://localhost:8080/api/product/5")
```

### 2. Controller

```java
@GetMapping("/product/{id}")
```

### 3. Path Variable

```java
@PathVariable int id
```

The value becomes:

```text
id = 5
```

### 4. Service

```java
service.getProductById(5)
```

### 5. Repository

```java
repo.findById(5)
```

### 6. Database

PostgreSQL searches for:

```text
id = 5
```

### 7. Response

The result travels back:

```text
PostgreSQL
    ↓
Repository
    ↓
Service
    ↓
Controller
    ↓
JSON Response
    ↓
React
```

Example JSON:

```json
{
    "id": 5,
    "name": "iPhone",
    "brand": "Apple",
    "price": 70000
}
```

---

# 📚 Main Concepts Learned

## Java

- Classes
- Objects
- Interfaces
- Methods
- Exception handling
- Generics
- Collections
- BigDecimal
- Date

## Spring Boot

- Spring Boot project structure
- REST APIs
- Controllers
- Services
- Repositories
- Dependency Injection
- HTTP methods
- HTTP status codes
- ResponseEntity

## Spring MVC

- `@RestController`
- `@RequestMapping`
- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@DeleteMapping`
- `@PathVariable`
- `@RequestParam`
- `@RequestPart`
- `@CrossOrigin`
- `@Autowired`

## JPA / Hibernate

- `@Entity`
- `@Id`
- `@GeneratedValue`
- `@Lob`
- `JpaRepository`
- ORM
- Entity mapping
- CRUD operations
- Database persistence

## React

- Components
- Props
- State
- `useState`
- `useEffect`
- `useNavigate`
- `useParams`
- React Router
- Conditional rendering
- Event handling
- Forms
- Fetch API
- API integration

## Database

- PostgreSQL
- Tables
- Primary keys
- CRUD
- Database persistence
- JPA/Hibernate mapping

## Git

- Repository creation
- Branches
- `git add`
- `git commit`
- `git push`
- `git pull`
- Branch management
- GitHub

---

# 🧠 Quick Annotation Cheat Sheet

| Annotation | Purpose |
|---|---|
| `@Entity` | Maps Java class to database entity |
| `@Id` | Defines primary key |
| `@GeneratedValue` | Automatically generates ID |
| `@Lob` | Stores large data |
| `@Data` | Generates getters/setters and other methods |
| `@AllArgsConstructor` | Creates all-argument constructor |
| `@NoArgsConstructor` | Creates no-argument constructor |
| `@RestController` | Creates REST controller |
| `@RequestMapping` | Defines common URL mapping |
| `@GetMapping` | Handles GET requests |
| `@PostMapping` | Handles POST requests |
| `@PutMapping` | Handles PUT requests |
| `@DeleteMapping` | Handles DELETE requests |
| `@PathVariable` | Gets value from URL path |
| `@RequestParam` | Gets query parameter |
| `@RequestPart` | Gets multipart request part |
| `@Autowired` | Dependency Injection |
| `@CrossOrigin` | Allows cross-origin requests |

---

# 🔮 Future Improvements

Possible future features include:

- User registration
- Login
- Spring Security
- JWT authentication
- Admin and user roles
- Admin dashboard
- Product category filtering
- Product sorting
- Pagination
- Advanced search
- Product reviews
- Product ratings
- Persistent cart
- Order management
- Checkout
- Payment gateway
- Email notifications
- Deployment
- Cloud database
- Cloud image storage

---

# 📈 Learning Progress

The project was developed progressively while learning full-stack development.

```text
Java
  ↓
Spring Boot
  ↓
REST APIs
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
JPA / Hibernate
  ↓
PostgreSQL
  ↓
CRUD
  ↓
Image Upload
  ↓
React
  ↓
React Router
  ↓
Frontend ↔ Backend
  ↓
Dynamic Search
  ↓
Full-Stack Application
```

---

# 🚧 Project Status

**Status: In Development**

This project is continuously being improved while learning new concepts in:

- Java
- Spring Boot
- Backend Development
- React
- Databases
- REST APIs
- Full-Stack Development

---

# 👨‍💻 Author

**Undekoti Rowan**

Computer Science / Artificial Intelligence background with an interest in:

- Software Development
- Backend Development
- Full-Stack Development
- Java
- Spring Boot
- React
- AI / ML

---

# ⭐ Conclusion

This Ecommerce project demonstrates the fundamentals of a full-stack application where:

```text
React
  ↓
REST API
  ↓
Spring Boot
  ↓
Service Layer
  ↓
Repository
  ↓
Hibernate / JPA
  ↓
PostgreSQL
```

The project is primarily intended for learning and practicing full-stack development concepts.

If you find the project useful, consider giving the repository a ⭐.