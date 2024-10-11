export interface IStoreDetail {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export interface IStoreItem {
    id: string;
    province: string;
    store: IStoreDetail[];
}

export interface IUserItem {
    id: string;
    province: string;
    money: number
}
