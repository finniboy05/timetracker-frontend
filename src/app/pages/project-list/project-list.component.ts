import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Project } from 'src/app/data/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projectDataSource = new MatTableDataSource<Project>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'name', 'actions'];

  public constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.reloadData();
  }

  reloadData() {
    this.projectService.getList().subscribe((obj) => {
      this.projectDataSource.data = obj;
    });
  }

  async edit(project: Project) {
    await this.router.navigate(['project', project.id]);
  }

  async add() {
    await this.router.navigate(['project']);
  }

  delete(project: Project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Person?',
        message: 'Do you really want to delete the selected person?',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.projectService.delete(project.id).subscribe({
          next: (response) => {
            if (response.status === 200) {
              this.snackBar.open('Person deleted!"', 'Close', {
                duration: 5000,
              });
              this.reloadData();
            } else {
              this.snackBar.open(
                'Item could not be deleted, server error!',
                'Close',
                { duration: 5000 }
              );
            }
          },
          error: () =>
            this.snackBar.open(
              'Item could not be deleted, server error!',
              'Close',
              { duration: 5000 }
            ),
        });
      }
    });
  }
}
