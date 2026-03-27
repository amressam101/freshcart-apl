export interface Iaddress {
    results: number;
    status: string;
    data: Datum[];
}

interface Datum {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}