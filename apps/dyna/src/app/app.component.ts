import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppState } from '@models/store';
import { page } from '@mock/page';
import { Store } from '@ngrx/store';
import { DynamicPageComponent } from '@shared/dynamic-page/dynamic-page.component';
import { addPageComponents, updateTest } from '@store/actions/app.actions';

@Component({
  standalone: true,
  imports: [RouterModule, DynamicPageComponent],
  selector: 'glab-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  constructor(private store: Store<AppState> ) {}

  ngOnInit(): void {
    this.store.dispatch(addPageComponents({ page }));
  }

  update() {
    this.store.dispatch(updateTest());
  }
}
