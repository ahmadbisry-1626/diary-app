import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    postBody: string;

    @IsNotEmpty()
    @IsString()
    userId: string
} 
