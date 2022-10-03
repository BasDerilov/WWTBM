import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FetchQuestionsService {
  difficulties = ['easy', 'medium', 'hard'];
  questionCount = 1;
  type = 'multiple';

  baseUrl = 'https://opentdb.com/api.php';

  params = new HttpParams({
    fromObject: {
      amount: this.questionCount,
      type: this.type,
      difficulty: this.difficulties[0],
    },
  });

  constructor(private http: HttpClient) {}

  fetchQuestion(stage: number) {
    this.params = this.params.set('difficulty', this.difficulties[stage]);

    return this.http
      .get<QuizResponse>(this.baseUrl, { params: this.params })
      .pipe(
        map(({ results }) => {
          const questionObj = {
            question: results[0].question,
            correctAnswer: results[0].correct_answer,
            answers: [
              ...results[0].incorrect_answers,
              results[0].correct_answer,
            ],
          };

          for (let i = questionObj.answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionObj.answers[i], questionObj.answers[j]] = [
              questionObj.answers[j],
              questionObj.answers[i],
            ];
          }

          return questionObj;
        })
      );
  }
}

interface QuizResponse {
  response_code: number;
  results: [
    {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: [string, string, string];
    }
  ];
}
