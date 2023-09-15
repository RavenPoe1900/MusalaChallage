import { IsNotEmpty, IsString } from 'class-validator';
export class UploadConfig{
    @IsNotEmpty()
    @IsString()
    name: string;
}
