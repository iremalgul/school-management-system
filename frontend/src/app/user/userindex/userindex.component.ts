import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course/courseindex/course.service';
import { DepartmentService } from 'src/app/department/departmentindex/department.service';
import { AuthService } from 'src/app/demo/components/auth/auth.service';
import { UserModel } from 'src/app/demo/components/auth/user.model';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/course/exam/exam.service';


@Component({
  selector: 'app-userindex',
  templateUrl: './userindex.component.html',
  styleUrl: './userindex.component.scss'
})
export class UserindexComponent implements OnInit {

  constructor(private service: CourseService, private departmentService : DepartmentService, private authService: AuthService, private router: Router, private examService : ExamService){}


  public data: any[] = [];
  public filteredData: any[] = [];
  departmentLookup = new Map<number, string>();
  public departments: any[] = [];
  user: UserModel | null = null;
  public myCourses: any[] = [];
  expandedCourseId: number | null = null;
  expandedExams: any[] = [];
  selectedDepartmentId: number | null = null;
  examSubmissions: { [examId: number]: boolean } = {}; // Exam submission durumları

  ngOnInit(): void {
  this.getAllData();
  this.loadDepartments();

  this.authService.user.subscribe(user => {
    this.user = user;
    if (user) {
      this.loadMyCourses();
    }
  });
}

  getAllData() {
    this.service.GetAllForStudent().subscribe(response => {
      this.data = response as any[];
      this.filteredData = [...this.data]; // Başlangıçta tüm kursları göster
     
      console.log(this.data)
    });
  }

  loadDepartments() {
    this.departmentService.getDepartmentAll().subscribe((response: any[]) => {
      this.departments = response;
      this.departmentLookup.clear();
      response.forEach(department => this.departmentLookup.set(department.id, department.name));
    });
  }

  takeCourse(course){
    var model= 
    {
      coursesId: course.id,
      studentsId : this.user.email,
      isSubscribe : true
    }
    this.service.takeCourse(model).subscribe(() => {
      this.getAllData();
      this.loadMyCourses();
    })

  }

  dropCourse(course){
    var model= 
    {
      coursesId: course.id,
      studentsId : this.user.email,
      isSubscribe : false
    }
    this.service.takeCourse(model).subscribe(() => {
      this.getAllData();
      this.loadMyCourses();
    })
  }

  loadMyCourses() {
    this.service.getStudentCourses().subscribe(response => {
      this.myCourses = response as any[];
    });
  }

  showExams(course: any) {
    if (this.expandedCourseId === course.id) {
      this.expandedCourseId = null;
      this.expandedExams = [];
    } else {
      this.expandedCourseId = course.id;
      this.examService.getExamsByCourseId(course.id).subscribe(exams => {
        this.expandedExams = exams;
        // Her exam için submission durumunu kontrol et
        this.checkExamSubmissions(exams);
      });
    }
  }

  checkExamSubmissions(exams: any[]) {
    exams.forEach(exam => {
      this.examService.checkExamSubmission(exam.id).subscribe(isSubmitted => {
        this.examSubmissions[exam.id] = isSubmitted;
      });
    });
  }

  takeExam(exam: any) {
    this.router.navigate(['/user/exam', exam.id]);
  }

  viewGrades(course: any) {
    this.router.navigate(['/user/grades'], { 
      queryParams: { courseId: course.id, courseName: course.name } 
    });
  }

  onDepartmentFilter() {
    if (this.selectedDepartmentId === null) {
      // Tüm departmanları göster
      this.filteredData = [...this.data];
    } else {
      // Seçilen departmana göre filtrele
      this.filteredData = this.data.filter(course => course.departmentId === this.selectedDepartmentId);
    }
  }

  clearFilter() {
    this.selectedDepartmentId = null;
    this.filteredData = [...this.data];
  }

  isExamActive(exam: any): boolean {
    const now = new Date();
    const startDate = new Date(exam.examDateStart);
    const endDate = new Date(exam.examDateEnd);
    
    // Zaman kontrolü
    const isTimeActive = now >= startDate && now <= endDate;
    
    // Submission kontrolü
    const isNotSubmitted = !this.examSubmissions[exam.id];
    
    return isTimeActive && isNotSubmitted;
  }

  getExamStatus(exam: any): string {
    const now = new Date();
    const startDate = new Date(exam.examDateStart);
    const endDate = new Date(exam.examDateEnd);
    
    // Submission kontrolü
    if (this.examSubmissions[exam.id]) {
      return 'submitted';
    }
    
    if (now < startDate) {
      return 'not-started';
    } else if (now > endDate) {
      return 'ended';
    } else {
      return 'active';
    }
  }

  getExamStatusText(exam: any): string {
    const status = this.getExamStatus(exam);
    
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'not-started':
        return 'Not Started';
      case 'ended':
        return 'Ended';
      case 'active':
        return 'Active';
      default:
        return 'Unknown';
    }
  }

  getExamStatusColor(exam: any): string {
    const status = this.getExamStatus(exam);
    
    switch (status) {
      case 'submitted':
        return 'status-success';
      case 'not-started':
        return 'status-warning';
      case 'ended':
        return 'status-error';
      case 'active':
        return 'status-success';
      default:
        return 'status-neutral';
    }
  }


}
