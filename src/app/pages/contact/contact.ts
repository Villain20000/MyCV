import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, SpotlightDirective],
  templateUrl: './contact.html',
})
export class Contact {}
