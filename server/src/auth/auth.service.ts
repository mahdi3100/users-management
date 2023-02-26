import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { connect } from 'src/db/connectDB';
import User from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(){}
    async checkAuth(password:string ,email:string):Promise<any>{
        let repository =  connect.getRepository(User);
   
        const results = await repository.findOne({where: {password:password, email:email}});

        return results
    }
}


