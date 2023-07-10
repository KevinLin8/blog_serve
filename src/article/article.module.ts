import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Comment } from './entities/comment.entity';
import {  MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join,extname} from 'path'
@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports:[TypeOrmModule.forFeature([Article,Comment]),
            MulterModule.register({
                storage:diskStorage({
                destination:join(__dirname,'../images'),//图片储存位置
                filename:(_,file,callback)=>{
                    const filename = new Date().getTime() + extname(file.originalname) //截取文件后缀
                    return callback(null,filename) 
                }
                })
            })
        ],
    })
export class ArticleModule {}
