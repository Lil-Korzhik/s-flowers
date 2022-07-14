export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: string;
    isExists: boolean;
    image: string;
    removeProduct?: any;
    categoryName: string;
}