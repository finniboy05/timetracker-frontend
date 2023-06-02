import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/data/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee = new Employee();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    firstname: new UntypedFormControl(''),
    departmentId: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private employeeService: EmployeeService,
              private departmentService: DepartmentService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.employeeService.getOne(id).subscribe(obj => {
        this.employee = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.employee);
    }
  }

  async back() {
    await this.router.navigate(['employees']);
  }

  async save(formData: any) {
    this.employee = Object.assign(formData);
    this.departmentService.getOne(formData.departmentId).subscribe(o => {
      this.employee.department = o;
      if (this.employee.id) {
        this.employeeService.update(this.employee).subscribe({
          next: () => {
            this.snackBar.open('Employee saved', 'Close', {duration: 5000});
            this.back();
          },
          error: () => {
            this.snackBar.open('Failed to save employee', 'Close', {duration: 5000, politeness: 'assertive'});
          }
        });
      } else {
        this.employeeService.save(this.employee).subscribe({
          next: () => {
            this.snackBar.open('New employee saved', 'Close', {duration: 5000});
            this.back();
          },
          error: () => {
            this.snackBar.open('Failed to save new employee', 'Close', {duration: 5000, politeness: 'assertive'});
          }
        });
      }
    });
  }
}
