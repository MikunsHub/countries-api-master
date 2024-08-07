import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LanguagesService } from './languages.service';
import { FetchLanguagesDto } from './dto/fetch-languages.dto';

@ApiTags('languages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get languages with countries and total speakers' })
  async getLanguages(@Query() query: FetchLanguagesDto) {
    return this.languagesService.getLanguages(query);
  }
}
