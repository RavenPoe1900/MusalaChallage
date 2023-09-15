import mongoose, { CallbackError, FilterQuery, ObjectId, ProjectionType, QueryOptions } from 'mongoose';

export const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
    },
    removedId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
  });

  // @ts-ignore
  schema.pre('find',
    async function (this, next: (err?: CallbackError) => void) {
      if (this.getFilter().isDeleted === true) {
        return next();
      }
      this.setQuery({ ...this.getFilter(), isDeleted: false });
      next();
    },
  );

  // @ts-ignore
  schema.pre('count',
    async function (this, next: (err?: CallbackError) => void) {
      if (this.getFilter().isDeleted === true) {
        return next();
      }
      this.setQuery({ ...this.getFilter(), isDeleted: false });
      next();
    })

  // @ts-ignore
  schema.pre('countDocuments',
    async function (this, next: (err?: CallbackError) => void) {
      if (this.getFilter().isDeleted === true) {
        return next();
      }
      this.setQuery({ ...this.getFilter(), isDeleted: false });
      next();
    })

  schema.static('findNotDeleted', async function 
    <T>(filter?: FilterQuery<T>,  projection?: ProjectionType<T>, query?: QueryOptions<T>):Promise<T> {
    const filterDeleted = { ...filter, deletedAt: null};
    return await this.find(filterDeleted, projection, query);
  });

  schema.static('softDelete', async function 
  <T>(removedId: ObjectId ,filter: FilterQuery<T>, query?: QueryOptions<T>) { 
    const updatedDto =  {
      deletedAt : new Date(),
      removedId : removedId,
    };
    return await this.updateOne(filter,updatedDto,query);
  });
};