"use client"

import React, { useEffect, useState } from "react";
import { CoinData } from "@/types";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

export default function Table() {
  const [data, setData] = useState<CoinData[] | undefined>(undefined);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`https://api.coinlore.net/api/tickers/`);
      const { data } = await response.json();
      setData(data);
    }
    getData();
  }, []);

  const columns = [
    {
      header: "Rank",
      accessorKey: "rank",
    },
    {
      header: "Symbol",
      accessorKey: "symbol",
    },
    {
      header: "Currency Name",
      accessorKey: "name",
      cell: (info:any) => (
        <a href={`cryptos/${info.row.original.id}`} className="text-2xl font-medium text-almost-white">{info.row.original.name}</a>
      ),
    },
    {
      header: "Live USD Price",
      accessorKey: "price_usd",
    },
    {
      header: "Price Change 24h",
      accessorKey: "percent_change_24h",
      cell: (info:any) => (
        <span className={`${info.row.original.percent_change_24h[0] === "-" ? "text-red-500":'text-green-500'} text-xl font-semibold`}>{info.row.original.percent_change_24h}</span>
      )
        
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  /*CARGANDO */
  if (data === null) {
    return <div>Cargando...</div>;
  }

  /*TABLA */
  return (
    <div className="mx-4">
      <div className="flex max-w-fit relative h-16 my-12 justify-center items-center">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="dark:bg-surface block rounded-xl px-4 pr-20 h-full outline-none"
        ></input>
        <Search className="absolute right-4"/>
      </div>

      <table className="table-auto w-full">
        <thead className="text-center sm:text-lg xl:text-2xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-y dark:border-gray-600 py-6 font-bold">
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-center">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-y dark:border-gray-700 py-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section className="flex gap-12 mt-6 justify-center">
        <button onClick={() => table.setPageIndex(0)} className="w-16 h-16 rounded-xl dark:bg-surface">
          {"<<"}
        </button>
        <button onClick={() => table.previousPage()} className="w-16 h-16 rounded-xl dark:bg-surface">
          {"<"}
        </button>
        <button onClick={() => {
          table.nextPage() 
        }} className="w-16 h-16 rounded-xl dark:bg-surface">
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount)}
          className="w-16 h-16 rounded-xl dark:bg-surface"
        >
          {">>"}
        </button>
      </section>
    </div>
  );
}