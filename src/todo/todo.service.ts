/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {  TodoStatus } from './todos.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo} from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ){}
    findToOne: any;

    async getAllTodo(filterDto: GetTodoFilterDto): Promise<Todo[]>{

        const {status, search} = filterDto;
        const query = this.todoRepository.createQueryBuilder('todo');

      
          if (status) {
            query.where('todo.status = :status', { status });
          }

        if(search){
          query.andWhere('(LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.description) LIKE LOWER(:search))',
            { search : `%${search}%`},
          );

      }

      
        const todo =  await query.getMany();
        return todo;

    }

   

   async getTodoById(id: number): Promise<Todo>{
        const found = await this.todoRepository.findOne({where:{id}});
        if (!found) {
            throw new NotFoundException(`Todo with ID ${id} not found.`);
        }
        return found;
    }
    
   
    async createTodo(
        createTodoDto: CreateTodoDto,
       
      ): Promise<Todo> {
        const { title, description } = createTodoDto;
    
        const todo = this.todoRepository.create({
            id:uuidv4(),
          title,
          description,
          status: TodoStatus.CREATED,
        });
    
        await this.todoRepository.save(todo);
        return todo;
      }

    
   async deleteTodo(id:number): Promise <void>{
    const result = await this.todoRepository.delete(id);

    if(result.affected === 0)
        throw new NotFoundException(`Todo with Id "${id}" not found`)
    }


async updateTodo(id: number, updateTodo: UpdateTodoDto): Promise<Todo> {
    const { title, description } = updateTodo;
    
    const todo = await this.getTodoById(id);
    
    todo.title = title;
    todo.description = description;
    
    await this.todoRepository.save(todo);
    
    return todo;
  }
  
  
  }
  





