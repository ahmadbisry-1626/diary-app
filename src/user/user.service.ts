import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { hash } from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) { }

  async create(userData: UserDto) {
    const userEmail = await this.prisma.user.findUnique({
      where: {
        email: userData.email
      }
    })

    if (userEmail) throw new ConflictException('Email already exists')

    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        password: await hash(userData.password, 10)
      }
    })

    const { password, ...result } = newUser

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id }
    })
  }
}
