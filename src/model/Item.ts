export interface Item {
    id: number;
    title: string;
    price: number;
    image: string;
}

export interface CartItem {
    id: number,
    title: string,
    image: string,
    price: number,
    quantity: number,
    totalLine: number
}