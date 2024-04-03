import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://10.145.57.235:8080/api';

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/carros`);
  }

  getCarById(carId: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/carros/` + carId);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/carros`, car);
  }

  updateCar(car: Car): Observable<Car> {
    console.log('Entrei');
    return this.http.put<Car>(`${this.baseUrl}/carros/` + car.id, car);
  }

  deleteCar(carId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/carros/` + carId);
  }
}
