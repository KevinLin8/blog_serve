import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { CreateComment } from './dto/create-comment.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
    //创建文章
    @Post()
    @UseInterceptors(FileInterceptor('file_img')) //上传单个文件传FileInterceptor，多个传FilesInterceptor 传入的'file_img'对应参数名称
    CreateArticle(
        @Body() createArticleDto: CreateArticleDto,
        @UploadedFile() file?
    ) {
        return this.articleService.create(createArticleDto, file)
    }
    //文章创建评论
    @Post('comment')
    CreateCommentFn(@Body() ReqComment: CreateComment) {
        return this.articleService.CreateCommentFn(ReqComment)
    }

    // 获取所有文章
    @Get()
    findAllArticle() {
        return this.articleService.findAllArticle()
    }

    // 获取文章评论
    @Get('comment/:id')
    findAlComment(@Param('id') id: string) {
        return this.articleService.findAlComment(+id)
    }
    // 获取指定文章
    @Get(':id')
    findOneArticle(@Param('id') id: string) {
        return this.articleService.findOneArticle(+id)
    }

    // 修改文章点赞观看数
    @Patch(':id')
    updateArticle(@Param('id') id: string, @Body() req: UpdateArticleDto) {
        return this.articleService.updateArticle(+id, req.watchOrLike)
    }

    // 设置文章为隐藏
    @Delete(':id')
    removeArticle(@Param('id') id: string) {
        return this.articleService.removeArticle(+id)
    }
}
