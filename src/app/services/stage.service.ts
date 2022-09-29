import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  stages = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000,
    250000, 500000, 1000000,
  ];
  currentStageIndex = 0;
  stageEmitter = new Subject<number>();

  constructor() {
    this.stageEmitter.next(this.stages[this.currentStageIndex]);
  }

  nextStage() {
    this.currentStageIndex++;
    this.stageEmitter.next(this.stages[this.currentStageIndex]);
  }
}
