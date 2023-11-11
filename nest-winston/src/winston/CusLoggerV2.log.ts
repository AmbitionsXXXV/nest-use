import { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';

export class CusLoggerV2 implements LoggerService {
  private logger: Logger;

  constructor(options) {
    this.logger = createLogger(options);
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  // 使用 nest 自己的 Logger
  // log(message: string, context: string) {
  //   console.log(`---log---[${context}]---`, message);
  // }
  // error(message: string, context: string) {
  //   console.log(`---error---[${context}]---`, message);
  // }
  // warn(message: string, context: string) {
  //   console.log(`---warn---[${context}]---`, message);
  // }
}
