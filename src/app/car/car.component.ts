import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Car } from './car';
import { CarService } from './car.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CarComponent implements OnInit {
  carDialog: boolean = false;

  cars!: Car[];

  car!: Car;
  drivers: any[] = [];

  selectedCars!: Car[] | null;

  submitted: boolean = false;

  constructor(
    private carService: CarService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });

    this.userService.getUsers().subscribe((data) => {
      this.drivers = data.map((user) => ({ label: user.nome, value: user }));
    });
  }

  openNew() {
    this.car = {} as Car;
    this.submitted = false;
    this.carDialog = true;
  }

  deleteSelectedCars() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir os carros selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cars = this.cars.filter(
          (val) => !this.selectedCars?.includes(val)
        );
        this.selectedCars = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Carros excluídos',
          life: 3000,
        });
      },
    });
  }

  editCar(car: Car) {
    this.car = { ...car };
    this.carDialog = true;
  }

  deleteCar(car: Car) {
    this.confirmationService.confirm({
      message:
        'Você tem certeza que deseja excluir o carro ' +
        car.marca +
        +car.modelo +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.carService.deleteCar(car.id!).subscribe(() => {
          this.cars = this.cars.filter((val) => val.id !== car.id);
          this.car = {} as Car;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Carro Excluído',
            life: 3000,
          });
        });
      },
    });
  }

  hideDialog() {
    this.carDialog = false;
    this.submitted = false;
  }

  saveCar() {
    this.submitted = true;
    if (this.car.modelo?.trim()) {
      if (this.car.id) {
        console.log('entrou update');
        let car: Car = {
          id: this.car.id,
          marca: this.car.marca,
          modelo: this.car.modelo,
          cor: this.car.cor,
          usuarioId: this.car.user!.value!.id,
        };

        this.carService.updateCar(car).subscribe(() => {
          this.reloadCars();
          this.cars[this.findIndexById(this.car.id!)] = this.car;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Carro Atualizado',
            life: 3000,
          });
        });
      } else {
        let car: Car = {
          marca: this.car.marca,
          modelo: this.car.modelo,
          cor: this.car.cor,
          usuarioId: this.car.user!.value!.id,
        };

        this.carService.createCar(car).subscribe(() => {
          this.reloadCars();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Carro Cadastrado',
            life: 3000,
          });
        });
      }

      this.carDialog = false;
      this.car = {} as Car;
    }
  }

  reloadCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
      this.updateTable();
    });
  }

  updateTable() {
    this.cars = [...this.cars];
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
