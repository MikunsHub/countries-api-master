import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RegionsService } from './regions.service';
import { FetchRegionsDto } from './dto/fetch-regions.dto';

@ApiTags('regions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get regions with countries and aggregated data' })
  async getRegions(@Query() query: FetchRegionsDto) {
    return this.regionsService.getRegions(query);
  }
}
