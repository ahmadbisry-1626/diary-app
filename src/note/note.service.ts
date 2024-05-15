import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NoteService {
  constructor(private prisma: DatabaseService) { }

  async create(createNoteDto: CreateNoteDto) {
    const userId = await this.prisma.user.findUnique({
      where: {
        id: createNoteDto.userId
      }
    })

    const postId = await this.prisma.post.findUnique({
      where: {
        id: createNoteDto.postId
      }
    })

    if (!userId && !postId) {
      throw new Error('User and Post not found');
    }

    const newNote = await this.prisma.note.create({
      data: {
        ...createNoteDto,
        userId: userId.id,
        postId: postId.id
      }
    })

    return newNote;
  }

  async findAll() {
    return await this.prisma.note.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  async remove(id: string) {
    return await this.prisma.note.delete({
      where: {
        id
      }
    })
  }
}
