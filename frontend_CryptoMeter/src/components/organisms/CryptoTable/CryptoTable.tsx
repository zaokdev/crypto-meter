import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";
import { getUserData, isLoggedIn } from "@/helpers/TokenHelpers";
import { useEffect, useState } from "react";
import { fetchGETAuth } from "@/helpers/fetchingData";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData | any, TValue>[];
  data: TData[];
  isCryptoDetailsNeeded: boolean;
}

export function CryptoTable<TData, TValue>({
  columns,
  data,
  isCryptoDetailsNeeded,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  const [bookmarkList, setBookmarkList] = useState<any[]>([]);

  useEffect(() => {
    if (!isCryptoDetailsNeeded) {
      return;
    }

    if (!isLoggedIn()) {
      toast("Log in to enable bookmarking");
      return;
    }

    const userData = getUserData();

    const getUserBookMarks = async () => {
      const response = await fetchGETAuth(
        `api/UserBookMarks/ByUserId?userId=${userData.Id}`
      );
      setBookmarkList(response);
    };
    getUserBookMarks();
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {isCryptoDetailsNeeded && (
                  <TableCell className="flex gap-3">
                    <Button
                      variant={"default"}
                      className="rounded-xl bg-slate-600 hover:bg-slate-700 text-white"
                      onClick={() => {
                        navigate("/details/" + row.original.id);
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      onClick={() => {
                        if (!isLoggedIn()) {
                          toast.error("You must be logged in to save a coin");
                          return;
                        }
                        console.log(bookmarkList);
                        toast(`El id de la cripto es: ${row.original.id}`);
                      }}
                      className={`rounded-xl hover:bg-red-500 text-white ${
                        bookmarkList?.includes(Number.parseInt(row.original.id))
                          ? "bg-red-700"
                          : "bg-slate-800"
                      }`}
                    >
                      <Bookmark />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
