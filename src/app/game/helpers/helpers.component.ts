import { Component, OnInit } from '@angular/core';
import {
  faDivide,
  faPeopleGroup,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.scss'],
})
export class HelpersComponent implements OnInit {
  audienceIcon = faPeopleGroup;
  callFriendIcon = faPhone;
  fiftyFiftyIcon = faDivide;

  constructor() {}

  ngOnInit(): void {}
}
