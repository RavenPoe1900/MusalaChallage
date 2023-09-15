export interface IDelete {    
    modifiedCount: number;    
    matchedCount: number;   
    upsertedId: string | null;
    upsertedCount: boolean;
    acknowledged: boolean;
}