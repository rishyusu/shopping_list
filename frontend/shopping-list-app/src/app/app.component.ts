import { Component } from '@angular/core';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,  // better be explicit than implicit
    imports: [
        CommonModule,
        ItemFormComponent,
        ItemListComponent
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
    // refreshList() is called on itemAdded emitted by the item form
    reloadFlag = 0;  // connected to the item list's reloadTrigger
    refreshList() {
        this.reloadFlag++;
    }
}
