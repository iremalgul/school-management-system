import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './demo/components/auth/auth.service';
import { SignalRService } from 'src/signalR.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private authService: AuthService, private signalRService: SignalRService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.authService.autoLogin();

        this.signalRService.startConnection().subscribe(() => {
            // this.signalRService.receiveMessage().subscribe((message) => {
            //     console.log(message);
            //     this.messageService.add({ severity: 'success', summary: 'İşlem Bildirimi', detail: message, sticky: true });
            //     this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: message });
            // });

            this.signalRService.receiveMessage().subscribe((data) => {
                console.log(data);
                
            });
        });
    }
}
