import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/components/auth/auth.service';
import { UserModel } from '../demo/components/auth/user.model';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';  // Import MenuItem from PrimeNG

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    user: UserModel | null = null;
    menuItems: MenuItem[] = [];  // Menu items for profile menu
    private userSub!: Subscription;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('profileMenu') profileMenu!: any;  // Reference to the p-menu

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // Subscribe to user data from AuthService - same as dashboard
        this.userSub = this.authService.user.subscribe(user => {
            this.user = user;
            console.log("User data received:", this.user); // Same debug as dashboard
            console.log("User name:", this.user?.name); // Debug name
            console.log("User email:", this.user?.email); // Debug email
            // Create menu items after user data is available
            this.menuItems = [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => this.goToProfile()
                },
                {
                    separator: true
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => this.logout()
                }
            ];
        });
    }

    toggleProfileMenu(event: Event) {
        // Toggle the profile menu popup
        this.profileMenu.toggle(event);
    }

    goToProfile() {
        // Navigate to profile page (if exists) or dashboard
        console.log('Profile clicked');
        // this.router.navigate(['/user/dashboard']);
    }

    logout() {
        // Call the logout method from AuthService
        this.authService.logout();
    }

    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
}
