import { db } from "@/app/_lib/prisma";

interface DashboardDto {
  totalRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
}

export const getDashboard = async (): Promise<DashboardDto> => {
  // Aqui obtemos o valor total da vendas
  const totalRevenueQuery = `
    SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
    FROM "SaleProduct";
  `;

  //
  // Aqui só estamos obtendo a soma dos items das vendas e nao o tal das vendas
  //   const totalRevenuePromise = db.saleProduct.aggregate({
  //     _sum: {
  //       unitPrice: true,
  //     },
  //   });

  const totalRevenuePromise =
    db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);

  // Aqui só estamos obtendo a soma dos items das vendas e nao o tal das vendas
  //   const todayRevenuePromise = db.saleProduct.aggregate({
  //     _sum: {
  //       unitPrice: true,
  //     },
  //     where: {
  //       createdAt: {
  //         gte: startOfDay,
  //         lte: endOfDay,
  //       },
  //     },
  //   });

  const totalSalesPromise = db.sale.count();

  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  const totalProductsPromise = db.product.count();

  const [totalRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalProductsPromise,
    ]);
  return {
    totalRevenue: totalRevenue[0].totalRevenue,
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
  };
};
