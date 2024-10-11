"use client";

import { useEffect, useState } from "react";
import { IStoreItem } from "@/types/shared";
import { UserInfo } from "@/components/user/user.component";
import { StoreTable } from "@/components/store/store.component";
import { province } from "@/constants/maps.constant";
import { STORE } from "@/constants/store.constant";
import { USER_INFO } from "@/constants/user.contannt";
import { useOrderContext } from "@/context/orders.context";

function HomePage() {
  const { orderState } = useOrderContext();
  const [allStore, setAllStore] = useState<IStoreItem[]>(STORE);

  const getProvinceName = (provinceId: string) => {
    const foundProvince = province.find((p) => p.id === provinceId);
    return foundProvince ? foundProvince.name : "Unknown Province";
  };

  useEffect(() => {
    if (orderState && orderState?.length > 0) {
      setAllStore(orderState);
    }
  }, [orderState]);

  return (
    <div>
      <div className="flex justify-between gap-12 ">
        {USER_INFO.map((item, index) => (
          <div
            key={index}
            className="border-2 border-indigo-500 rounded-lg w-full p-5"
          >
            <UserInfo data={item} allStore={allStore} />
          </div>
        ))}
      </div>

      <hr className="border border-indigo-500 w-full my-10" />

      <div className="flex justify-between gap-12">
        {allStore.map((item, index) => (
          <div
            key={index}
            className="border-2 border-indigo-500 rounded-lg w-full text-center p-5"
          >
            <h1>{`${item.id} : ${getProvinceName(item.province)}`}</h1>
            <StoreTable data={item.store} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
