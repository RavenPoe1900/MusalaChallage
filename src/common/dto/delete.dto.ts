
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteDto{
    @IsNumber()
    @ApiProperty({
        description: "Number of documents modified",
        example: `1`
    })
    modifiedCount: number;
    
    @IsNumber()
    @ApiProperty({
        description: "Number of documents matched",
        example: `1`
    })
    matchedCount: number;

    @IsNumber()
    @ApiProperty({
        description: "Null or an id containing a document that had to be upserted",
        example: `637444979f01e7b91c34ca11`
    })
    upsertedId: string | null;

    @IsNumber()
    @ApiProperty({
        description: "Number indicating how many documents had to be upserted. Will either be 0 or 1.",
        example: `1`
    })
    upsertedCount: boolean;

    @IsNumber()
    @ApiProperty({
        description: "Boolean indicating everything went smoothly",
        example: `1`
    })
    acknowledged: boolean;
}