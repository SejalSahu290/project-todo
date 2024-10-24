/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todos.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getAllTodo(@Query() filterDto: GetTodoFilterDto): Promise<Todo[]> {
    return await this.todoService.getAllTodo(filterDto);
  }

  //     @Get()
  //     getTodo(@Query() filterDto: GetTodoFilterDto){
  //    if(Object.keys(filterDto).length){
  //      return this.todoService.getTodoWithFilters(filterDto)
  //    }else{
  //      return this.todoService.getAllTodo();
  //    }
  //     }

  @Get('/:id')
  getExpenseById(@Param('id') id: number): Promise<Todo>{
      return this.todoService.getTodoById(id);
  }
  // @Post()
  // createTodo(@Body('title') title:string , @Body('description') description:string ):Todo{
  //      return this.todoService.createTodo(title , description)
  // }

  @Post()
  async createExpense(@Body() createTodDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(createTodDto);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: number): Promise<void> {
    return await this.todoService.deleteTodo(id);
  }

  // @Patch('/:id/status')
  // updateTodoStatus(@Param('id') id:number , @Param('status') status:TodoStatus):Todo{
  //     return this.todoService.updateTodoStatus(id,status)
  // }

//   @Patch('/:id/:status')
//   updateTodoStatus(
//     @Param('id') id: number,
//     @Param('status') status: TodoStatus,
//   ): Todo {
//     return this.todoService.updateTodoStatus(id, status);
//   }

//   @Patch()
//  aysnc  updateTodo(@Body() updateTodoDto: UpdateTodoDto):Promise<Todo> {
//     return this.todoService.updateTodo(UpdateTodoDto);
//   }

// @Patch()
//   async updateTodo(
//       @Body() updateTodoDto: UpdateTodoDto,
//   ): Promise<Todo>{
//         return this.todoService.updateTodo(UpdateTodoDto);
//   }

@Patch(':id')  
async updateTodo(
  @Param('id') id: number,                 
  @Body() updateTodoDto: UpdateTodoDto     
): Promise<Todo> {
  return this.todoService.updateTodo(id, updateTodoDto); 
}


}
