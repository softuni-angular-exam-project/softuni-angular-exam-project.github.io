import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.scss']
})
export class CarImagesComponent implements OnInit {
  @Input() carImgs!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
