import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'xello-senior-web-dev-takehome-web';

  constructor(private router: Router){}

  get pageTitle(): string {
    const url = this.router.url;
    return url.includes('/college') ? 'College Details' : 'College List';
  }
}
