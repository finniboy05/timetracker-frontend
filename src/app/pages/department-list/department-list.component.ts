import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from '../../data/department';
import { DepartmentService } from '../../services/department.service';
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
  departmentDataSource = new MatTableDataSource<Department>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'name', 'actions'];

  public constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.reloadData();
  }

  reloadData() {
    this.departmentService.getList().subscribe((obj) => {
      this.departmentDataSource.data = obj;
    });
  }

  async edit(department: Department) {
    await this.router.navigate(['department', department.id]);
  }

  async add() {
    await this.router.navigate(['department']);
  }

  delete(department: Department) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Department?',
        message: 'Do you really want to delete the selected department?',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.departmentService.delete(department.id).subscribe({
          next: (response) => {
            if (response.status === 200) {
              this.snackBar.open('Department deleted!"', 'Close', {
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
