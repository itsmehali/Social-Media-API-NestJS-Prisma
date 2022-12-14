import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @MinLength(5)
  @MaxLength(60)
  @IsString()
  comment: string;

  userId: number;

  postId: number;
}
