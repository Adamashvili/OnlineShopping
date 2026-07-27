import { Component } from '@angular/core';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public tools: ToolsService) {}
}
