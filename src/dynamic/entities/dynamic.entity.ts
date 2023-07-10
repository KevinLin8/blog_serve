import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm'
@Entity()
export class Dynamic {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'varchar', length: 200, comment: '动态内容' })
    description: string
    @Column('simple-array', { nullable: true })
    imgArrayField: string[]
    @CreateDateColumn({
        name: 'create_time',
        type: 'timestamp',
        comment: '创建时间',
    })
    create_time: Date
    @Column({ type: 'int', default: 0, comment: '喜欢' })
    like: number
    @Column({ type: 'int', default: 0, comment: '评论' })
    comment: number
    @Column({ type: 'int', default: 1, comment: '状态 1为正常 2为隐藏' })
    state: number
}
