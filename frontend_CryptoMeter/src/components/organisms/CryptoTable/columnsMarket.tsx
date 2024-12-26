import { ColumnDef } from "@tanstack/react-table";

export const MarketsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quote",
    header: "Quote",
  },
  {
    accessorKey: "price_usd",
    header: "Price (USD)",
  },
  {
    accessorKey: "volume_usd",
    header: "Volume (USD)",
  },
];
