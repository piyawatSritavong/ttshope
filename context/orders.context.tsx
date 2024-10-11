"use client";

import { nearestStore } from "@/constants/maps.constant";
import { IStoreDetail, IStoreItem } from "@/types/shared";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IOrderContext {
  orderState: IStoreItem[] | undefined;
  handleStoreCut: (allStore: IStoreItem[], orders: IOrder[]) => void;
}

interface IOrder extends IStoreDetail {
  qty: number;
  total: number;
  province: string;
}

const OrderContext = createContext<IOrderContext | undefined>(undefined);

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const [orderState, setOrderState] = useState<IStoreItem[] | undefined>([]);

  const handleStoreCut = (allStore: IStoreItem[], orders: IOrder[]) => {
    try {
      let updatedStore = [...allStore];

      orders.forEach((order) => {
        const nearestProvinces = nearestStore[order.province] || [];

        if (!nearestProvinces.length) {
          console.warn(`No nearest store found for province ${order.province}`);
          return;
        }

        let remainingQty = order.qty;

        nearestProvinces.reduce((acc, nearestProvince) => {
          if (remainingQty <= 0) return acc;

          updatedStore = updatedStore.map((store) => {
            if (store.province === nearestProvince) {
              const updatedStoreItems = store.store.map((storeItem) => {
                if (storeItem.id === order.id) {
                  const stockToCut = Math.min(storeItem.stock, remainingQty);
                  remainingQty -= stockToCut;

                  return {
                    ...storeItem,
                    stock: storeItem.stock - stockToCut,
                  };
                }

                return storeItem;
              });

              return {
                ...store,
                store: updatedStoreItems,
              };
            }
            return store;
          });

          return acc;
        }, remainingQty);

        if (remainingQty > 0) {
          console.warn(
            `Order ${order.id} could not be fulfilled completely. Remaining qty: ${remainingQty}`
          );
        }
      });

      setOrderState(updatedStore);
    } catch (error) {
      console.error("Error updating stock:", error);
      return { success: false, error: `Error updating stock: ${error}` };
    }
  };

  return (
    <OrderContext.Provider value={{ orderState, handleStoreCut }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);

  if (context === undefined) {
    throw new Error(
      "useOrderContext must be used within a OrderContextProvider"
    );
  }

  return context;
}
