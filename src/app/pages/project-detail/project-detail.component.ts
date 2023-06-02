import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/data/project';
import { DepartmentService } from 'src/app/services/department.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  project = new Project();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    firstname: new UntypedFormControl(''),
    departmentId: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private projectService: ProjectService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.projectService.getOne(id).subscribe((obj) => {
        this.project = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.project);
    }
  }

  async back() {
    await this.router.navigate(['projects']);
  }

  async save(formData: any) {
    this.project = Object.assign(formData);
    if (this.project.id) {
      this.projectService.update(this.project).subscribe({
        next: () => {
          this.snackBar.open('Project saved', 'Close', { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save project', 'Close', {
            duration: 5000,
            politeness: 'assertive',
          });
        },
      });
    } else {
      this.projectService.save(this.project).subscribe({
        next: () => {
          this.snackBar.open('New project saved', 'Close', { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new project', 'Close', {
            duration: 5000,
            politeness: 'assertive',
          });
        },
      });
    }
  }
}
