import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../course/exam/exam.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-grades',
  templateUrl: './user-grades.component.html',
  styleUrls: ['./user-grades.component.scss'],
  providers: [MessageService]
})
export class UserGradesComponent implements OnInit {
  courses: any[] = [];
  selectedCourse: any = null;
  exams: any[] = [];
  examResults: any[] = [];
  courseAverage: number = 0;
  loading: boolean = false;

  constructor(
    private examService: ExamService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCourses();
    
    // QueryParams'tan courseId gelirse otomatik seç
    this.route.queryParams.subscribe(params => {
      if (params['courseId']) {
        // Courses yüklendikten sonra seçili kursu ayarla
        setTimeout(() => {
          this.selectedCourse = this.courses.find(c => c.id == params['courseId']);
          if (this.selectedCourse) {
            this.loadExamResults();
          }
        }, 1000);
      }
    });
  }

  loadCourses() {
    this.loading = true;
    // Bu metod backend'de implement edilecek
    this.examService.getUserCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (error) => {
        console.error('Kurslar yüklenirken hata:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Kurslar yüklenirken bir hata oluştu.',
          life: 3000
        });
        this.loading = false;
      }
    });
  }

  onCourseSelect() {
    if (this.selectedCourse) {
      this.loadExamResults();
    }
  }

  loadExamResults() {
    this.loading = true;
    this.examService.getUserExamResults(this.selectedCourse.id).subscribe({
      next: (results) => {
        this.examResults = results;
        this.calculateAverage();
        this.loading = false;
      },
      error: (error) => {
        console.error('Sınav sonuçları yüklenirken hata:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sınav sonuçları yüklenirken bir hata oluştu.',
          life: 3000
        });
        this.loading = false;
      }
    });
  }

  calculateAverage() {
    if (this.examResults.length > 0) {
      const totalScore = this.examResults.reduce((sum, result) => sum + result.score, 0);
      this.courseAverage = totalScore / this.examResults.length;
    } else {
      this.courseAverage = 0;
    }
  }

  getGradeColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  }


  showExamDetails(result: any) {
    // Sınav detaylarını göster (modal veya yeni sayfa)
    console.log('Exam details:', result);
    // Bu kısım daha sonra implement edilebilir
  }

  goToExams() {
    // Ana sayfaya yönlendir
    window.location.href = '/user/index';
  }
}
