import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models/car.mode';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {
  @Input() car!: Car;
  carCurrentImage!: string;
  carId!: string;
  isLoading: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  afterImageIsLoaded() {
    this.isLoading = false;
  }
}
