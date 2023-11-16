import { DynamicModule, Global, Module } from '@nestjs/common'
import { LoggerOptions } from 'winston'
import { CusLoggerV2 } from './CusLoggerV2.log'

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER'

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new CusLoggerV2(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    }
  }
}
