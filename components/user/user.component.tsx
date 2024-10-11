import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { IStoreDetail, IStoreItem, IUserItem } from "@/types/shared";
import { useOrderContext } from "@/context/orders.context";
import { province } from "@/constants/maps.constant";

interface IOrder extends IStoreDetail {
  qty: number;
  total: number;
  province: string;
}

export function UserInfo(props: { data: IUserItem; allStore: IStoreItem[] }) {
  const { data, allStore } = props;
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [product, setProduct] = useState<IStoreDetail[]>([]);
  const { handleStoreCut } = useOrderContext();

  const calculateProduct = () => {
    try {
      const productList = allStore.reduce((acc: IStoreDetail[], warehouse) => {
        warehouse.store.forEach((product) => {
          const existingProduct = acc.find((p) => p.id === product.id);
          if (existingProduct) {
            existingProduct.stock += product.stock;
            existingProduct.price = Math.min(
              existingProduct.price,
              product.price
            );
          } else {
            acc.push({ ...product });
          }
        });
        return acc;
      }, []);

      setProduct(productList);
    } catch (error) {
      console.error("Error list product:", error);
      return { success: false, error: `Error list product: ${error}` };
    }
  };

  const handleOrder = (item: IStoreDetail) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.id === item.id);

      if (existingOrder) {
        const calculateOrder = prevOrders.map((order) =>
          order.id === item.id
            ? {
                ...order,
                qty: order.qty + 1,
                total: (order.qty + 1) * order.price,
                province: data.province,
              }
            : order
        );

        handleStoreCut(allStore, calculateOrder);

        return calculateOrder;
      } else {
        const calculateOrder = [
          ...prevOrders,
          {
            ...item,
            qty: 1,
            total: item.price,
            province: data.province,
          },
        ];

        handleStoreCut(allStore, calculateOrder);

        return calculateOrder;
      }
    });
  };

  const getProvinceName = (provinceId: string) => {
    const foundProvince = province.find((p) => p.id === provinceId);
    return foundProvince ? foundProvince.name : "Unknown Province";
  };

  const calculateTotal = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const totalAmount = calculateTotal();
  const remainingMoney = data.money - totalAmount; // หักเงินคงเหลือจากยอดรวม

  /* eslint-disable */
  useEffect(() => {
    calculateProduct();
  }, [allStore]);
  /* eslint-enable */

  return (
    <div>
      <h1 className="text-center">{`${data.id} : ${getProvinceName(
        data.province
      )}`}</h1>

      <Table className="text-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] rounded-l-lg text-center">
              ID
            </TableHead>
            <TableHead className="text-center">รายการ</TableHead>
            <TableHead className="text-center">ราคาต่อหน่วย</TableHead>
            <TableHead className="text-center">จำนวนคงเหลือ</TableHead>
            <TableHead className="rounded-r-lg text-center">เลือก</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.map((item, index) => (
            <TableRow key={index} className="items-center text-center">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <Button onClick={() => handleOrder(item)}>สั่ง</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        {`รายการสั่งซื้อ : `}
        {orders.map((order) => (
          <div
            key={order.id}
          >{`${order.name} - จำนวน: ${order.qty} - รวม: ${order.total} บาท`}</div>
        ))}
      </div>
      <br />
      <div>{`ยอดรวม : ${calculateTotal()} บาท`}</div>
      <br />
      <div>{`คงเหลือ: ${remainingMoney} บาท`}</div>
    </div>
  );
}
