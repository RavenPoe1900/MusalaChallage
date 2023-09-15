import {Document, FilterQuery, Model, QueryOptions} from "mongoose";

export interface DateRegisterModel<T extends Document> extends Model<T> {
  updatedByIdAndDateRegister<Q>(filter: FilterQuery<T>, updatedDto: Q, options?: QueryOptions<T>): Promise<T>;
  createdAndDateRegister<Q>(createdDto: Q | Q[]): Promise<T>;
}