import { Injectable } from '@nestjs/common'
import { CreateDynamicDto } from './dto/create-dynamic.dto'
import { UpdateDynamicDto } from './dto/update-dynamic.dto'
import { Dynamic } from './entities/dynamic.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorCode } from '../tool/globalerror'

@Injectable()
export class DynamicService {
    constructor(
        @InjectRepository(Dynamic)
        private readonly DynamicRepository: Repository<Dynamic>
    ) {}
    async newUpdates(createDynamicDto: CreateDynamicDto, files) {
        try {
            const CreateDynamicData = new Dynamic()
            CreateDynamicData.description = createDynamicDto.description
            CreateDynamicData.imgArrayField = files.map((item) => item.path)
            const result = await this.DynamicRepository.save(CreateDynamicData)
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

    async findAllDynamic() {
        try {
            const result = await this.DynamicRepository.find({
                order: {
                    create_time: 'DESC',
                },
                where: {
                    state: 1,
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

    findOne(id: number) {
        return `This action returns a #${id} dynamic`
    }

    update(id: number, updateDynamicDto: UpdateDynamicDto) {
        return `This action updates a #${id} dynamic`
    }

    remove(id: number) {
        return `This action removes a #${id} dynamic`
    }
}
