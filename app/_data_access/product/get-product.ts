import "server-only";
//Com o server-only garante um nível de segurança de que as informações não são levadas para o bundle do JS que é enviado para o client

import { Product } from "@/app/generated/prisma/client";
import { db } from "../../_lib/prisma";

export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({});
  return products;
};
