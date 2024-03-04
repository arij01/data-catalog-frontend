import { Input } from "@angular/core";
import { Documentation } from "./documentation";
import { Label } from "./label";

export class Column {
    id: string;
    nom: string;
    synonyme: string;
    type: string;
    label: Label;

    // Reflexive relationship
    businessKey: string;
    champResultant: string;
    //Relation
    // @OneToOne(() => Documentation, { cascade:false })
    // documentation: Documentation;
    
    constructor(id: string, nom: string, synonyme: string, type: string,businessKey: string, label: Label,champResultant:string) {
        this.id = id;
        this.nom = nom;
        this.synonyme = synonyme;
        this.type = type;
        this.label = label;
        this.businessKey = businessKey;
        this.champResultant=champResultant;
        // this.documentation = documentation;
    }
   


}


