import { ObjectId } from "mongoose";

export interface IRatePagination {
    payer_id: number;
    transaction_type: ObjectId;
    destination: string;
    source: string;
    page: number;
    perPage: number; 
}