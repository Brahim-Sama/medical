import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../classes/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients : Array<Patient> = []; 
  httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : "Basic YWRtaW46MTIzNA==" // admin - 1234 
    })
  }

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

}
