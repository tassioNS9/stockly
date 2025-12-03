import "server-only";
//Com o server-only garante um nível de segurança de que as informações não são levadas para o bundle do JS que é enviado para o client

import { Product } from "@/app/generated/prisma/client";
import { db } from "../../_lib/prisma";

export interface ProductDto extends Product {
  status: "IN_STOCK" | "OUT_OF_TOCK";
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_TOCK",
  }));
};
