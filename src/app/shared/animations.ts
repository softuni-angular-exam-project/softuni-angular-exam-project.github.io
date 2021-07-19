import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
	slideRightLeft: trigger('slideRightLeft', [
		state('in', style({
			'transform': 'translateX(-10px)'
		})),
		state('out', style({
			'transform': 'translateX(-103%)'
		})),
		transition('in => out', [
			animate('500ms ease-in-out'),
		]),
		transition('out => in', [
			animate('500ms ease-in-out'),
		])
	]),
	slideLeftRight: trigger('slideLeftRight', [
		state('in', style({
			'transform': 'translateX(0)'
		})),
		state('out', style({
			'transform': 'translateX(103%)'
		})),
		transition('in => out', [
			animate('500ms ease-in-out'),
		]),
		transition('out => in', [
			animate('500ms ease-in-out'),
		])
	])
}
