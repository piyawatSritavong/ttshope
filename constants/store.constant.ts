import { IStoreItem } from "@/types/shared";

export const STORE = [
    {
        "id": "WH01",
        "province": "A01",
        "store": [
            {
                "id": "COM01",
                "name": "laptop",
                "price": 25000,
                "stock": 5,
            },
            {
                "id": "COM02",
                "name": "mouse",
                "price": 500,
                "stock": 10,
            },
            {
                "id": "COM03",
                "name": "keyboard",
                "price": 1000,
                "stock": 15,
            }
        ]
    },
    {
        "id": "WH02",
        "province": "A02",
        "store": [
            {
                "id": "COM01",
                "name": "laptop",
                "price": 25000,
                "stock": 8,
            },
            {
                "id": "COM02",
                "name": "mouse",
                "price": 500,
                "stock": 20
            },
            {
                "id": "COM03",
                "name": "keyboard",
                "price": 1000,
                "stock": 25
            }
        ]
    },
    {
        "id": "WH03",
        "province": "A03",
        "store": [
            {
                "id": "COM01",
                "name": "laptop",
                "price": 25000,
                "stock": 2,
            },
            {
                "id": "COM02",
                "name": "mouse",
                "price": 500,
                "stock": 50
            },
            {
                "id": "COM03",
                "name": "keyboard",
                "price": 1000,
                "stock": 30
            }
        ]
    }
] as IStoreItem[]