import "server-only";
//Com o server-only garante um nível de segurança de que as informações não são levadas para o bundle do JS que é enviado para o client

import { Product } from "@/app/generated/prisma/client";
import { db } from "../../_lib/prisma";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto extends Omit<Product, "price"> {
  price: number;
  status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
