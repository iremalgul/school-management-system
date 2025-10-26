import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ExamService {
    baseUrl = 'https://localhost:7123/api/exam';
    constructor(private http: HttpClient) { }

    getExamsByCourseId(courseId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getExamsByCourseId?courseId=${courseId}`);
    } 

    getExamById(examId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/GetExamById?examId=${examId}`);
    }
    
    addExam(model: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/insertExam`, model);
    }

    updateExam(model: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/updateExam`, model);
    }

    deleteExam(id: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/deleteExam?examId=${id}`, {});
    }

    deleteExams(ids: number[]): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/deleteExams`, ids);
    }

    getQuestionsByExamId(examId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getQuestionsByExamId?examId=${examId}`);
    }

    addQuestion(question: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/insertExamQuestion`, question);
    }

    updateQuestion(question: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/updateExamQuestion`, question);
    }   

    deleteQuestion(id: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/deleteExamQuestion?examQuestionId=${id}`, {});
    }

    deleteQuestions(ids: number[]): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/deleteExamQuestions`, ids);
    }

    startExam(examId: number): Observable<boolean> {
        return this.http.post<boolean>(`${this.baseUrl}/startExam?examId=${examId}`, {});
    }

    submitAnswers(examId: number, answers: { [questionId: number]: number }): Observable<any> {
        const submissionData = {
            examId: examId,
            answers: answers
        };
        return this.http.post<any>(`${this.baseUrl}/submitAnswers`, submissionData);
    }

    getUserCourses(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getUserCourses`);
    }

    getUserExamResults(courseId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getUserExamResults?courseId=${courseId}`);
    }

    checkExamSubmission(examId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/checkExamSubmission?examId=${examId}`);
    }

    
}


