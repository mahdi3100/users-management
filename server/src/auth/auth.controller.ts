import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Request , Response} from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   
    constructor(private readonly authService: AuthService){}

    @Post("signin")
    create(@Req() req:Request , @Body() userCredandtials:UserLogin, @Res() res:Response){
      
       
        let user:UserLogin
        try{
      
            user =<UserLogin>userCredandtials
        }catch(e){
            console.log(e)
            //issue with query.user !
            return res.send({error:1,txt:"Please try again ! "})
        }
        this.authService.checkAuth(user.password, user.email).then((data)=>{

      
        //if (user.email === 'test@test.com' && user.password === 'test') { 
          if (data) { 
           // this.registerservice.signup(f.value).subscribe(data =>{
            let userInfo = {firstname:data.firstname,lastname:data.lastname,email:user.email}
            
            //Session Decalre in app.module for user interface
              req.session.user = userInfo;
            

            return res.send({credential:true,user:{...userInfo}})
            //OF Because "Observable"
            //return of({credential:true,user:{...userInfo}}); 
          }else{
            return res.send({credential:false,user:null}); 
        }
    });
          
    }
    /*
    @Post("signup")
    signup(@Req() req:Request , @Body() userCredandtials:UserLogin, @Res() res:Response){

    }*/
}
export interface UserLogin {

    email:string,
    password:string,
  
}
