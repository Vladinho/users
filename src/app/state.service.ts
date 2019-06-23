import { Injectable } from '@angular/core';
import {IPage, IUser} from './IUser';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isLoading = true;
  public isListInit = false;
  public currentUser: IUser = null;
  public readonly BASE_URL = 'https://reqres.in/api/users';
  public userPages: IPage[] = [];
  public currentUsers: IUser[] = [];
  public pages: number[] = [];
  constructor() { }
}
