import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FilterQuery, Model, ObjectId, ProjectionType, QueryOptions, UpdateQuery, Document} from 'mongoose';
import { IPageInfo } from '../interface/pageInfo.interface';

@Injectable()
export class GenericService<
              T,
              R,
              S, 
              O extends Model<T & Document>,
              >{
  constructor(
      protected readonly repository: O,
  ){}
  internalServerErrorException =`Server Error: An internal server error occurred 
                              processing the request`;
  badRequestException = "The id does not exist";

  async create(dto: R): Promise<T> {
    try {
      dto['createdAt'] = new Date();
      dto['updatedAt'] = new Date();
      return await this.repository.create(dto);
    } catch(err) {
      throw new InternalServerErrorException(this.internalServerErrorException);
    }      
  }
    
  async find(
    filter?: FilterQuery<T>,  
    projection?: ProjectionType<T>, 
    query?: QueryOptions<T>
  ):Promise<IPageInfo<T>> { 
    query = query? query: {limit:1, skip:0};  
    let data;
    let count;
    try{
      if(!filter.deleteAt) filter = { ...filter, deletedAt: null};
      data = await this.repository.find(filter, projection, query).exec();
      count = await this.repository.count(); 
            
    }catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
    return this.createPageInfo(data, query, count);
  } 
  
  async findOne(
    filter: FilterQuery<T>,
    projections?: ProjectionType<T>,
    query?:QueryOptions<T>
  ): Promise<T>{
    let findOne;  
    try{
      findOne = await this.repository.findOne(filter, projections, query).exec();
    }catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
    if (!findOne) throw new BadRequestException(this.badRequestException);
    return findOne;
  }

  async updateById(
    filter: FilterQuery<T>,
    updateDto: UpdateQuery<S>, 
    options?: QueryOptions<T>) 
  {
    let update;
    try{
      updateDto['updatedAt'] = new Date(); 
      update = await this.repository.findOneAndUpdate(filter,updateDto as any,options);
    }catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
    if (!updateDto) throw new BadRequestException(this.badRequestException);
    return update
  }

  async delete(removedId: ObjectId ,filter: FilterQuery<T>, query?: QueryOptions<T>){   
      const updatedDto =  {
        deletedAt : new Date(),
        removedId : removedId,
      };
      return await this.updateById(filter,updatedDto,query);
     }

  protected createPageInfo(data: T[], query: QueryOptions<T>, count: number):IPageInfo<T> {
    const totalPage = Math.ceil(count/query.limit);
    return {
      rows: data,
      XTotal:	count,
      XTotalPages: totalPage,
      XPerPage:	query.limit,
      XPage: query.skip,
      XNextPage: query.skip === totalPage - 1? query.skip : query.skip + 1,
      XPrevPage: query.skip === 0? 1 : query.skip - 1,
    }
  }
}
