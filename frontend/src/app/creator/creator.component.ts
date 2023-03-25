import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft, faImage, faCircleDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "creator-root",
  templateUrl: "./creator.component.html",
  styleUrls: ["./creator.component.css"],
})
export class CreatorComponent {
  back_icon = faArrowLeft
  icon_1 = faImage
  icon_2 = faCircleDot

  id: number = -1;
  xml: [] = [];
  name: string = "";
  status: string = "";
  date: string = "";
  settings: {} = {};

  loading: boolean = true;
  category_id = 0;
  category_components = [];

  items_list: string[] = ['Item 1', 'Item 2', 'Item 3'];

  public sortableOptions: any = {
    animation: 150,
  };

  onSort(event: any) {
    const newOrder = event.to.map((element: any) => element.textContent.trim());

    this.items_list = newOrder;
  }

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    this.appService.verify().pipe().subscribe((data: any) => {
        if(!data.success){
          this.router.navigate(['/login'])
        }
        this.route.params.subscribe((params) => {
          this.id = params['id'] 
          this.appService.getWebsite(this.id).pipe().subscribe((data2: any) => {
              if(!data2.success){
                this.router.navigate(['/error'])
              }
              
              this.xml = data2.payload.xml
              this.name = data2.payload.name
              this.status = data2.payload.status
              this.date = data2.payload.date
              this.settings = data2.payload.settings
              this.loading = false;
          });
        })
    });
  }

  save(){

  }

  changeType(id:number){
    this.category_id = id
  }

  backToMenu(){
    this.save();
    this.router.navigate(["/menu"]);
  }
}
