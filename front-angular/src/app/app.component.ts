import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDrawerContainer, MatDrawer, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-angular';
}
