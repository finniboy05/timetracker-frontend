import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Employee } from 'src/app/data/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeDataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'name', 'firstname', 'department','actions'];

  public constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.reloadData();
  }

  reloadData() {
    this.employeeService.getList().subscribe((obj) => {
      this.employeeDataSource.data = obj;
    });
  }

  async edit(employee: Employee) {
    await this.router.navigate(['employee', employee.id]);
  }

  async add() {
    await this.router.navigate(['employee']);
  }

  delete(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Person?',
        message: 'Do you really want to delete the selected person?',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.employeeService.delete(employee.id).subscribe({
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
