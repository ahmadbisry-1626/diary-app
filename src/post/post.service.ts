import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: DatabaseService) { }

  async create(createPostDto: CreatePostDto) {
    const userId = await this.prisma.user.findUnique({
      where: {
        id: createPostDto.userId
      }
    })

    if (!userId) {
      throw new Error('User not found');
    }

    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        userId: userId.id
      },
    })

    return newPost;
  }

  async findAll() {
    return this.prisma.post.findMany()
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: {
        id
      }
    })
  }
}
