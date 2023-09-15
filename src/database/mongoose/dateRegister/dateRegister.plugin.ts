import mongoose, { FilterQuery, ObjectId, QueryOptions, UpdateQuery } from 'mongoose';

export const dateRegisterPlugin = (schema: mongoose.Schema) => {
  schema.add({
    createdAt:{
      type: Date,
      default: Date.now,
      required: [true, 'CREATEDAT_IS_BLANK'],
    },
    updatedAt:{
      type: Date,
      default: Date.now,
      required: [true, 'UPDATEDAT_IS_BLANK'],
    },
  }); 
  schema.static('updatedByIdAndDateRegister', 
    async function <T,Q>(filter: FilterQuery<T>, updatedDto: UpdateQuery<Q>, query?: QueryOptions<T>): Promise<T | String> {
    updatedDto['updatedAt'] = new Date(); 
    return await this.updateOne(filter,updatedDto,query);
  });

  schema.static('createdAndDateRegister', async function <T,Q>(createdDto: Q | Q []): Promise< T | T [] | String> {
    createdDto['createdAt'] = new Date();
    createdDto['updatedAt'] = new Date();
    return await this.create(createdDto);
  });
};