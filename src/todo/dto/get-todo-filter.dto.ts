/* eslint-disable prettier/prettier */

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