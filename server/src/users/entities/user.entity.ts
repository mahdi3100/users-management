import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;
  
    @Column()
    role: string;
}
