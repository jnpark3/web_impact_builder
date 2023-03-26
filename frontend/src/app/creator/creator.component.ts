import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft, faImage, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
const ComponentTypes = require('./component_types');
const ComponentClass = require( './component_class')

@Component({
  selector: "creator-root",
  templateUrl: "./creator.component.html",
  styleUrls: ["./creator.component.css"],
  template: '<div *ngFor="let block of html_components" [innerHTML]="block"></div>',
})
export class CreatorComponent {
  back_icon = faArrowLeft
  icon_1 = faImage
  icon_2 = faCircleDot

  id: number = -1;
  name: string = "";
  status: string = "";
  date: string = "";
  settings: {} = {};

  loading: boolean = true;
  category_id = 0;

  component_list = ComponentTypes[0]
  website_components: any[] = [];
  html_components: string[] = []
  category_names = ['Headers', 'Images', 'Videos']

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    console.log(ComponentTypes)
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
              
              this.website_components = data2.payload.xml
              this.name = data2.payload.name
              this.status = data2.payload.status
              this.date = data2.payload.date
              this.settings = data2.payload.settings
              this.loading = false;
          });
        })
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container){
      var item = this.html_components[event.previousIndex];
      this.html_components[event.previousIndex] = this.html_components[event.currentIndex];
      this.html_components[event.currentIndex] = item
      
      item = this.website_components[event.previousIndex];
      this.website_components[event.previousIndex] = this.website_components[event.currentIndex];
      this.website_components[event.currentIndex] = item
    }else{
      const item = this.component_list[event.previousIndex];
      const copiedItem = item.copy();

      this.website_components.splice(event.currentIndex, 0, copiedItem);
      this.html_components.splice(event.currentIndex, 0, copiedItem.generate_html(this.settings));
    }
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
