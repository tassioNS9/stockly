"use client";

import { Product } from "@/app/generated/prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui//dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import DeleteProductDialogContent from "./delete-dialog-content";

const getStatusLabel = (status: string) => {
  if (status == "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de Estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
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
      return <Badge>{label}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <AlertDialog>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-1.5"
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <TrashIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteProductDialogContent productId={product.id} />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
