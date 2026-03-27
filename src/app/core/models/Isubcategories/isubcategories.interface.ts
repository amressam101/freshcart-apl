export interface Isubcategories {
    results: number;
    metadata: Metadata;
    data: Datum[];
}

interface Datum {
    _id: string;
    name: string;
    slug: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
}