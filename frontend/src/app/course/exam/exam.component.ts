import { Component, OnInit } from '@angular/core';
import { ExamService } from './exam.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [MessageService]
})
export class ExamComponent implements OnInit {

  examDialog: boolean = false;
  deleteExamDialog: boolean = false;
  deleteExamsDialog: boolean = false;

  exams: any[] = [];
  exam: any = {};
  selectedExams: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  courseId: number = 0;

  constructor(
    private examService: ExamService,
    private messageService: MessageService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    const paramCourseId = this.activated.snapshot.paramMap.get('courseId');
    if (paramCourseId) {
      this.courseId = Number(paramCourseId);
    }
  }

  ngOnInit() {
    this.loadExams();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'examDateStart', header: 'Start Date' },
      { field: 'examDateEnd', header: 'End Date' },
      { field: 'passPoint', header: 'Pass Point' },
      { field: 'durationMinutes', header: 'Duration (Minutes)' }
    ];
  }

  loadExams() {
    this.examService.getExamsByCourseId(this.courseId).subscribe(data => {
      this.exams = data;
    });
  }

  openNew() {
    this.exam = { courseId: this.courseId, durationMinutes: 60 }; // Default 60 minutes
    this.submitted = false;
    this.examDialog = true;
  }

  editExam(exam: any) {
    this.exam = { ...exam };
    this.examDialog = true;
  }

  deleteExam(exam: any) {
    this.exam = { ...exam };
    this.deleteExamDialog = true;
  }

  deleteSelectedExams() {
    this.deleteExamsDialog = true;
  }

  confirmDeleteSelected() {
    const ids = this.selectedExams.map(e => e.id);
    this.examService.deleteExams(ids).subscribe(() => {
      this.exams = this.exams.filter(val => !this.selectedExams.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exams Deleted', life: 3000 });
      this.selectedExams = [];
      this.deleteExamsDialog = false;
    });
  }

  confirmDelete() {
    this.examService.deleteExam(this.exam.id).subscribe(() => {
      this.exams = this.exams.filter(val => val.id !== this.exam.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Deleted', life: 3000 });
      this.exam = {};
      this.deleteExamDialog = false;
    });
  }

  hideDialog() {
    this.examDialog = false;
    this.submitted = false;
  }

  saveExam() {
    this.submitted = true;
    if (this.exam.name?.trim() && this.exam.durationMinutes && this.exam.durationMinutes >= 1) {
      if (this.exam.id) {
        this.examService.updateExam(this.exam).subscribe(() => {
          this.loadExams();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Updated', life: 3000 });
          this.examDialog = false;
          this.exam = {};
        });
      } else {
        this.examService.addExam(this.exam).subscribe(() => {
          this.loadExams();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Created', life: 3000 });
          this.examDialog = false;
          this.exam = {};
        });
      }
    }
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  showQuestions(exam: any) {
    this.router.navigate(['/course/exam/exam-questions/' + exam.id]);
  }
}
