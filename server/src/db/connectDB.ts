import { DataSource,createConnection } from "typeorm";
import User from '../users/entities/user.entity';

export const connect = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ok",
    database: "users-management",
    entities: [User],
    synchronize: true,
   // driver: require("mysql2") // <--- import the driver here
   // driver: require("mysql") 
  });
connect.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {console.error("Error during Data Source initialization", err)})


/*
export const connect =  createConnection({
  // ...
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "mydb",
  "entities": ["src/entities/*.ts"],
  "synchronize": true
}).then(connection => {
  // ...
});

*/
/*
const connectionOptions: MongoConnectionOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/mydb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [User],
};*/