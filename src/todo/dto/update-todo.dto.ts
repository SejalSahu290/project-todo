/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { TodoStatus } from "../todos.model";

export class UpdateTodoDto{
    
    @IsNotEmpty()
    id:number;


    @IsNotEmpty()
    title:string;


    @IsNotEmpty()
    description:string;


    @IsNotEmpty()
    status:TodoStatus
}


