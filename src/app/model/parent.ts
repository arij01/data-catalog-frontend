import { Column } from "./columns";
import { Documentation } from "./documentation";

export class Parent {
    column: Column;
    documentation: Documentation;
  
    constructor() {
      this.column = new Column();
      this.documentation = new Documentation();
      this.column.documentation = this.documentation;
    }
  }