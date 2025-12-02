import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";

import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "@/app/_data_access/product/get-product";
import { ComboboxOption } from "@/app/_components/ui/combobox";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  return (
    <div className="mx-8 my-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Adicionar Venda</Button>
          </SheetTrigger>
          <UpsertSheetContent
            products={products}
            productOptions={productOptions}
          />
        </Sheet>
      </div>

      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
      {/*Quando passamos dados de um Server Component para um Client Component apenas alguns dados especificos são aceitos e o Decimal não está incluso por isso tivemos que fazer 
      essa conversão JSON.parse(JSON.stringify(products)  */}
    </div>
  );
};

export default SalesPage;
