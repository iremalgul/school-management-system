import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    // Dashboard statistics
    departmentCount: number = 0;
    courseCount: number = 0;
    studentCount: number = 0;
    activeExamCount: number = 0;
    loading: boolean = true;

    constructor(private productService: ProductService, public layoutService: LayoutService, private router: Router, private http: HttpClient) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        this.loadDashboardStats();

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    // Navigation methods for quick actions
    goToDepartments() {
        this.router.navigate(['/department/index']);
    }

    goToCourses() {
        this.router.navigate(['/course/index']);
    }

    goToStudents() {
        this.router.navigate(['/student/index']);
    }

    loadDashboardStats() {
        this.loading = true;
        
        // Load departments count
        this.http.get<any[]>('https://localhost:7123/api/department/getall').subscribe({
            next: (departments) => {
                console.log('Departments loaded:', departments);
                this.departmentCount = departments ? departments.length : 0;
            },
            error: (error) => {
                console.error('Error loading departments:', error);
                console.error('Error status:', error.status);
                console.error('Error message:', error.message);
                this.departmentCount = 0;
            }
        });

        // Load courses count
        this.http.get<any[]>('https://localhost:7123/api/course/getAll').subscribe({
            next: (courses) => {
                console.log('Courses loaded:', courses);
                this.courseCount = courses ? courses.length : 0;
            },
            error: (error) => {
                console.error('Error loading courses:', error);
                console.error('Error status:', error.status);
                console.error('Error message:', error.message);
                this.courseCount = 0;
            }
        });

        // Load students count
        this.http.get<any[]>('https://localhost:7123/api/student/getAll').subscribe({
            next: (students) => {
                console.log('Students loaded:', students);
                this.studentCount = students ? students.length : 0;
            },
            error: (error) => {
                console.error('Error loading students:', error);
                console.error('Error status:', error.status);
                console.error('Error message:', error.message);
                this.studentCount = 0;
            }
        });

        // Load active exams count - we'll get all courses and then get exams for each
        this.http.get<any[]>('https://localhost:7123/api/course/getAll').subscribe({
            next: (courses) => {
                console.log('Courses for exams loaded:', courses);
                if (courses && courses.length > 0) {
                    // For now, we'll set a placeholder value since we don't have a direct getAllExams endpoint
                    // In a real implementation, you'd need to call getExamsByCourseId for each course
                    this.activeExamCount = 0; // Placeholder
                } else {
                    this.activeExamCount = 0;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading courses for exams:', error);
                console.error('Error status:', error.status);
                console.error('Error message:', error.message);
                this.activeExamCount = 0;
                this.loading = false;
            }
        });
    }
}
