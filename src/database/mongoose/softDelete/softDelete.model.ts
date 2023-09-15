import {Document, FilterQuery, ObjectId, ProjectionType, QueryOptions, SaveOptions} from "mongoose";
import * as mongoose from "mongoose";

export interface SoftDeleteModel<T extends Document> extends mongoose.Model<T> {
  findNotDeleted(filter?: FilterQuery<T>,  projection?: ProjectionType<T>, query?: QueryOptions<T>): Promise<T[]>;
  softDelete(removedId: ObjectId ,filter: FilterQuery<T>, query?: QueryOptions<T>): Promise<{ deleted: number }>;
}