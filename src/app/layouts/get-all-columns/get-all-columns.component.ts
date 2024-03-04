import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Column } from 'src/app/model/columns';
import { HttpService } from 'src/app/columnservices/http.service';
import { Label } from 'src/app/model/label';

@Component({
  selector: 'app-get-all-columns',
  templateUrl: './get-all-columns.component.html',
  styleUrls: ['./get-all-columns.component.css']
})
export class GetAllColumnsComponent implements OnInit{
  constructor(private httpService: HttpService,private router:Router){}
  ListOfColumns!:Column[];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Change this value based on your preference
  totalItems: number = 0;
  searchTerm!: Label;

  ngOnInit(): void {
    this.httpService.getAllColumns().subscribe(Column=>{this.ListOfColumns=Column;
      this.totalItems=this.ListOfColumns.length;}
      );
  }
  delete(id: string) {
    this.httpService.deleteColumn(id).subscribe();
    this.ngOnInit();
  }
  onEdit(id: string): void {
    this.router.navigate(['columns/edit', id]);
  }

  add(): void {
    this.router.navigate(['columns/create']);
  }
   // Pagination 
   getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
  //search
  // search(): void {
  //   this.ListOfColumns = this.ListOfColumns.filter(c =>
  //     c.label ? c.label.toLowerCase().includes(this.searchTerm.toLowerCase()) : false
  //   );
  // }
  search() {
    const label = this.searchTerm;
    if (label) {
      this.httpService.searchColumns(label).subscribe(
        (columns: Column[]) => {
          this.ListOfColumns = columns;
        }
      );
    } else {
      // Handle the case where the label is not found
      alert(`Le label "${this.searchTerm}" n'existe pas. Veuillez saisir un label valide.`);
    }
  }

}
