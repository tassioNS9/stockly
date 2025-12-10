"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "../_components/upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import { ProductDto } from "@/app/_data_access/product/get-products";

interface UpsertSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}
const UpsertSaleButton = ({
  products,
  productOptions,
}: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Adicionar Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent
        isOpen={sheetIsOpen}
        products={products}
        productOptions={productOptions}
        setSheetIsOpen={setSheetIsOpen}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
