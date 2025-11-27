import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "@/app/_components/ui/data-table";
import { getProducts } from "@/app/_data_access/product/get-product";
const ProductsPage = async () => {
  const products = await getProducts();

  console.log(products);
  return (
    <div className="mx-8 my-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <Button className="flex gap-2">
          {" "}
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </div>

      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
      {/*Quando passamos dados de um Server Component para um Client Component apenas alguns dados especificos são aceitos e o Decimal não está incluso por isso tivemos que fazer 
      essa conversão JSON.parse(JSON.stringify(products)  */}
    </div>
  );
};

export default ProductsPage;
