import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SpotlightDirective, MagneticDirective],
  templateUrl: './about.html',
})
export class About {}
