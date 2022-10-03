import { Component, OnInit } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss'],
})
export class StagesComponent implements OnInit {
  currentStage = this.stageService.rounds[0];
  stages = [...this.stageService.rounds].reverse();

  constructor(private stageService: StageService) {}

  ngOnInit(): void {
    this.stageService.stageIndexEmitter.subscribe((value) => {
      this.currentStage = this.stageService.rounds[value];
    });
  }
}
