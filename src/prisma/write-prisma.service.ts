import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/write/client';

@Injectable()
export class WritePrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }
}
