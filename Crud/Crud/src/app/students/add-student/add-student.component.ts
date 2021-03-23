import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/services/department.model';
import { StudentListService } from 'src/app/services/student-list.service';
import { Student } from 'src/app/services/student.model';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
departmentList: Department[];
studentList:Student[]
studentObject: Student;
  constructor(public service: StudentListService, private router: Router,
    private dialog:MatDialog,  @Optional() public dialogref:MatDialogRef<AddStudentComponent>,) { }

  ngOnInit(): void {
    this.refreshList();
    this.resetForm();
   
  }

  

  refreshList() {
    this.service.getDepartments().subscribe((result) => {
      this.departmentList = result as Department[];
      
    });
  }
  
  

  routerBack() {
    this.router.navigate(['/student']);
  }

  selectDepartment($event){
    console.log($event)

  }

  resetForm(){
    this.studentObject = {
      Student_ID: 0,
      Student_Name: '',
      Student_Surname:'',
      Department_ID:0,

    }
  }

addStudent(){
  this.service.postStudent(this.studentObject).subscribe((result) => {
    //this.departmentList = result as Department[];
    this.resetForm();
    
    
  });
  console.log(this.studentObject);
}
adStudent(){
  this.dialogref.close(this.studentObject);
}
}
