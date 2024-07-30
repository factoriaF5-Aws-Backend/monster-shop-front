# Monster Shop - frontend

This is the frontend part of the Monster Shop project. It is a simple e-commerce platform where users can browse products, read reviews, and rate products. The platform also has a product manager interface where the admin can manage products.

## Execute in development mode

- clone or fork the repository
- run `pnpm install` to install the dependencies
- run `pnpm run dev` to start the development server

Your frontend will be available at `http://localhost:3000`.

And consume the backend API available at `http://localhost:8080`.

## Shop

### Product Cards Grid

<img width="1231" alt="image" src="https://github.com/user-attachments/assets/b1ffdbbf-b95b-4a06-b5c7-84d840b88042">

#### Features

#### &check; Get all products to display in the shop grid

GET /api/products

Types retrieved: Product[] (a list of products).

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
};
```

### Product Details Page -> Details

<img width="1208" alt="image" src="https://github.com/user-attachments/assets/ad104887-ea04-4b89-8130-532a5ac59673">

#### Features

#### &check; Get all products to display in the shop grid

GET /api/products/{productId}

Types retrieved: Product.

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
};
```

### Product Details Page -> Reviews List

![Image](https://github.com/user-attachments/assets/951eba62-e819-4dc4-ac8d-72ba1079a188)

#### Features

#### &check; Get all the product Reviews

GET /api/reviews?productId={productId}

Types retrieved: Review[] (a list of reviews from the product).

```typescript
type Review = {
  username: string;
  rating: number;
  body: string; // The content of the review
};
```

### Product Details Page -> Reviews Form

#### &check; Can create a Review and Rate a product

User authenticated as a customer can create a review and rate a product.

![Image](https://github.com/user-attachments/assets/c29caf9e-fd5e-4209-aca1-245064771e76)

POST /api/reviews

Types posted: Review review with productId.

```typescript
type Review = {
  productId: number;
  rating: number;
  body: string; // The content of the review
};
```

## Product Manager

### Product Table

![Image](https://github.com/user-attachments/assets/b43313ec-d1cb-4497-b322-e3b16ff1e2f5)

#### Features

#### &check; Get all products to display in the table

GET /api/products

Types retrieved: Product[] (a list of products).

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
};
```

### Product Creator Form

<img width="1231" alt="image" src="https://github.com/user-attachments/assets/0a9b3485-e360-42b6-9532-fac2a04465d0">

POST /api/products

Use multipart/form-data to upload the image file.

```typescript
type Product = {
  name: string;
  price: number;
  featured: boolean;
  image: File; // The image file to upload
};
```
