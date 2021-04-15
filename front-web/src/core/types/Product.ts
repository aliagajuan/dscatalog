import { type } from "os";

export type ProductsResponse = {
    content: Product[];
    totalPages: number;
}

export type UsersResponse = {
    content: User[];
    totalPages: number;
}

export type Product={
    id: number;
    name: string;
    description: string;
    price:number;
    imgUrl:string;
    date:string;
    categories:Category[];

}

export type Category = {
    id: number;
    name:string;
}

export type User = {
    id: number;
    firstName: string,
	lastName:string,
	email:string,
}