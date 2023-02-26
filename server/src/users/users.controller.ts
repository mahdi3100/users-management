import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, UseInterceptors, Next, Res, All } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { CheckSession } from 'src/checkSession';
import { WithSession } from 'src/withSession';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService /*, @Req() req:Request*/) {
       /*
        if(!req.session.user){
          throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }*/

  }
  @All()
  myRouteHandler(@Req() req: Request, @CheckSession() sessionExists: boolean, @Res() res: Response,
    @Next() next: Function,): void {

    /**
     * check if request is not for creating new user .
     */
    if (req.method.toLowerCase() == "post" || sessionExists) {
      // Session exists, do something
      next();
    } else {
      res.status(401).send('Unauthorized');
      // Session does not exist, return error response

    }
  }
  @Post()
  async create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {

    //  return this.usersService.create(createUserDto);
    const result = await this.usersService.create(createUserDto);
    /**
         * Create Session for new user
         */
    if (result.error == 0) {
      req.session.user = result.user;
    }
    return result;

    /**
     * Observator wait Promise as return , we must not use Callback
     *
      this.usersService.create(createUserDto).then(result => {
  
        
        if(result.error == 0){
          req.session.user = result.user;
        }
        return result;
      })
    */
  }

  @Get()
  findAll() {


    return this.usersService.findAll();
  }

  @Get(':firstname')
  findOne(@Param('firstname') firstname: string) {

    return this.usersService.findOne(firstname);
  }

  @Patch(':firstname')
  update(@Param('firstname') firstname: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(firstname, updateUserDto);
  }

  @Delete(':firstname')
  remove(@Param('firstname') firstname: string) {
    return this.usersService.remove(firstname);
  }
}
