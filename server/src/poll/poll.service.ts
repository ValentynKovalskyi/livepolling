import {Injectable} from '@nestjs/common';
import {CreatePollDto} from './dto/create-poll.dto';
import {UpdatePollDto} from './dto/update-poll.dto';
import {PrismaService} from "../prisma/prisma.service";
import {InjectUuidService} from "nestjs-uuid/dist/lib/uuid.injector";
import {UuidService} from "nestjs-uuid";

@Injectable()
export class PollService {
  constructor(private readonly prisma: PrismaService, private readonly uuid: UuidService) {
  }

  async create(createPollDto: CreatePollDto) {
    const pollGuid = this.uuid.generate()
    return this.prisma.poll.create({
      data: {
        guid: pollGuid,
        title: createPollDto.title,
        description: createPollDto.description,
        isActive: false
      }
    });
  }

  async findByGuid(guid: string) {
    if (!this.uuid.validate(guid)) throw new Error('Invalid guid')

    return this.prisma.poll.findUnique({
      where: {
        guid
      }
    })
  }

  async update(guid: string, updatePollDto: UpdatePollDto) {
    if (!this.uuid.validate(guid)) throw new Error('Invalid guid')

    return this.prisma.poll.update({
      where: {
        guid
      },
      data: updatePollDto
    })
  }

  async delete(guid: string) {
    if (!this.uuid.validate(guid)) throw new Error('Invalid guid')

    return this.prisma.poll.delete({
      where: {
        guid
      },
    })
  }
}