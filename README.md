# Monster Shop - frontend

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
