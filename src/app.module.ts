import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { NoteModule } from './note/note.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PostModule, NoteModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
