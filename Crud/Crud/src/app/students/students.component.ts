import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { StudentListService } from '../services/student-list.service';
import { Student } from '../services/student.model';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentList: Student[];

  constructor(
    public service: StudentListService,
    private router: Router,
    private Toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshList();
    this.Toastr.toastrConfig.positionClass = 'toast-top-center';
  }

  refreshList() {
    this.service.getStudents().subscribe((result) => {
      this.studentList = result as Student[];

      console.log(result);
    });
  }

  routerAdd() {
    this.router.navigate(['/addstudent']);
  }

  deleteStudent(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.service.deleteStudent(id).subscribe((result) => {
          this.refreshList();
        });
        Swal.fire('Deleted!', 'The student has been deleted', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The student data is safe :)', 'error');
      }
    });

    // if(confirm('are you sure')){
    //   this.service.deleteStudent(id).subscribe((result) => {
    //     this.refreshList();
    //     this.Toastr.success('delete successful','this delete');
    //   });
    // }
  }

  editStudent(item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '30%';
    dialogConfig.height = 'auto';
    dialogConfig.data = { item };
    const dialogref = this.dialog.open(EditStudentComponent, dialogConfig);

    dialogref.afterClosed().subscribe((result) => {
      if (result != null) {
        this.service.updateStudent(result).subscribe((res) => {
          this.refreshList();
        });
      }
    });
  }

  addStudent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '30%';
    dialogConfig.height = 'auto';
    const dialogref = this.dialog.open(AddStudentComponent, dialogConfig);

    dialogref.afterClosed().subscribe((result) => {
      if (result != null) {
        this.service.postStudent(result).subscribe((res) => {
          this.refreshList();
        });
      }
    });
  }
}
