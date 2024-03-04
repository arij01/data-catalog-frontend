import { Component, Input } from '@angular/core';
import { Documentation } from 'src/app/model/documentation';
import { Label } from 'src/app/model/label';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class Column {
  id!: string;
  nom!: string;
  synonyme!: string;
  type!: string;
  label!: Label;
  businessKey!: string;

  @Input()
  documentation!: Documentation;

}
