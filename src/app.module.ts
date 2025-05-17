import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { ConfigModule} from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { CategoryModule } from './modules/categories/categories.module';
import { OrderModule } from './modules/orders/orders.module';
import { FileModule } from './modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    }),
    UserModule,
    AuthModule, 
    ProductModule,
    CategoryModule,
    OrderModule,
    FileModule,
    databaseConfig,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
