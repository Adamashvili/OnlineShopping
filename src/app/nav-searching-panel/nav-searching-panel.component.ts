import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { ProductsAreaService } from '../services/products-area.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { SpinnerComponent } from "../spinner/spinner.component";
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-nav-searching-panel',
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './nav-searching-panel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nav-searching-panel.component.css',
})
export class NavSearchingPanelComponent implements OnChanges {
  constructor(private service: ProductsAreaService, public tools: ToolsService) {}
  @Input() searchWord: string = '';

  searchedList = signal<any[]>([]);
  isSectionShown: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchWord !== '') {
      this.isSectionShown = true;
      setTimeout(() => {
        this.service
          .getSearchedData(this.searchWord)
          .subscribe((data: any) => this.searchedList.set(data.products));
          
      }, 1500);
    } else {
      this.isSectionShown = false;
    }
  }
}
