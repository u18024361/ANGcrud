import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  apiUrl = 'https://localhost:44394/api/';
  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get(this.apiUrl+'Students');
  }

  getDepartments(){
    return this.http.get(this.apiUrl+'Departments');
  }

  postStudent(obj){
    return this.http.post(this.apiUrl+'Students',obj);
  }

  deleteStudent(id){
    return this.http.delete(this.apiUrl+'Students/'+id);

  }

  updateStudent(obj){
    return this.http.put(this.apiUrl+'Students/'+obj.Student_ID,obj);
  }
}
