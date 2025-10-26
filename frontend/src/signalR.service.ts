import { Injectable, NgZone } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    private hubConnection: signalR.HubConnection;
    private listenersAdded = false; // <-- EKLENDİ
    private examEndedHandled = false; // <-- EKLENDİ

    // Kalan süreyi yayınlamak için BehaviorSubject
    private remainingSecondsSubject = new BehaviorSubject<number>(0);
    remainingSeconds$ = this.remainingSecondsSubject.asObservable();

    constructor(private ngZone: NgZone) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl('https://localhost:7123/school-hub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
    }

    startConnection(): Observable<void> {
        this.examEndedHandled = false;
        this.remainingSecondsSubject.next(-1); // <-- Her sınav başında -1 ile sıfırla

        if (this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
            return new Observable<void>(observer => {
                observer.next();
                observer.complete();
            });
        }

        // Event listener'ları sadece bir kez ekle
        if (!this.listenersAdded) {
            this.hubConnection.on('receiveMessage', (message: string) => {
                console.log("Gelen mesaj:", message);
            });

            this.hubConnection.on('examTimer', (data: any) => {
                const seconds = data.RemainingSeconds ?? data.remainingSeconds;
                this.ngZone.run(() => {
                    this.remainingSecondsSubject.next(seconds);
                });
            });

            this.hubConnection.on('examEnded', (message: string) => {
                if (!this.examEndedHandled) {
                    this.examEndedHandled = true;
                    this.ngZone.run(() => {
                        // alert(message); // KALDIRILDI
                        this.remainingSecondsSubject.next(0);
                    });
                }
            });

            this.hubConnection.on('examStarted', (data: any) => {
                console.log('Exam started:', data);
            });

            this.listenersAdded = true; // <-- EKLENDİ
        }

        return new Observable<void>((observer) => {
            this.hubConnection
                .start()
                .then(() => {
                    console.log("SignalR bağlantısı kuruldu.");
                    observer.next();
                    observer.complete();
                })
                .catch((error) => {
                    console.error('SignalR bağlantı hatası:', error);
                    observer.error(error);
                });
        });
    }

    receiveMessage(): Observable<string> {
        return new Observable<string>((observer) => {
            this.hubConnection.on('receiveMessage', (message: string) => {
                observer.next(message);
            });
        });
    }

    stopConnection(): Promise<void> {
        this.hubConnection.off('receiveMessage');
        this.hubConnection.off('examTimer');
        this.hubConnection.off('examEnded');
        this.hubConnection.off('examStarted');
        this.listenersAdded = false;
        this.examEndedHandled = false;
        this.remainingSecondsSubject.next(-1); // <-- Kalan süreyi -1 ile sıfırla
        return this.hubConnection.stop();
    }
}
