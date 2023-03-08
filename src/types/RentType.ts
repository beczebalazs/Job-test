export interface RentType {
    id: number;
    image?: string;
    title: string;
    description: string;
    price: number;
    region: string;
    city: string;
    address: string;
    comission?: number;
    phone?: number;
    email?: string;
}
