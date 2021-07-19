import { Component, Input, OnInit } from '@angular/core';

import { RouterLink } from '../../models/car.mode';

@Component({
  selector: 'app-categories-router',
  templateUrl: './categories-router.component.html',
  styleUrls: ['./categories-router.component.scss']
})
export class CategoriesRouterComponent implements OnInit {
  @Input() routerLinks!: RouterLink[];

  constructor() { }

  ngOnInit(): void {
  }

}
