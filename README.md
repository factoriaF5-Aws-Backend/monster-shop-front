# Monster Shop - frontend

## Shop

### Product Cards Grid

![Image](https://github.com/user-attachments/assets/55fda9ac-a161-4871-8aca-81572d4d235a)

Using endpoints

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
};
```
