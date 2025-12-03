"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductDto } from "@/app/_data_access/product/get-product";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { Badge } from "@/app/_components/ui/badge";
const getStatusLabel = (status: string) => {
  if (status == "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de Estoque";
};

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge
          variant={label === "Em estoque" ? "default" : "outline"}
          className="gap-1.5"
        >
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      return <ProductTableDropdownMenu product={row.row.original} />;
    },
  },
];
