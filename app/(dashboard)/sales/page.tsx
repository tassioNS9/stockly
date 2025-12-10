import { getProducts } from "@/app/_data_access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { DataTable } from "@/app/_components/ui/data-table";
import UpsertSaleButton from "./_components/create-sale-button";
import { getSales } from "@/app/_data_access/sale/get-sales";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));
  return (
    <div className="mx-8 my-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <UpsertSaleButton
          products={JSON.parse(JSON.stringify(products))}
          productOptions={productOptions}
        />
      </div>

      <DataTable
        columns={saleTableColumns}
        data={JSON.parse(JSON.stringify(tableData))}
      />
      {/*Quando passamos dados de um Server Component para um Client Component apenas alguns dados especificos são aceitos e o Decimal não está incluso por isso tivemos que fazer 
      essa conversão JSON.parse(JSON.stringify(products)  */}
    </div>
  );
};

export default SalesPage;
