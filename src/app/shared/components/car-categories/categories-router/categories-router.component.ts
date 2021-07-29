import { Component, Input } from '@angular/core';

import { RouterLink } from '../../../models/car.model';

@Component({
  selector: 'app-categories-router',
  templateUrl: './categories-router.component.html',
  styleUrls: ['./categories-router.component.scss']
})
export class CategoriesRouterComponent {
  @Input() routerLinks!: RouterLink[];
}
