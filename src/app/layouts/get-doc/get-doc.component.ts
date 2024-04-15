import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DocService } from 'src/app/DocServices/doc.service';
import { Documentation } from 'src/app/model/documentation';

import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-get-doc',
  templateUrl: './get-doc.component.html',
  styleUrls: ['./get-doc.component.css']
})
export class GetDocComponent implements OnInit, OnDestroy {
  doc: Documentation | undefined;
  id: string | null | undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private httpService: DocService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.httpService.getDocumentationById(this.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          documentation => {
            this.doc = documentation;
            console.log('Doc fetched:', this.doc);
          },
          error => {
            console.error('Error fetching doc:', error);
            // Handle the error accordingly, e.g., show a message to the user
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.router.navigate(['/error']);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  generatePDF(): void {
    const element = document.getElementById('main'); // Assuming you have an element with id 'main' in your template
    if (element) {
      const opt = {
        margin:       1,
        filename:     'documentation.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }
  }
}

