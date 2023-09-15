import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ObjectId } from 'mongodb';

export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!this.isString(value))
            throw new BadRequestException("Id must be a string");
        return value;
    }
    private isString(value:any){
        return ObjectId.isValid(value);
    }
}