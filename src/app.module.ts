import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: '3306',
          user: 'etubaba',
          password: 'mun2la@@',
          database: 'lendsqr',
        },
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
