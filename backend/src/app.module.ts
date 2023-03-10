import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: config.get('databaseHost'),
      port: config.get('databasePort'),
      username: config.get('databaseUsername'),
      password: config.get('databasePassword'),
      database: config.get('databaseName'),
      schema: config.get('databaseSchema'),
      entities: ['src/entities/*{.js,.ts}'],
      synchronize: false,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    }),
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
