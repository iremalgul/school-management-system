import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuDataService } from './service/menudata.service';
import { UserModel } from '../demo/components/auth/user.model';
import { AuthService } from '../demo/components/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    
    constructor(public layoutService: LayoutService, public menudataService: MenuDataService, private authService: AuthService) { }

    model: any[] = [];
    menuData: any[];
    user: UserModel | null = null;

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;}
        )
        if(this.user.isAdmin){
            this.menudataService.getTeacherMenu().subscribe(data => {
            
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let mainMenu = {items:[],label:element.label};
                    for (let y = 0; y < element.items.length; y++) {
                        const subElement = element.items[y];
                        mainMenu.items.push({label:subElement.label,icon:subElement.icon,routerLink:[subElement.routerLink]});
                    }
                    this.model.push(mainMenu);
                }
                console.log(data)
            });
        }
        
        else{
            this.menudataService.getUserMenu().subscribe(data => {
            
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let mainMenu = {items:[],label:element.label};
                    for (let y = 0; y < element.items.length; y++) {
                        const subElement = element.items[y];
                        mainMenu.items.push({label:subElement.label,icon:subElement.icon,routerLink:[subElement.routerLink]});
                    }
                    this.model.push(mainMenu);
                }
                console.log(data)
            });
        }
        


    }

    

}



