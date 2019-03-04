import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { taskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCollection: AngularFirestoreCollection<taskI>;
  private todos: Observable<taskI[]>;
  constructor(db:AngularFirestore) {
    this.todosCollection = db.collection<taskI>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getTodos(){
     return this.todos;
   }
   getTodo(id:string){
     return this.todosCollection.doc<taskI>(id).valueChanges();
   }
   updateTodo(todo:taskI, id: string){
     return this.todosCollection.doc(id).update(todo);
   }
   addTodo(todo:taskI){
    return this.todosCollection.add(todo);
   }
   removeTodo(id:string){
     return this.todosCollection.doc(id).delete;
   }
}
