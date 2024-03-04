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
  // documentations!:Documentation[];

  constructor(private httpService: HttpService,private docService: DocService, private fb: FormBuilder,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      nom: ['', Validators.required],
      synonyme: ['', Validators.required],
      type: ['', Validators.required],
      label: [null],
      businessKey: [null],
      champResultant: [null],
      // documentation: [Documentation],
    });
    this.httpService.getAlL().subscribe(columns => this.columns = columns);
    // this.docService.getAllDocumentations().subscribe(documentations => {
    //   this.documentations = documentations;
    // });
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