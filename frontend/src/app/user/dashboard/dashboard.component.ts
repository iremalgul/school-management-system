import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/components/auth/auth.service';
import { UserModel } from 'src/app/demo/components/auth/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: UserModel | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
      console.log("User data received:", this.user); // Debugging
    });
  }

  goToExams() {
    this.router.navigate(['/user/index']);
  }

  goToGrades() {
    this.router.navigate(['/user/grades']);
  }

  goToProfile() {
    // Profile sayfası henüz yok, şimdilik dashboard'da kal
    console.log('Profile settings clicked');
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
