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
import {
  getUserData,
  invalidTokenDetected,
  isLoggedIn,
  isTokenStillValid,
} from "@/helpers/TokenHelpers";
import { useEffect, useState } from "react";
import {
  fetchDELETEAuthWithQueryData,
  fetchGETAuth,
  fetchPOSTAuthWithQueryData,
} from "@/helpers/fetchingData";

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
  const [isProcessing, setIsProcessing] = useState<boolean>();

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
      const tokenValid = isTokenStillValid();
      if (!tokenValid) {
        invalidTokenDetected(navigate);
        return;
      }
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
                      onClick={async () => {
                        setIsProcessing(true);
                        if (!isLoggedIn()) {
                          toast.error("You must be logged in to save a coin");
                          setIsProcessing(false);
                          return;
                        }

                        const cryptoId = Number.parseInt(row.original.id);
                        const { Id } = getUserData();

                        if (bookmarkList.includes(cryptoId)) {
                          //DELETE BOOKMARK
                          try {
                            await fetchDELETEAuthWithQueryData(
                              `api/UserBookMarks?UserId=${Id}&cryptoId=${cryptoId}`
                            )
                              .then(() => {
                                const updatedBookmarkList = bookmarkList.filter(
                                  (item) => item !== cryptoId
                                );
                                setBookmarkList(updatedBookmarkList);
                              })
                              .then(() => toast("Removed successfully"));
                          } catch (ex: any) {
                            setIsProcessing(false);
                            toast.error(ex.message);
                          } finally {
                            setIsProcessing(false);
                            return;
                          }
                        }
                        //ADD BOOKMARK
                        try {
                          await fetchPOSTAuthWithQueryData(
                            `api/UserBookMarks?UserId=${Id}&cryptoId=${cryptoId}`
                          ).then(() => toast("Added successfully"));
                          setBookmarkList((prev: any) => [...prev, cryptoId]);
                        } catch (ex: any) {
                          setIsProcessing(false);
                          toast.error(ex.message);
                        } finally {
                          setIsProcessing(false);
                          return;
                        }
                      }}
                      className={`disabled:bg-gray-900 rounded-xl hover:bg-red-500 text-white ${
                        bookmarkList?.includes(Number.parseInt(row.original.id))
                          ? "bg-red-700"
                          : "bg-slate-800"
                      }`}
                      disabled={isProcessing}
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
