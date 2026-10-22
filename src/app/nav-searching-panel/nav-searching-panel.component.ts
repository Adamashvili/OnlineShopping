import {
  Component,
  signal,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { ProductsAreaService } from '../services/products-area.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToolsService } from '../services/tools.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-nav-searching-panel',
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './nav-searching-panel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nav-searching-panel.component.css',
})
export class NavSearchingPanelComponent {
  constructor(
    private service: ProductsAreaService,
    public tools: ToolsService,
  ) {
    this.searchingFn();
  }
  searchWord = input<string>('');

  searchedList = signal<any[]>([]);

  searchingFn() {
    toObservable(this.searchWord)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((text) => text != ''),
        switchMap((text: string) => this.service.getSearchedData(text)),
      )
      .subscribe((data: any) => {
        this.tools.isSectionShown.set(true);
        this.searchedList.set(data.products);
      });
  }
}
