import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import {UuidModule} from "nestjs-uuid";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [UuidModule, PrismaModule],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
