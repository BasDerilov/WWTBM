import { Question } from 'src/app/shared/question.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  faDivide,
  faPeopleGroup,
  faPercentage,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HelpersService } from 'src/app/services/helpers.service';
import { ProgressbarType } from 'ngx-bootstrap/progressbar';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.scss'],
})
export class HelpersComponent implements OnInit {
  audienceIcon = faPeopleGroup;
  callFriendIcon = faPhone;
  fiftyFiftyIcon = faDivide;

  currentQuestion?: Question;

  allowHints = true;

  audienceHelp = true;
  helpFromFriend = true;
  fiftyFifty = true;

  modalRef?: BsModalRef;

  letters = ['a', 'b', 'c', 'd'];

  audienceBar: IStack[] = [];
  types = ['success', 'info', 'danger', 'warning'];

  audienceValues = [40, 30, 15, 15];
  friendGuess = '';

  constructor(
    private helpersService: HelpersService,
    private modalService: BsModalService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.helpersService.allowHintsSub.subscribe((value) => {
      this.allowHints = value;
    });

    this.helpersService.callFriend.subscribe((value) => {
      this.helpFromFriend = value;
    });

    this.helpersService.audienceHelp.subscribe((value) => {
      this.audienceHelp = value;
    });

    this.helpersService.fiftyFifty.subscribe((value) => {
      this.fiftyFifty = value;
    });

    this.questionService.question.subscribe((newQuestion) => {
      this.currentQuestion = newQuestion;
    });
  }

  onAudienceHelp(template: TemplateRef<any>) {
    this.helpersService.audienceHelp.next(false);
    this.modalRef = this.modalService.show(template);

    this.getVoteValues();

    this.audienceValues.forEach((value, i) => {
      this.audienceBar.push(<IStack>{
        type: this.types[i],
        label: `${this.letters[i]}: ${value}%`,
        value: value,
      });
    });
  }

  onHelpFromFriend(template: TemplateRef<any>) {
    this.helpersService.callFriend.next(false);

    this.modalRef = this.modalService.show(template);
  }

  onFiftyFifty() {
    this.helpersService.fiftyFifty.next(false);

    const incorrectAnswers = this.getTwoFalseAnswers();
    const hint = [true, true, true, true];
    hint[incorrectAnswers[0]] = false;
    hint[incorrectAnswers[1]] = false;
    this.helpersService.fiftyFiftyButtons.next(hint);
  }

  private getVoteValues() {
    const correctIndex = this.currentQuestion!.answers.indexOf(
      this.currentQuestion!.correctAnswer
    );

    this.audienceValues[correctIndex] = 55;

    for (let index = 0; index < this.audienceValues.length; index++) {
      if (index != correctIndex) {
        this.audienceValues[index] = 15;
      }
    }
  }

  private getTwoFalseAnswers(): number[] {
    const correctIndex = this.currentQuestion!.answers.indexOf(
      this.currentQuestion!.correctAnswer
    );

    const indexes = [0, 1, 2, 3];
    indexes.splice(correctIndex, 1);
    indexes.splice(0, 1);

    return indexes;
  }
}

interface IStack {
  type: ProgressbarType;
  label: string;
  value: number;
  max: number;
}
