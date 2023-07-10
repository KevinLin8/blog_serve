import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'
import { Article } from './article.entity'
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'int', nullable: false, comment: '文章id' })
    article_id: number
    @Column({ type: 'varchar', length: 200, comment: '用户昵称' })
    user_nickname: string
    @Column({ type: 'int', default: 0, comment: '用户id' })
    user_id: number
    @Column({ type: 'int', default: 0, comment: '父级评论id' })
    parent_comment_id: number
    @Column({ type: 'int', default: 0, comment: '父级评论的userid' })
    parent_comment_user_id: number
    @Column({ type: 'int', default: 0, comment: '被回复的评论id' })
    reply_comment_id: number
    @Column({ type: 'int', default: 0, comment: '被回复的评论的userid' })
    reply_comment_user_id: number
    @Column({
        type: 'enum',
        enum: [1, 2],
        default: 1,
        comment: '评论级别 ，回复文章的是一级评论 ，其它的都是二级评论',
    })
    comment_level: number
    @Column({ type: 'varchar', length: 1024, comment: '评论内容' })
    content: string
    @Column({
        type: 'enum',
        enum: [1, 2],
        default: 1,
        comment: '评论状态，评论被删除了  都是 逻辑删除，不会真实删除',
    })
    status: number
    @Column({ type: 'int', default: 0, comment: '评论的点赞数量' })
    praise_num: number
    @Column({ type: 'boolean', default: false, comment: '评论是否置顶' })
    top_status: boolean
    @CreateDateColumn({
        name: 'create_time',
        type: 'timestamp',
        comment: '评论创建时间',
    })
    create_time: Date
    @ManyToOne((type) => Article, (a) => a.CorrelationComment)
    CorrelationArticle: Article
}
