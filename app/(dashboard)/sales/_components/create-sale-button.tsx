"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "../_components/upsert-sheet-content";
import { Product } from "@/app/generated/prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}
const CreateSaleButton = ({
  products,
  productOptions,
}: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Adicionar Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent
        products={products}
        productOptions={productOptions}
        setSheetIsOpen={setSheetIsOpen}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
