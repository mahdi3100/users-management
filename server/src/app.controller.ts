import { Controller, Get, Options, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/logout")
  logout(@Req() req:Request):any{


     if(req.session.user){
   

        req.session.destroy(function(err) {
          // cannot access session here
       })
     }
     return;
  }
}
