import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IStoreDetail } from "@/types/shared";
import { useEffect, useState } from "react";

export function StoreTable(props: { data: IStoreDetail[] }) {
  const { data } = props;
  const [previousStocks, setPreviousStocks] = useState<number[]>(
    data.map((item) => item.stock)
  );
  const [highlightedRows, setHighlightedRows] = useState<Set<number>>(
    new Set()
  );

  /* eslint-disable */
  useEffect(() => {
    const currentStocks = data.map((item) => item.stock);
    const newHighlightedRows = new Set<number>();

    currentStocks.forEach((stock, index) => {
      if (
        previousStocks[index] !== undefined &&
        previousStocks[index] !== stock
      ) {
        newHighlightedRows.add(index);
      }
    });

    setPreviousStocks(currentStocks);
    setHighlightedRows(newHighlightedRows);

    const timer = setTimeout(() => {
      setHighlightedRows(new Set());
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);
  /* eslint-enable */

  return (
    <Table className="text-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] rounded-l-lg text-center">
            ID
          </TableHead>
          <TableHead className="text-center">รายการ</TableHead>
          <TableHead className="text-center">ราคาต่อหน่วย</TableHead>
          <TableHead className="rounded-r-lg text-center">
            จำนวนคงเหลือ
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((itemStore, indexStore) => {
          const isHighlighted = highlightedRows.has(indexStore);

          return (
            <TableRow key={indexStore} className="items-center text-center">
              <TableCell>{itemStore.id}</TableCell>
              <TableCell>{itemStore.name}</TableCell>
              <TableCell>{itemStore.price}</TableCell>
              <TableCell>
                <h1
                  className={`w-1/2 mx-auto ${
                    isHighlighted ? "bg-red-500" : "bg-yellow-500"
                  }`}
                >
                  {itemStore.stock}
                </h1>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
