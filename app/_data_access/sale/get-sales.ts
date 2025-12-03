import "server-only";
//Com o server-only garante um nível de segurança de que as informações não são levadas para o bundle do JS que é enviado para o client

import { db } from "../../_lib/prisma";

export interface SaleDto {
  id: string;
  productsName: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productsName: sale.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(" * "),
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
  }));
};
