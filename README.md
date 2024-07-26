# Monster Shop - frontend

## Shop

### Product Cards Grid

![Image](https://github.com/user-attachments/assets/89498ad7-6d4e-4199-b5b3-4cfeeb238a92)

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
  featured: boolean;
};
```
