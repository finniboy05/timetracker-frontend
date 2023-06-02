import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/data/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  department = new Department();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private departmentService: DepartmentService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.departmentService.getOne(id).subscribe(obj => {
        this.department = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.department);
    }
  }

  async back() {
    await this.router.navigate(['departments']);
  }

  async save(formData: any) {
    this.department = Object.assign(formData);

    if (this.department.id) {
      this.departmentService.update(this.department).subscribe({
        next: () => {
          this.snackBar.open('Department saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save department', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.departmentService.save(this.department).subscribe({
        next: () => {
          this.snackBar.open('New department saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new department', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
