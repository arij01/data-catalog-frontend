import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocService } from 'src/app/DocServices/doc.service';
import { HttpService } from 'src/app/columnservices/http.service';
import { Column } from 'src/app/model/columns';
import { Documentation } from 'src/app/model/documentation';
import { NotificationService } from 'src/app/notifications/notification.service';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.css']
})
export class CreateColumnComponent implements OnInit {
  createForm!: FormGroup;
  columns!: Column[];

  constructor(private httpService: HttpService, private fb: FormBuilder,private notificationService:NotificationService,private http:DocService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      nom: ['', Validators.required],
      synonyme: ['', Validators.required],
      type: ['', Validators.required],
      label: [null],
      businessKey: [null],
      documentation: [this.http.getDocumentationById('65d8dc460db71457d5619cfe'),Validators.required],
    });
   
    
  }

  handelSubmit(): void {
    if (this.createForm.valid) {
      this.httpService.addColumn(this.createForm.value).subscribe(
        (response) => {
          console.log('Success:', response);
          this.createForm.reset();
          this.notificationService.openSnackBar('Champ ajoutée!', 'OK');
          
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
}