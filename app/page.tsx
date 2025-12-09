import {
  CircleDollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "./_data_access/dashboard/get-dashboard";
import RevenueChart from "./(dashboard)/_components/revenue-chart";
import { getLast14DaysRevenue } from "./_data_access/dashboard/get-last-14-days-revenue";
import { getMostSoldProducts } from "./_data_access/dashboard/get-most-sold-products";
import MostSoldProductItem from "./(dashboard)/_components/most-sold-product-item";
import TotalRevenueCard from "./(dashboard)/_components/total-revenue-card";
import { Suspense } from "react";
import TodayRevenueCard from "./(dashboard)/_components/today-revenue-card";
import { SummaryCardSkeleton } from "./(dashboard)/_components/summary-card";
import Last14DaysRevenueCard from "./(dashboard)/_components/last-14-days-revenue-card";
import { Skeleton } from "./_components/ui/skeleton";
const Home = async () => {
  const { totalSales, totalStock, totalProducts } = await getDashboard();

  const totalLast14DaysRevenue = await getLast14DaysRevenue();
  const mostSoldProducts = await getMostSoldProducts();
  return (
    <div className="mx-8 my-8 w-full space-y-8 rounded-lg p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Dashboard
          </span>
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                <div className="h-4 w-48 rounded-md bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>

        <div className="rouded-xl flex h-full flex-col overflow-hidden bg-white p-6">
          <p className="p-6 text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>

          <div className="mt-3 space-y-7 overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductItem key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
