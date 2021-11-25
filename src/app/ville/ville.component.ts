import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Ville } from '../classes/ville';
import { VilleService } from '../services/ville.service';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css'],
})
export class VilleComponent implements OnInit {
  villes: Array<Ville> = [];
  ville: Ville = new Ville();
  search: string = '';
  @ViewChild('closeButton') closeButtonElement: any;

  constructor(private vs: VilleService) {}

  ngOnInit(): void {
    this.reloadCities();
  }

  reloadCities(): void {
    this.villes = [];
    this.vs.getAll(this.search).subscribe(
      (data) => {
        this.villes = data;
      }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  clearCities(): void {
    this.villes = [];
  }

  delete(id: number | undefined): void {
    if (confirm('Êtes vous sur ?')) {
      this.vs.delete(id).subscribe(
        (data) => {
          this.reloadCities();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id: number | undefined) {
    this.vs.getById(id).subscribe(
      (data) => {
        this.ville = data;
      }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  submitCity() {
    if (this.ville.id == undefined) {
      this.vs.add(this.ville).subscribe((data) => {
        this.closeButtonElement.nativeElement.click();
        this.reloadCities();
      });
    } else {
      this.vs.update(this.ville).subscribe((data) => {
        this.closeButtonElement.nativeElement.click();
        this.reloadCities();
      });
    }
  }

  resetCity() {
    this.ville = new Ville();
  }
}
