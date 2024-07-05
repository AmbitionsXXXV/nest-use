import { LoggerService } from '@nestjs/common'
import * as chalk from 'chalk'
import * as dayjs from 'dayjs'
import { createLogger, format, Logger, transports } from 'winston'

export class CusLogger implements LoggerService {
  private logger: Logger

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(({ context, level, message, time }) => {
          const appStr = chalk.green(`[NEST]`)
          const contextStr = chalk.yellow(`[${context}]`)

          return `${appStr} ${time} ${level} ${contextStr} ${message} `
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: '111.log',
          dirname: 'log',
        }),
      ],
    })
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    this.logger.log('info', message, { context, time })
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    this.logger.log('info', message, { context, time })
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    this.logger.log('info', message, { context, time })
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
