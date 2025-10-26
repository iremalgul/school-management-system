import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss'],
  providers: [MessageService]
})
export class ExamQuestionsComponent implements OnInit {

  questionDialog: boolean = false;
  deleteQuestionDialog: boolean = false;
  deleteQuestionsDialog: boolean = false;

  questions: any[] = [];
  question: any = {};
  selectedQuestions: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  examId: number = 0;

  constructor(
    private examService: ExamService,
    private messageService: MessageService,
    private activated: ActivatedRoute
  ) {
    const paramExamId = this.activated.snapshot.paramMap.get('examId');
    if (paramExamId) {
      this.examId = Number(paramExamId);
    }
  }

  ngOnInit() {
    this.loadQuestions();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'question', header: 'Question' },
      { field: 'choiceA', header: 'A' },
      { field: 'choiceB', header: 'B' },
      { field: 'choiceC', header: 'C' },
      { field: 'choiceD', header: 'D' },
      { field: 'choiceE', header: 'E' },
      { field: 'trueChoice', header: 'True Choice' }
    ];
  }

  loadQuestions() {
    this.examService.getQuestionsByExamId(this.examId).subscribe(data => {
      this.questions = data;
    });
  }

  openNew() {
    this.question = { examId: this.examId };
    this.submitted = false;
    this.questionDialog = true;
  }

  editQuestion(question: any) {
    this.question = { ...question };
    this.questionDialog = true;
  }

  deleteQuestion(question: any) {
    this.question = { ...question };
    this.deleteQuestionDialog = true;
  }

  deleteSelectedQuestions() {
    this.deleteQuestionsDialog = true;
  }

  confirmDeleteSelected() {
    const ids = this.selectedQuestions.map(q => q.id);
    this.examService.deleteQuestions(ids).subscribe(() => {
      this.questions = this.questions.filter(val => !this.selectedQuestions.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Questions Deleted', life: 3000 });
      this.selectedQuestions = [];
      this.deleteQuestionsDialog = false;
    });
  }

  confirmDelete() {
    this.examService.deleteQuestion(this.question.id).subscribe(() => {
      this.questions = this.questions.filter(val => val.id !== this.question.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Question Deleted', life: 3000 });
      this.question = {};
      this.deleteQuestionDialog = false;
    });
  }

  hideDialog() {
    this.questionDialog = false;
    this.submitted = false;
  }

  saveQuestion() {
    this.submitted = true;
    if (this.question.question?.trim()) {
      if (this.question.id) {
        this.examService.updateQuestion(this.question).subscribe(() => {
          this.loadQuestions();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Question Updated', life: 3000 });
          this.questionDialog = false;
          this.question = {};
        });
      } else {
        this.examService.addQuestion(this.question).subscribe(() => {
          this.loadQuestions();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Question Created', life: 3000 });
          this.questionDialog = false;
          this.question = {};
        });
      }
    }
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
