import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {connect} from "../db/connectDB";
import User from './entities/user.entity';
@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    //return 'This action adds a new user';
    if(!createUserDto)
    return  {error:1,txt:"Error on field ..."}

    const user = new User();
user.firstname =createUserDto.firstname
user.lastname = createUserDto.lastname
user.email = createUserDto.email
user.password= createUserDto.password
user.role = createUserDto.role;
let repository = connect.getRepository(User); 
await repository.save(user);
    
    return {error:0,user:{firstname:createUserDto.firstname , lastname:createUserDto.lastname , email:createUserDto.email}}
   
    
  }

  async findAll() {
     //return `This action returns all users`;
     let repository = connect.getRepository(User); 
     const allUsers = await repository.find()
     if(allUsers.length == 0)
    return  {error:1,txt:"No users found"}
    else
    return {error:0,users:allUsers};
    /*return {error:0,users:[{
      id:1,
      pseudo:"pseudo1",
      role:"role"
},{
  id:2,
pseudo:"pseudo1",
role:"role"
}]};*/
   
  }

  async findOne(firstname: string ) {
    let repository = connect.getRepository(User); 
    const results = await repository.findOne({where: {firstname:firstname}});
    if(!results){
      throw new HttpException('NOT-FOUND', HttpStatus.NOT_FOUND);
    }
    return results;
  }

  async update(firstname: string, updateUserDto: UpdateUserDto) {
   // return `This action updates a #${firstname} user`;
    let repository = connect.getRepository(User); 
    let user = await repository.findOne({where: {firstname:firstname}});
    user.firstname =this.updateValue(user.firstname, updateUserDto.firstname)
    user.lastname = this.updateValue(user.lastname, updateUserDto.lastname)
    user.email = this.updateValue(user.firstname, updateUserDto.email)
    user.password= this.updateValue(user.firstname, updateUserDto.password)
    user.role = this.updateValue(user.firstname, updateUserDto.role)
    await repository.save(user);
  }

  async remove(firstname: string) {
    //return `This action removes a #${id} user`;
   
    let repository = connect.getRepository(User); 
    const results = await repository.delete({firstname:firstname});
    return results;
  }

updateValue(currentValue: any, newValue: any): any {
  if (newValue !== undefined && newValue !== currentValue) {
    return newValue;
  }
  return currentValue;
}
}
