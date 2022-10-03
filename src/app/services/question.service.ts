import { Injectable, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Question } from '../shared/question.model';
import { FetchQuestionsService } from './fetchQuestions.service';
import { StageService } from './stage.service';

@Injectable({
  providedIn: 'root',
  deps: [FetchQuestionsService, StageService],
})
export class QuestionService {
  question = new Subject<Question>();
  difficulty = 0;

  constructor(
    private fetchQuestionsService: FetchQuestionsService,
    private stageService: StageService
  ) {
    this.stageService.stageIndexEmitter.subscribe((stage) => {
      this.difficulty = Math.floor(stage / 5);
    });
  }

  getNewQuestion() {
    return this.fetchQuestionsService
      .fetchQuestion(this.difficulty)
      .subscribe((question: Question) => {
        this.question.next(question);
      });
  }
}
