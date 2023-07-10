import { NestFactory, } from '@nestjs/core';
import { AppModule ,IS_DEV} from './app.module';
import * as cors from 'cors';//引入解决跨域问题中间件
const path = require('path');
const express = require('express');
import 'dotenv/config';
import { Logger } from '@nestjs/common';
const PORT = process.env.PORT;
const PREFIX = process.env.PREFIX;
const logger: Logger = new Logger('main.ts');
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
    try{
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // 开启日志级别打印
        // logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
        logger:['log', 'debug', 'error', 'warn'],

    });

    app.useStaticAssets(path.join(__dirname,'images'),{
        prefix:"/publics"
    })

    app.use(cors())//使用解决跨域问题中间件

    app.setGlobalPrefix(PREFIX)

    app.use('/public', express.static(path.join(__dirname, '..', 'public')));
    // http://localhost:4000/public/images.jpg

    await app.listen(PORT,()=>{
            logger.log(`服务已经启动,接口请访问localhost:${PORT}/${PREFIX}`);
        });
    }catch (error) {
        logger.error(`Failed to start the application: ${error}`);
  }
}

bootstrap();
