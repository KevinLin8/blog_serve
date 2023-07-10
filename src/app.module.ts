import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { DynamicModule } from './dynamic/dynamic.module';
let envFilePath = ['.env'];
export const IS_DEV = process.env.RUNNING_ENV == 'prod';
if (IS_DEV) {
  envFilePath.unshift('.env.prod');
} else {
  envFilePath.unshift('.env.dev');
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,//使用环境变量
    }),
    // 加载连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: process.env.HOST, // 数据库ip地址
      port: Number(process.env.MY_SQL_PORT), // 端口
      username: process.env.USER, // 登录名
      password: process.env.PASSWORD, // 密码
      database: process.env.DATABASE, // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),
    // 加载子模块
    ArticleModule,
    DynamicModule,
  ],
})

export class AppModule {}
