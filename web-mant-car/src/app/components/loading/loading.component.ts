import {Component, Input, OnInit} from '@angular/core';
import { PageConfigurationService } from '../../services/page-configuration.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  template: `
  <div>
    <ng-template #loadingTemplate>
      <div class="custom-class">
        <h3>Loading...</h3>
      </div>
    </ng-template>
  </div>
  `
})
export class LoadingComponent {
}
