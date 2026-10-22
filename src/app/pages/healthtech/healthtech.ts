import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-healthtech',
  imports: [RouterLink, SpotlightDirective, MagneticDirective],
  templateUrl: './healthtech.html',
  styleUrl: './healthtech.css',
})
export class Healthtech {}
