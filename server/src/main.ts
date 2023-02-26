import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as session from 'express-session';

var MemoryStore = require('memorystore')(session)
var sessionStor = new MemoryStore({checkperiod:60/*3minut*/});
import * as cors from "cors";
const corsOptions ={
  credentials: true,
  origin: true, 
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions)) // Use this after the variable declaration
  //Session
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
    
      cookie: { httpOnly: false, secure: false, maxAge: 1440000 },
      saveUninitialized: true, 
      store:sessionStor
    }),
  );
  //prevent CORS
  /*
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
 //   res.header('Access-Control-Allow-Credentials', 'true');
    return res.status(200).json({});
  }


    next();
  });*/
  await app.listen(3000);
}
bootstrap();
