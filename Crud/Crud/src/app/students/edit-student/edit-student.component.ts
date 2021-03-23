import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/services/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
studentObject = new Student();
  constructor(private dialog:MatDialog,
    public dialogref:MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.studentObject.Student_ID = this.data.item.Student_ID;
    this.studentObject.Student_Name = this.data.item.Student_Name;
    this.studentObject.Student_Surname = this.data.item.Student_Surname;
    this.studentObject.Department_ID = this.data.item.Department_ID;
  }

  updateStudent(){
    this.dialogref.close(this.studentObject);
  }
  cancel(){
    this.dialogref.close(null);
  }

}
