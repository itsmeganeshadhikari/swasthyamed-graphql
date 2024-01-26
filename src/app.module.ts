import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/api/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DataAccessModule } from 'libs/data-access/src';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProductModule } from './app/api/product/product.module';
import { UserModule } from './app/api/user/user.module';

@Module({
  imports: [
   ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/api/swasthya',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: any) => {
        /**
         * for validation error unauthenticated and forbidded show exception as it is
         */
        console.log(JSON.stringify(error));
        if (
          error.extensions.code == HttpStatus.FORBIDDEN ||
          error.extensions.code == HttpStatus.UNAUTHORIZED ||
          error.extensions.code == HttpStatus.BAD_REQUEST ||
          error.extensions.code == HttpStatus.NOT_FOUND
        ) {
          return error;
        } else {
          /**
           * User generated http exception
           */
          if (error.extensions?.exception?.name == 'HttpException') {
            return {
              message: error.message,
              extensions: {
                code: error.extensions.code,
                response: {
                  statusCode: error.extensions.exception?.status,
                  message: error.extensions.exception?.message,
                  error: 'Internal Server Error',
                },
              },
            };
          } else {
            return {
              message: 'Something went wrong.',
              extensions: {
                code: error.extensions.code,
                response: {
                  statusCode: 500,
                  message: 'Something went wrong',
                  error: 'Internal Server Error',
                },
              },
            };
          }
        }
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: encodeURI(configService.get('DATABASE_URI')),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    DataAccessModule,
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
