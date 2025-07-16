import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService, Item } from '../item/item.service';

@Component({
    selector: 'app-item-form',
    standalone: true,  // better be explicit than implicit
    imports: [FormsModule, CommonModule],
    templateUrl: './item-form.component.html'
})
export class ItemFormComponent {
    item: Item = { name: '', description: '', price: 0 };
    message = '';

    // see app.component.html and item-list.component.ts
    @Output() itemAdded = new EventEmitter<void>();

    constructor(private itemService: ItemService) {}

    addItem() {
        if (!this.item.name || this.item.price <= 0) {
            this.message = 'Please correctly fill the name and the price.';
            return;
        }
        
        this.message = 'Adding item...';
        this.itemService.addItem(this.item).subscribe(() => {
            this.item = { name: '', description: '', price: 0 };
            // trigger list update with the help of the AppComponent
            this.itemAdded.emit();
            this.message = 'Item successfully added!';
        })
    }
}
