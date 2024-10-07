import {Body, Controller, Delete, Get, Param, Patch, Post, Res} from '@nestjs/common';
import {PollService} from './poll.service';
import {CreatePollDto} from './dto/create-poll.dto';
import {UpdatePollDto} from './dto/update-poll.dto';
import {Response} from "express";

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto, @Res({ passthrough: true }) res: Response) {
    try{
      return await this.pollService.create(createPollDto)
    } catch (e){
      res.status(501).send(e.message())
    }
  }

  @Get('/:guid')
  async findByGuid(@Param('guid') guid: string, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.pollService.findByGuid(guid);
    } catch (e) {
      res.status(501).send(e.toString())
    }
  }

  @Patch('/:guid')
  async update(@Param('guid') guid: string, @Body() updatePollDto: UpdatePollDto, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.pollService.update(guid, updatePollDto);
    } catch (e) {
      res.status(501).send(e.toString())
    }
  }

  @Delete('/:guid')
  async remove(@Param('guid') guid: string, @Body() updatePollDto: UpdatePollDto, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.pollService.delete(guid);
    } catch (e) {
      res.status(501).send(e.toString())
    }
  }
}
