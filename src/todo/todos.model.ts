/* eslint-disable prettier/prettier */
export interface Todo{
    id:number;
    title:string;
    description:string;
    status:TodoStatus
}

export enum TodoStatus{
   CREATED = 'CREATED',
   IN_PROCESS = 'IN_PROCESS',
   COMPLETED = 'COMPLETED'
}