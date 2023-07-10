import { Module } from '@nestjs/common'
import { DynamicService } from './dynamic.service'
import { DynamicController } from './dynamic.controller'
import { Dynamic } from './entities/dynamic.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
@Module({
    controllers: [DynamicController],
    providers: [DynamicService],
    imports: [
        TypeOrmModule.forFeature([Dynamic]),
        MulterModule.register({
            storage: diskStorage({
                destination: join(__dirname, '../images'), //图片储存位置
                filename: (_, file, callback) => {
                    const filename =
                        new Date().getTime() + extname(file.originalname) //截取文件后缀
                    return callback(null, filename)
                },
            }),
        }),
    ],
})
export class DynamicModule {}
