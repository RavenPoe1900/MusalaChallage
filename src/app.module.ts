import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from './database/mongoose/softDelete/softDelete.plugin';
import { dateRegisterPlugin } from './database/mongoose/dateRegister/dateRegister.plugin';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }), 
    MongooseModule.forRootAsync({
        useFactory: () => ({ 
        uri: process.env.MONGO,
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          connection.plugin(dateRegisterPlugin);
          return connection;
        }
      })
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },    
  ],
})
export class AppModule {}
