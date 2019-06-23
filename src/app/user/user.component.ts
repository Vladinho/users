import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';
import {IUser} from '../IUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private user: IUser;
  constructor(private stateService: StateService, private router: Router) {
    this.user = stateService.currentUser;
  }

  ngOnInit() {
  }
  private back() {
    this.router.navigateByUrl('');
  }
}
