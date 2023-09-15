import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ObjectIdDto{
   
    @ApiProperty({
        description: "MongoDB objectId",
        example:"634a2b03238bf63ff3c75ea1"
    })
    id: ObjectId;
}
