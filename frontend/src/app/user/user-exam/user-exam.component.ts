import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../course/exam/exam.service';
import { SignalRService } from 'src/signalR.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-exam',
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.scss'],
  providers: [MessageService]
})
export class UserExamComponent implements OnInit, OnDestroy {
  examId: number = 0;
  exam: any = {};
  questions: any[] = [];
  answers: { [questionId: number]: number } = {};
  remainingSeconds: number = 0;
  private timerSub?: Subscription;
  examActive = true; // <-- EKLENDİ
  examResult: any = null; // Sınav sonucu için
  showUnansweredDialog = false; // Cevaplanmamış sorular dialog'u
  unansweredQuestions: any[] = []; // Cevaplanmamış sorular listesi

  constructor(
    private route: ActivatedRoute, 
    private examService: ExamService, 
    private signalRService: SignalRService, 
    private router: Router,
    private messageService: MessageService
  ) {
    const paramExamId = this.route.snapshot.paramMap.get('id');
    if (paramExamId) {
      this.examId = Number(paramExamId);
    }
  }

  ngOnInit() {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam;
    });
    this.examService.getQuestionsByExamId(this.examId).subscribe(questions => {
      this.questions = questions;
    });

    // Sınavı başlat
    this.examService.startExam(this.examId).subscribe(success => {
      if (success) {
        this.examActive = true; // <-- Sınav başlarken aktif
        this.signalRService.startConnection().subscribe(() => {
          this.timerSub = this.signalRService.remainingSeconds$.subscribe(seconds => {
            this.remainingSeconds = seconds;
            
            // Son 30 saniye uyarısı
            if (seconds === 30 && this.examActive) {
              this.messageService.add({ 
                severity: 'warn', 
                summary: '⏰ Son 30 Saniye!', 
                detail: 'Sınav süreniz son 30 saniyeye girdi. Cevaplarınızı kontrol edin!', 
                life: 5000 
              });
            }
            
            // Son 10 saniye uyarısı
            if (seconds === 10 && this.examActive) {
              this.messageService.add({ 
                severity: 'error', 
                summary: '🚨 Son 10 Saniye!', 
                detail: 'Sınav süreniz son 10 saniyeye girdi! Hemen gönderin!', 
                life: 3000 
              });
            }
            
            // Süre doldu
            if (seconds === 0 && this.examActive) {
              this.examActive = false;
              
              // Otomatik gönderim denemesi
              this.autoSubmitExam();
            }
          });
        });
      } else {
        alert('Sınav başlatılamadı.');
      }
    });
  }

  ngOnDestroy() {
    this.examActive = false; // <-- Component kapanınca sınav aktifliği biter
    this.timerSub?.unsubscribe();
    this.signalRService.stopConnection();
  }
  
  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  selectAnswer(questionId: number, choice: number) {
    this.answers[questionId] = choice;
  }

  submitAnswers() {
    if (!this.examActive) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Uyarı', 
        detail: 'Sınav süresi dolmuş, cevaplarınız gönderilemez.', 
        life: 3000 
      });
      return;
    }

    if (this.examResult) {
      this.messageService.add({ 
        severity: 'info', 
        summary: 'Bilgi', 
        detail: 'Bu sınav zaten gönderilmiş.', 
        life: 3000 
      });
      return;
    }

    // Tüm sorulara cevap verilip verilmediğini kontrol et
    this.unansweredQuestions = this.questions.filter(q => !this.answers[q.id]);
    if (this.unansweredQuestions.length > 0) {
      this.showUnansweredDialog = true;
      return;
    }

    // Tüm sorular cevaplanmışsa direkt gönder
    this.performSubmit();
  }

  getGradeColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  }

  goToGrades() {
    this.router.navigate(['/user/grades']);
  }

  performSubmit() {
    // Cevapları backend'e gönder
    this.examService.submitAnswers(this.examId, this.answers).subscribe({
      next: (result) => {
        this.examActive = false;
        this.examResult = result; // Sonucu sakla
        
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Başarılı', 
          detail: `Cevaplarınız başarıyla gönderildi! Skorunuz: ${result.score || 0}`, 
          life: 5000 
        });
        
        // Sonuç sayfasına yönlendir veya ana sayfaya dön
        setTimeout(() => {
          this.router.navigate(['/user/grades']);
        }, 3000);
      },
      error: (error) => {
        console.error('Cevaplar gönderilirken hata oluştu:', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Hata', 
          detail: 'Cevaplarınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', 
          life: 5000 
        });
      }
    });
  }

  confirmSubmitWithUnanswered() {
    this.showUnansweredDialog = false;
    this.performSubmit();
  }

  cancelSubmitWithUnanswered() {
    this.showUnansweredDialog = false;
  }

  goToUnansweredQuestion(questionId: number) {
    this.showUnansweredDialog = false;
    // Soruya scroll yap
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Hafif highlight efekti
      element.classList.add('highlight-question');
      setTimeout(() => {
        element.classList.remove('highlight-question');
      }, 2000);
    }
  }

  getQuestionNumber(questionId: number): number {
    return this.questions.findIndex(q => q.id === questionId) + 1;
  }

  getQuestionPreview(question: string): string {
    return question.length > 80 ? question.slice(0, 80) + '...' : question;
  }

  getQuestionId(questionId: number): string {
    return `question-${questionId}`;
  }

  private autoSubmitExam() {
    // Süre dolduğunda otomatik gönderim
    this.messageService.add({ 
      severity: 'error', 
      summary: '⏰ Süre Doldu!', 
      detail: 'Sınav süreniz doldu. Cevaplarınız otomatik olarak gönderiliyor...', 
      life: 5000 
    });

    // Mevcut cevapları gönder
    this.examService.submitAnswers(this.examId, this.answers).subscribe({
      next: (result) => {
        this.examResult = result;
        
        this.messageService.add({ 
          severity: 'info', 
          summary: '✅ Otomatik Gönderim', 
          detail: `Cevaplarınız otomatik olarak gönderildi! Skorunuz: ${result.score || 0}`, 
          life: 5000 
        });
        
        // Sonuç sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/user/grades']);
        }, 3000);
      },
      error: (error) => {
        console.error('Otomatik gönderim hatası:', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: '❌ Gönderim Hatası', 
          detail: 'Cevaplarınız gönderilemedi. Lütfen tekrar deneyin.', 
          life: 5000 
        });
        
        // Hata durumunda ana sayfaya yönlendir
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 3000);
      }
    });
  }
}
