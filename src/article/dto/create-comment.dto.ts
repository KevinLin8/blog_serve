export class CreateComment {
    article_id: number
    user_nickname: string
    parent_comment_id?: number
    reply_comment_id?: number
    comment_level: number
    content: string
    top_status?: boolean
}
