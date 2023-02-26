import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import {connect} from "../db/connectDB";
import  User  from '../users/entities/user.entity';
/*
@Injectable()
export class UploadService {

    constructor( 
     @InjectRepository(User)
    private readonly myEntityRepository: Repository<User>, ){}
    
    async createMany(myEntities: User[]): Promise<User[]> {
        const entities = await this.myEntityRepository.insert(myEntities);
        return entities.raw;
      }
}
*/

@Injectable()
export class UploadService {

  async createMany(myEntities: User[]): Promise<User[]>  {
let repository = connect.getRepository(User); 
const entities = await repository.insert(myEntities);

  return entities.raw;
  }
}