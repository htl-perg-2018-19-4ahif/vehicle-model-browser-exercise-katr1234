import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IVehicle {
  id: number;
  year: number;
  make: string;
  model: string;
}

@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.css']
})
export class ModelsPageComponent implements OnInit {

  public url = 'https://vehicle-data.azurewebsites.net/api/';
  private vehicles: IVehicle[] = [];
  public get vehicle(): IVehicle[] {
    return this.vehicles;
  }
  public set vehicle(value: IVehicle[]) {
    this.vehicles = value;
  }
  public years: number[];
  public year = '';
  public makes: string[];
  public make = '';
  public offset = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getYears();
    this.getMakes();

  }
  public async getYears() {
    this.years = await this.httpClient.get<number[]>(this.url + 'years').toPromise();
  }

  public async getMakes() {
    this.makes = await this.httpClient.get<string[]>(this.url + 'makes').toPromise();
  }

  public async refresh() {
    this.years = await this.httpClient.get<number[]>(this.url + 'years').toPromise();
    this.makes = await this.httpClient.get<string[]>(this.url + 'makes').toPromise();
  }
}
