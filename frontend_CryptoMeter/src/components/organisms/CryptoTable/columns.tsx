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
    cell: (info: any) => {
      const value = info.row.original.price_usd;
      const formattedValue = new Intl.NumberFormat("en-US").format(value);
      return <span>{`$ ${formattedValue}`}</span>;
    },
  },
  {
    accessorKey: "percent_change_24h",
    header: "24h Change (%)",
    //GREEN OR RED COLOR TEXT
    cell: (info: any) => {
      const value = info.row.original.percent_change_24h;
      return (
        <span className={value > 0 ? "text-green-500" : "text-red-500"}>
          {value}
        </span>
      );
    },
  },
];
