import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/read/client';

@Injectable()
export class ReadPrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }
}
