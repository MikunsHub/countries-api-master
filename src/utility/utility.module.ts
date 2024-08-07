import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
