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
    // private todo = [];
    findToOne: any;

    // getAllTodo(){
    //     return this.todo;
    // }

    async getAllTodo(filterDto: GetTodoFilterDto): Promise<Todo[]>{

        const {status, search} = filterDto;
        const query = this.todoRepository.createQueryBuilder('todo');

        query.where({status});

        if(search){
            query.andWhere('(LOWER(expense.title) LIKE LOWER(:search) OR LOWER(expense.description) LIKE LOWER(:search))',
              { search : `%${search}%`},
            );
        }

        const todo =  await query.getMany();
        return todo;

    }

    // getTodoWithFilters(filterDto: GetTodoFilterDto){
    //       const {status , search}= filterDto;

    //       let todos = this.getAllTodo();

    //       if(status){
    //         todos = todos.filter((todo) => todo.status === status)
    //       }
    //       if(search){
    //           todos.filter((todo) => {
    //             if(todo.title.includes(search) || todo.description.includes(search))
    //                 return true;
    //          })
    //       }
    // }

   async getTodoById(id: number): Promise<Todo>{
        const found = await this.todoRepository.findOne({where:{id}});
        if (!found) {
            throw new NotFoundException(`Todo with ID ${id} not found.`);
        }
        return found;
    }
    
    // createTodo(title: string, description: string): Todo {
    //     const todo: Todo = {
    //         id: uuidv4(), 
    //         title,
    //         description,
    //         status: TodoStatus.CREATED, 
    //     };
    
    //      this.todo.push(todo);
    //     return todo;
    // }

    // createTodo(createTodoDto:CreateTodoDto): Todo {
    //     const{title , description} = createTodoDto
    //     const todo = {
    //         id: uuidv4(), 
    //         title,
    //         description,
    //         status: TodoStatus.CREATED, 
    //     };
    
    //      this.todo.push(todo);
    //     return todo;
    // }


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
        throw new NotFoundException(`Expense with Id "${id}" not found`)
    }

    // updateTodoStatus(id:number , status: TodoStatus){
    //     const todo = this.getTodoById(id);
    //     todo.status = status;
    //     return todo;
    // }

    // updateTodoStatus(id: number, status: TodoStatus): Todo{
    //     const todo = this.getTodoById(id);
    //     if (todo) {
    //         todo.status = status; 
    //     }
    //     return todo;
    // }

    // updateTodoStatus(id: number , status:TodoStatus): Todo {
    //     const todo = this.getTodoById(id);
    //     if (!todo) {
    //         throw new NotFoundException(`Todo with ID ${id} not found.`);
    //     }
    //     todo.status = status;
    //     return todo; 
    // }

    // updateTodoStatus(id: number , status:TodoStatus): Todo {
    //     const todo = this.getTodoById(id);
    //     todo.status = status;
    //     return todo; 
    // }
    

// async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
//     const todo = this.getTodoById(id);  
  
//     const { title, description } = updateTodoDto;
  
//     todo.title = title ; 
//     todo.description = description;
  
//    await this.todoRepository.save(todo)
    
//     return todo; 
//   }



// async updateTodo(id:number ,updateTodoDto: UpdateTodoDto ): Promise<Todo>{
//  const { title , description} = updateTodoDto;
//         const todo =  await this.getTodoById(id);
  
//        todo.title = title;
//       todo.description = description;
       
//      await this.todoRepository.save(todo);
  
//       return todo;
//     }
  


async updateTodo(id: number, updateTodo: UpdateTodoDto): Promise<Todo> {
    const { title, description } = updateTodo;
    
    const todo = await this.getTodoById(id);
    
    todo.title = title;
    todo.description = description;
    
    await this.todoRepository.save(todo);
    
    return todo;
  }
  
  
  }
  





