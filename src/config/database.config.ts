import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { config as dotenvConfig } from 'dotenv'
dotenvConfig({path: './.env'})

export const databaseConfig = TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        synchronize: true,
        dropSchema: false,
        logging: false
      })
})

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  logging: false,
});