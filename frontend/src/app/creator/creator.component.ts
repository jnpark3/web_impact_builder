import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  faArrowLeft,
  faImage,
  faCircleDot,
  faTrash,
  faSave,
  faFileText,
  faVideo,
  faTextHeight,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Stripe } from 'stripe';
const ComponentTypes = require("./component_types");
const ComponentClass = require("./component_class");
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "creator-root",
  templateUrl: "./creator.component.html",
  styleUrls: ["./creator.component.css"],
  template:
    '<div *ngFor="let block of html_components" [innerHTML]="block"></div>',
})
export class CreatorComponent {

  save_icon = faSave;
  back_icon = faArrowLeft;
  icon_1 = faTextHeight;
  icon_2 = faImage;
  icon_3 = faVideo;
  icon_4 = faFileText;
  icon_5 = faMoneyBill;
  icon_6 = faCircleDot;
  trash_icon = faTrash;

  id: number = -1;
  name: string = "";
  status: string = "";
  date: string = "";
  settings = {
    primary_color: "#000000",
    secondary_color: "#F4793E",
    tertiary_color: "#FFFFFF",
    font: 'Roboto, "Helvetica Neue", sans-serif',
  };

  loading: boolean = true;
  category_id = 0;

  component_list = ComponentTypes[0];
  website_components: any[] = [];
  html_components: SafeHtml[] = [];
  category_names = [
    "Text",
    "Images",
    "Videos",
    "Surveys",
    "Donations",
    "Miscellaneous",
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appService
      .verify()
      .pipe()
      .subscribe((data: any) => {
        if (!data.success) {
          this.router.navigate(["/login"]);
        }
        this.route.params.subscribe((params) => {
          this.id = params["id"];
          this.appService
            .getWebsite(this.id)
            .pipe()
            .subscribe((data2: any) => {
              if (!data2.success) {
                this.router.navigate(["/error"]);
              }

              this.website_components = data2.payload.xml;
              this.name = data2.payload.name;
              this.status = data2.payload.status;
              this.date = data2.payload.date;
              //this.settings = data2.payload.settings
              this.loading = false;
              this.changeType(0);
            });
        });
      });
  }

  onFileSelected(event: any, id: number) {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.editor_inputs[id] = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  drop(event: CdkDragDrop<SafeHtml[]>) {
    console.log("SETTINGS:");
    console.log(this.settings);
    if (event.previousContainer === event.container) {
      var item = this.html_components[event.previousIndex];
      this.html_components[event.previousIndex] =
        this.html_components[event.currentIndex];
      this.html_components[event.currentIndex] = item;

      item = this.website_components[event.previousIndex];
      this.website_components[event.previousIndex] =
        this.website_components[event.currentIndex];
      this.website_components[event.currentIndex] = item;
    } else {
      const item = this.component_list[event.previousIndex];
      const copiedItem = item.copy();

      this.website_components.splice(event.currentIndex, 0, copiedItem);
      this.html_components.splice(
        event.currentIndex,
        0,
        this.sanitizer.bypassSecurityTrustHtml(
          copiedItem.generate_html(this.settings)
        )
      );
    }
  }

  regenerate_html() {
    for (let i = 0; i < this.website_components.length; i++) {
      this.html_components[i] = this.sanitizer.bypassSecurityTrustHtml(
        this.website_components[i].generate_html(this.settings)
      );
      console.log(this.website_components[i].generate_html(this.settings));
    }

    const myButton = document.getElementById("surveyButton");
    if (myButton) {
      console.log("BUTTON FOUND")
      myButton.addEventListener("click", function () {
        console.log("CLICKED");
        const response_1 = (<HTMLInputElement>(
          document.getElementById("input_1")
        )).value;
        const response_2 = (<HTMLInputElement>(
          document.getElementById("input_2")
        )).value;
        const response_3 = (<HTMLInputElement>(
          document.getElementById("input_3")
        )).value;
        var obj: any = [];
        obj[0] = JSON.parse(JSON.stringify(response_1));
        obj[1] = JSON.parse(JSON.stringify(response_2));
        obj[2] = JSON.parse(JSON.stringify(response_3));
        console.log(obj);

        (<HTMLInputElement>document.getElementById("input_3")).value = "";
        (<HTMLInputElement>document.getElementById("input_2")).value = "";
        (<HTMLInputElement>document.getElementById("input_1")).value = "";

        console.log(obj);
      });
    }
  }

  save() {}

  surveySubmit() {
    console.log("Survey");

    const response_1 = (<HTMLInputElement>document.getElementById("input_1"))
      .value;
    const response_2 = (<HTMLInputElement>document.getElementById("input_2"))
      .value;
    const response_3 = (<HTMLInputElement>document.getElementById("input_3"))
      .value;
    var obj: any = [];
    obj[0] = JSON.parse(JSON.stringify(response_1));
    obj[1] = JSON.parse(JSON.stringify(response_2));
    obj[2] = JSON.parse(JSON.stringify(response_3));
    console.log(obj);

    (<HTMLInputElement>document.getElementById("input_3")).value = "";
    (<HTMLInputElement>document.getElementById("input_2")).value = "";
    (<HTMLInputElement>document.getElementById("input_1")).value = "";

    this.appService
      .surveyResponse(obj)
      .pipe()
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  openPreview() {
    const preview = document.getElementById("preview");
    if (preview) {
      preview.style.zIndex = "9999";
    }
  }

  closePreview() {
    const preview = document.getElementById("preview");
    if (preview) {
      preview.style.zIndex = "-1";
    }
  }

  changeType(id: number) {
    this.category_id = id;
    this.component_list = ComponentTypes[id];
    for (let i = 0; i < 6; i++) {
      var button = document.getElementById(`button_${i}`);
      if (button) {
        button.style.backgroundColor = "#FFF";
      }
    }
    var button = document.getElementById(`button_${id}`);
    if (button) {
      button.style.backgroundColor = "#AAA";
    }
  }

  backToMenu() {
    this.save();
    this.router.navigate(["/menu"]);
  }

  editor_inputs: any[] = [];
  editor_input_names = [];
  editor_id: number = -1;

  openEditor(id: number) {
    this.editor_id = id;
    this.editor_input_names = this.website_components[id].input_names;
    this.editor_inputs = this.website_components[id].inputs;
    const editor = document.getElementById("editor");
    if (editor) {
      editor.style.zIndex = "9999";
    }
  }

  closeEditor() {
    const editor = document.getElementById("editor");
    if (editor) {
      editor.style.zIndex = "-1";
    }
  }

  discardEditor() {
    this.website_components.splice(this.editor_id, 1);
    this.html_components.splice(this.editor_id, 1);
    this.regenerate_html();
    this.closeEditor();
  }

  onType(event: any, index: number) {
    this.editor_inputs[index] = event.target.value;
  }

  saveEditor() {
    this.website_components[this.editor_id].inputs = this.editor_inputs;
    console.log(this.website_components[this.editor_id]);
    this.regenerate_html();
    this.closeEditor();
  }
}
