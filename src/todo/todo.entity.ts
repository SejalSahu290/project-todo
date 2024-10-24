/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "./todos.model";

@Entity()
export class Todo{
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    title:string;
    
    @Column()
    description:string;

    @Column()
    status: TodoStatus;
}