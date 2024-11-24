import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BannerComponent} from "./components/banner/banner.component";
import {CueInputComponent} from "./components/cue-input/cue-input.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BannerComponent, CueInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cueter';
}
