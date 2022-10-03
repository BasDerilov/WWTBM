import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  allowHintsSub = new Subject<boolean>();
  allowHints = true;

  callFriend = new Subject<boolean>();
  audienceHelp = new Subject<boolean>();
  fiftyFifty = new Subject<boolean>();

  fiftyFiftyButtons = new Subject<boolean[]>();

  constructor() {
    this.allowHintsSub.subscribe((value) => {
      this.allowHints = value;
    });
  }
}
