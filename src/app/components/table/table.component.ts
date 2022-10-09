import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/Users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = [
    'id',
    'image',
    'firstName',
    'email',
    'phone',
    'card number',
    'card type',
    'card expire',
    'delete',
  ];
  dataSource!: MatTableDataSource<User>;
  toggleContent = true;
  users: User[] | [] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userSub!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.checkContentInLocalStorage();
    this.getUsers();
  }

  checkContentInLocalStorage() {
    const content = localStorage.getItem('content');
    if(content === 'table') {
      this.toggleContent = true;
      localStorage.setItem('content', 'table');
    } else {
      localStorage.setItem('content', 'card');
      this.toggleContent = false;
    }
  }

  getUsers() {
    this.userSub = this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.onPaginationAndSort();
    })
  }

  onPaginationAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe();
    this.usersService.openSnackBar(id, `User id ${id} has been deleted`);
    this.getUsers();
  }

  onToggleTable() {
    this.toggleContent = false;
    localStorage.setItem('content', 'card');
  }

  onToggleCard() {
    this.toggleContent = true;
    localStorage.setItem('content', 'table');
    this.getUsers();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
