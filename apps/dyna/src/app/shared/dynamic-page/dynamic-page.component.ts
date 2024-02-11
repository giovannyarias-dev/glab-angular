import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { selectStructure } from "@store/selectors/app.selectors";
import { AppState, Structure } from "@models/store";

@Component({
  selector: "glab-dynamic-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dynamic-page">
      <ng-container #adHost />
    </div>
  `,
  styleUrls: ["./dynamic-page.component.scss"]
})
export class DynamicPageComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @ViewChild('adHost', { static: true, read: ViewContainerRef }) adHost!: ViewContainerRef;

  subscriptions$: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private dynamicComponentService: DynamicComponentService
  ) {}

  ngOnInit(): void {
    this.addStructureSubs();
  }

  addStructureSubs() {
    this.subscriptions$.add(
      this.store.select(selectStructure(this.pageId)).subscribe((structure: Structure) => {
        if( structure ) {
          this.dynamicComponentService.addComponentToView(this.adHost, this.pageId, structure);
        }
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}