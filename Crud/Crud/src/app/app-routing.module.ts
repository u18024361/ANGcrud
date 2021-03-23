import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path:'', redirectTo:'student',pathMatch:'full'},
  {path:'student', component:StudentsComponent},
  {path:'addstudent', component:AddStudentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
