import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { PatientService } from '../services/patient.service';
import { VilleService } from '../services/ville.service';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  villes: Array<Ville> = [];
  ville: Ville = new Ville();

  patients: Array<Patient> = [];
  patient: Patient = new Patient();
  @ViewChild('closeButton') closeButtonElement: any;

  constructor(private ps: PatientService, private vs: VilleService) {}

  ngOnInit(): void {
    this.reloadPatients();
    this.getVille();
  }

  reloadPatients(): void {
    this.patients = [];
    this.ps.getAll().subscribe(
      (data) => {
        this.patients = data;
      }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  clearPatients(): void {
    this.patients = [];
  }

  delete(id: number | undefined): void {
    if (confirm('Êtes vous sur ?')) {
      this.ps.delete(id).subscribe(
        (data) => {
          this.reloadPatients();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id: number | undefined) {
    this.getVille();
    this.ps.getById(id).subscribe(
      (data) => {
        this.patient = data;
      }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  submitPatient() {
    if (this.patient.id == undefined) {
      this.ps.add(this.patient).subscribe((data) => {
        this.closeButtonElement.nativeElement.click();
        this.reloadPatients();
      });
    } else {
      this.ps.update(this.patient).subscribe((data) => {
        this.closeButtonElement.nativeElement.click();
        this.reloadPatients();
      });
    }
  }

  getVille() {
    this.villes = [];
    this.vs.getAll().subscribe(
      (data) => {
        this.villes = data;
      }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  checkVille(v1: Ville, v2: Ville): boolean {
    return v1.id == v2.id;
  }

  resetPatient() {
    this.patient = new Patient();
    this.getVille();
  }
}
