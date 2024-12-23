import { ColumnDef } from "@tanstack/react-table";

export const CryptocurrenciesColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "price_usd",
    header: "Price (USD)",
  },
  {
    accessorKey: "percent_change_24h",
    header: "24h Change (%)",
  },
];
