import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';
import {HttpClient} from '@angular/common/http';
import {IPage, IResponse, IUser} from '../IUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private totalPages: number = null;
  private currentPage = null;
  private perPage: number = null;
  constructor(private stateSerice: StateService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if(!this.stateSerice.isListInit)
      this.updatePage(this.currentPage);
  }
  private updatePage(currentPage: number) {
    if (this.stateSerice.userPages.some(i => i.page === currentPage)) {
      this.togglePage(this.currentPage);
    } else {
      this.stateSerice.isLoading = true;
      this.http.get(this.stateSerice.BASE_URL).subscribe((r) => {
        this.stateSerice.isListInit = true;
        const response = r as IResponse;
        this.updateData(response);
        for (let i = 1; i < this.totalPages + 1; i++) {
          this.stateSerice.pages.push(i);
        }
        this.stateSerice.isLoading = false;
      });
    }
  }
  private updateData(response: IResponse) {
    this.totalPages = response.total_pages;
    this.perPage = response.per_page;
    this.currentPage = response.page;
    this.stateSerice.userPages.push({
      page: response.page,
      users: response.data
    });
    this.togglePage(this.currentPage);
  }
  private togglePage(pageNumber: number) {
    if (pageNumber === null) return;
    const page = this.stateSerice.userPages.find(i => i.page === pageNumber);
    if (page === undefined) {
      this.stateSerice.isLoading = true;
      this.http.get(`${this.stateSerice.BASE_URL}?page=${pageNumber}`).subscribe((r) => {
        this.stateSerice.isListInit = true;
        this.updateData(r as IResponse);
        this.stateSerice.isLoading = false;
      });
    } else {
      this.stateSerice.currentUsers = this.stateSerice.userPages.find(i => i.page === pageNumber).users;
    }
  }
  private dispayUser(user: IUser) {
    this.stateSerice.currentUser = user;
    this.router.navigateByUrl('user');
  }
}
