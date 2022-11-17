import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/JwtPayload.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto, user: JwtPayload) {
    createPostDto.authorId = user.sub;
    return this.prisma.post.create({ data: createPostDto });
  }

  findAll(title: string) {
    return this.prisma.post.findMany({ where: { title } });
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number, user: JwtPayload) {
    if (!user) throw new NotFoundException('User not found');

    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    if (post.authorId !== user.sub && user.role === 'USER') {
      throw new UnauthorizedException('You do not have access to do that!');
    }

    return this.prisma.post.delete({ where: { id } });
  }
}
