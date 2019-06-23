import { Component } from '@angular/core';
import {StateService} from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listOfUsers';
  constructor(private stateService: StateService) {}
}
