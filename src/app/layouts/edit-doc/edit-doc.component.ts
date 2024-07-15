import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { DocService } from 'src/app/DocServices/doc.service';
import { Documentation } from 'src/app/model/documentation';
import { NotificationService } from 'src/app/notifications/notification.service';



@Component({
  selector: 'app-edit-doc',
  templateUrl: './edit-doc.component.html',
  styleUrls: ['./edit-doc.component.css']
})
export class EditDocComponent implements OnInit {
  doc!: Documentation;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  editForm!: FormGroup;
  id: string | null | undefined;
  toEditColumn!: Documentation;
  

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private httpService: DocService,
    private notificationService:NotificationService
  ) {

  }

  ngOnInit(): void {
   
      this.httpService.getDocumentationById('663ba53ee78198184252047a').subscribe(column => {
        this.toEditColumn = column;
        console.log('Column fetched:', this.toEditColumn);
        this.updateForm();
      });
    
  }

  updateForm(): void {
    this.editForm = this.fb.group({
      id: [this.toEditColumn.id],
      title: [this.toEditColumn.title, Validators.required],
      createdAt: [this.toEditColumn.createdAt,Validators.required],
      lastUpdated: [this.toEditColumn.lastUpdated, Validators.required],
      text: [this.toEditColumn.text, Validators.required],
    });
  }

  handelSubmitUpdate(): void {
    if (this.editForm.valid) {
      this.httpService.updateDocById(this.toEditColumn.id, this.editForm.value).subscribe(
        (response) => {
          console.log('Success:', response);
          this.editForm.reset();
          this.notificationService.openSnackBar('modification effectué!', 'OK');
          this.router.navigate(['/documentations/get/65d8dc460db71457d5619cfe']);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
}
update(): void {
  this.updateForm();
}
}