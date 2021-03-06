import { Component, OnInit} from '@angular/core';
import { taskI } from '../models/task.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos: taskI[];
  constructor(private todoService:TodoService){

  }

  ngOnInit(){
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }


}
