import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { CreateComment } from './dto/create-comment.dto'
import { Article } from './entities/article.entity'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ErrorCode } from '../tool/globalerror'
@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly ArticleRepository: Repository<Article>,
        @InjectRepository(Comment)
        private readonly CommentRepository: Repository<Comment>
    ) {}
    async getCommentCount(id: number): Promise<number> {
        const queryBuilder = this.CommentRepository.createQueryBuilder(
            'Commentinquire'
        )
            .leftJoin('Commentinquire.CorrelationArticle', 'Articleinquire')
            .select('count(*)', 'comment_count')
            .where('Commentinquire.article_id = :id', { id: id })
            .andWhere('Commentinquire.comment_level = 1')
            .getRawOne()
        const result = await queryBuilder
        return parseInt(result.comment_count)
    }
    async create(createArticleDto: CreateArticleDto, file?: any) {
        try {
            console.log(createArticleDto)
            const CreateArticleData = new Article()
            CreateArticleData.title = createArticleDto.title
            CreateArticleData.description = createArticleDto.description
            CreateArticleData.type = createArticleDto.type
            CreateArticleData.htmlContent = createArticleDto.htmlContent
            CreateArticleData.imgsrc = createArticleDto?.imgsrc
            CreateArticleData.file_img = file?.path
            CreateArticleData.articletitlelist =
                createArticleDto.articletitlelist
            const result = await this.ArticleRepository.save(CreateArticleData)
            return {
                errcode: 0,
                message: '创建成功',
                data: result,
            }
        } catch (error) {
            return {
                error,
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }
    async findAllArticle() {
        try {
            const result = await this.ArticleRepository.find({
                order: {
                    create_time: 'DESC',
                },
                where: {
                    state: 1,
                },
            })
            for (let i = 0; i < result.length; i++) {
                result[i].comment = await this.getCommentCount(result[i].id)
            }
            return {
                errcode: 0,
                message: '查询成功',
                data: result,
            }
        } catch (error) {
            return {
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }

    async CreateCommentFn(parameter: CreateComment) {
        try {
            const CreateCommentData = new Comment()
            CreateCommentData.article_id = parameter.article_id
            CreateCommentData.user_nickname = parameter.user_nickname
            CreateCommentData.parent_comment_id = parameter.parent_comment_id
            CreateCommentData.reply_comment_id = parameter.reply_comment_id
            CreateCommentData.comment_level = parameter.comment_level
            CreateCommentData.content = parameter.content
            CreateCommentData.top_status = parameter?.top_status
            const result = await this.CommentRepository.save(CreateCommentData)
            return {
                errcode: 0,
                message: '创建成功',
                data: result,
            }
        } catch (error) {
            return {
                error,
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }

    async findAlComment(id: number) {
        try {
            const result = await this.CommentRepository.find({
                order: {
                    create_time: 'DESC',
                },
                where: {
                    article_id: id,
                },
            })
            return {
                errcode: 0,
                message: '查询成功',
                data: result,
            }
        } catch (error) {
            return {
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }

    async findOneArticle(id: number) {
        try {
            const result = await this.ArticleRepository.find({
                where: {
                    id,
                    state: 1,
                },
            })
            result[0].comment = await this.getCommentCount(result[0].id)
            return {
                errcode: 0,
                message: '查询成功',
                data: result,
            }
        } catch (error) {
            return {
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }

    async updateArticle(id: number, watchOrLike: number) {
        try {
            const ArticleToUpdate = await this.ArticleRepository.find({
                where: {
                    id,
                },
            })
            if (!ArticleToUpdate.length) {
                return {
                    errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                    message: 'NEST_SQL_EXECUTE_ERROR',
                }
            }
            const updateResults = await this.ArticleRepository.update(id, {
                ...(watchOrLike == 1
                    ? { see: ++ArticleToUpdate[0].see }
                    : null),
                ...(watchOrLike == 2
                    ? { like: ++ArticleToUpdate[0].like }
                    : null),
                ...(watchOrLike == 3
                    ? { like: --ArticleToUpdate[0].like }
                    : null),
            })
            return {
                errcode: '0',
                message: '成功',
                updateResults,
            }
        } catch (error) {
            return {
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }

    async removeArticle(id: number) {
        try {
            const ArticleToUpdate = await this.ArticleRepository.find({
                where: {
                    id,
                },
            })
            if (!ArticleToUpdate.length) {
                return {
                    errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                    message: 'NEST_SQL_EXECUTE_ERROR',
                }
            }
            const updateResults = await this.ArticleRepository.update(id, {
                state: 2,
            })
            return {
                errcode: '0',
                message: '成功',
                updateResults,
            }
        } catch (error) {
            return {
                errcode: ErrorCode['NEST_SQL_EXECUTE_ERROR'],
                message: 'NEST_SQL_EXECUTE_ERROR',
            }
        }
    }
}
