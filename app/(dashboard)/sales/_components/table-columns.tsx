"use client";

import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
// import SalesTableDropdownMenu from "./table-dropdown-menu";
// import { ProductDto } from "@/app/_data-access/product/get-products";
// import { ComboboxOption } from "@/app/_components/ui/combobox";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data_access/sale/get-sales";
// interface SaleTableColumn {
//   products: ProductDto[];
//   productOptions: ComboboxOption[];
// }

export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "productsName",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: () => (
      <Button>
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
];
