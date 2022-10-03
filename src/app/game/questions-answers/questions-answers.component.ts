import { HelpersService } from './../../services/helpers.service';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { StageService } from 'src/app/services/stage.service';
import { Question } from 'src/app/shared/question.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss'],
})
export class QuestionsAnswersComponent implements OnInit, OnDestroy {
  question: Question | undefined;
  currnetQuestionSub: Subscription | undefined;
  buttonsEnabled: boolean[] | undefined;
  isLoading = true;
  currentStage = 0;
  lastSafeSum = 0;

  modalRef?: BsModalRef;

  @ViewChild('gameOverModal') gameOverModal!: TemplateRef<any>;
  @ViewChild('congratsModal') safeSumModal!: TemplateRef<any>;
  @ViewChild('gameWonModal') gameWonModal!: TemplateRef<any>;

  stage = 0;

  letters = ['a', 'b', 'c', 'd'];

  constructor(
    private questionService: QuestionService,
    private stageService: StageService,
    private router: Router,
    private helpersService: HelpersService,
    private modalService: BsModalService
  ) {}

  ngOnDestroy(): void {
    this.currnetQuestionSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.questionService.question.subscribe((question) => {
      this.question = question;
      this.isLoading = false;
    });

    this.stageService.stageIndexEmitter.subscribe((index) => {
      this.currentStage = index;
    });

    this.helpersService.fiftyFiftyButtons.subscribe((newButtons) => {
      this.buttonsEnabled = newButtons;
    });

    this.fetchNewQuestion();
  }

  fetchNewQuestion() {
    this.questionService.getNewQuestion();
  }

  GameOverModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onGuess(index: number) {
    this.isLoading = true;
    this.buttonsEnabled = [false, false, false, false];
    this.helpersService.allowHintsSub.next(false);

    if (this.question!.answers[index] === this.question!.correctAnswer) {
      this.currnetQuestionSub = this.questionService.getNewQuestion();

      switch (this.stage) {
        case 0:
          this.lastSafeSum = 100;
          this.modalRef = this.modalService.show(this.safeSumModal);

          break;
        case 4:
          this.lastSafeSum = 1000;
          this.modalRef = this.modalService.show(this.safeSumModal);
          break;
        case 9:
          this.lastSafeSum = 32000;
          this.modalRef = this.modalService.show(this.safeSumModal);
          break;
        case 14:
          this.modalRef = this.modalService.show(this.gameWonModal);
          this.router.navigate(['/home']);
          break;

        default:
          break;
      }

      this.stage++;
      this.stageService.stageIndexEmitter.next(this.stage);

      this.currnetQuestionSub.add(() => {
        this.isLoading = false;
        this.buttonsEnabled = [true, true, true, true];
        this.helpersService.allowHintsSub.next(true);
      });
    } else {
      this.GameOverModal(this.gameOverModal);
      this.router.navigate(['/home']);
    }
  }
}
