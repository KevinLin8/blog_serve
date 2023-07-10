import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common'
import { DynamicService } from './dynamic.service'
import { CreateDynamicDto } from './dto/create-dynamic.dto'
import { UpdateDynamicDto } from './dto/update-dynamic.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
@Controller('dynamic')
export class DynamicController {
    constructor(private readonly dynamicService: DynamicService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    newUpdates(
        @Body() createDynamicDto: CreateDynamicDto,
        @UploadedFiles() files?
    ) {
        return this.dynamicService.newUpdates(createDynamicDto, files)
    }

    @Get()
    findAllDynamic() {
        return this.dynamicService.findAllDynamic()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dynamicService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDynamicDto: UpdateDynamicDto
    ) {
        return this.dynamicService.update(+id, updateDynamicDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dynamicService.remove(+id)
    }
}
