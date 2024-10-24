/* eslint-disable prettier/prettier */
// import { TodoStatus } from "../todos.model";


// export class GetTodoFilterDto{
//     status?:TodoStatus;
//     search?:string;

// }

import { IsEnum, IsOptional, IsString } from "class-validator";
import { TodoStatus } from "../todos.model";

export class GetTodoFilterDto{

    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;

    @IsOptional()
    @IsString()
    search?: string;
}