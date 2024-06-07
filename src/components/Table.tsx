"use client"

import currency from "currency.js";
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
      header: "Name",
      accessorKey: "name",
      cell: (info:any) => (
        <a href={`cryptos/${info.row.original.id}`} className="text-2xl font-medium dark:text-almost-white text-surface">{info.row.original.name}</a>
      ),
    },
    {
      header: "Live USD Price",
      accessorKey: "price_usd",
      cell: (info:any) => (
        <span>{parseFloat(info.row.original.price_usd) > 0.99 ? currency(info.row.original.price_usd).format():"$" + info.row.original.price_usd}</span>
      )
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
          className="dark:bg-surface dark:focus:bg-zinc-600 bg-slate-100 focus:bg-slate-50 transition-colors block rounded-xl px-4 pr-20 h-full outline-none"
        ></input>
        <Search className="absolute right-4"/>
      </div>

      <table className="table-auto w-full">
        <thead className="text-center sm:text-lg xl:text-2xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-y dark:border-gray-600 py-6 border-surface font-bold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
                  className="border-y dark:border-gray-700 border-surface py-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section className="flex gap-12 mt-6 justify-center pb-12">
        <button onClick={() => table.setPageIndex(0)} className="w-16 h-16 rounded-xl dark:bg-surface dark:hover:bg-zinc-600 bg-slate-100 hover:bg-slate-50 transition-colors">
          {"<<"}
        </button>
        <button onClick={() => table.previousPage()} className="w-16 h-16 rounded-xl dark:bg-surface dark:hover:bg-zinc-600 bg-slate-100 hover:bg-slate-50 transition-colors">
          {"<"}
        </button>
        <button onClick={() => {
          table.nextPage() 
        }} className="w-16 h-16 rounded-xl dark:bg-surface dark:hover:bg-zinc-600 bg-slate-100 hover:bg-slate-50 transition-colors">
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount)}
          className="w-16 h-16 rounded-xl dark:bg-surface dark:hover:bg-zinc-600 bg-slate-100 hover:bg-slate-50 transition-colors"
        >
          {">>"}
        </button>
      </section>
    </div>
  );
}