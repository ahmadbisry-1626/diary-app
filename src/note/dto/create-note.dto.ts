import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    noteBody: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    postId: string
}
