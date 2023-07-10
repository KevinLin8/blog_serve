import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm'
import { SpecialColumnType } from './types/article_type'
import { Comment } from './comment.entity'
@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'varchar', length: 200, comment: '文章标题' })
    title: string
    @Column({ type: 'varchar', length: 500, comment: '文章描述' })
    description: string
    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
        comment: '文章封面图',
    })
    imgsrc: string
    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
        comment: '文章封面图_file',
    })
    file_img: string
    @CreateDateColumn({
        name: 'create_time',
        type: 'timestamp',
        comment: '创建时间',
    })
    create_time: Date
    @Column({ type: 'int', default: 0, comment: '观看' })
    see: number
    @Column({ type: 'int', default: 0, comment: '喜欢' })
    like: number
    @Column({ type: 'int', default: 0, comment: '评论' })
    comment: number
    @Column({
        type: 'enum',
        enum: SpecialColumnType,
        nullable: false,
        comment: '文章专栏',
    })
    type: number
    @Column({ type: 'int', default: 1, comment: '状态 1为正常 2为隐藏' })
    state: number
    @Column('json')
    articletitlelist: { id: string; title: string }[]
    @Column({ type: 'text' })
    htmlContent: string
    // 使用 @OneToMany 将实体 A 与 B 建立起对应关系
    @OneToMany((type) => Comment, (b) => b.CorrelationArticle) // 注意这里的 b.CorrelationArticle，其中 CorrelationArticle 是 Comment 中的字段
    CorrelationComment: Comment[]
}
