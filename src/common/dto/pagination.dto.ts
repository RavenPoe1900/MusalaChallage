import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Transform(({ value }) => parseInt(value))
	@ApiProperty({
		description: "Page",
		required: false,
		example: `0`,
		default: 0,
		minimum: 0,
	})
	page?: number = 0;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	@Transform(({ value }) => parseInt(value))
	@ApiProperty({
		description: "Number of items",
		example: `1`,
		required: false,
		default: 50,
		maximum: 100,
		minimum: 1,
	})
	perPage?: number = 50;

	@IsOptional()
	@ApiProperty()
	providerName?: string;
}
