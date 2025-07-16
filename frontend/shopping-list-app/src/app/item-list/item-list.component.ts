import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService, Item } from '../item/item.service';

@Component({
    selector: 'app-item-list',
    standalone: true,  // better be explicit than implicit
    imports: [CommonModule],
    templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnChanges {
    @Input() reloadTrigger: number = 0;

    items: Item[] = [];
    message = '';

    constructor(private itemService: ItemService) {}

    // see app.component.html and item-form.component.ts
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['reloadTrigger']) {
            this.loadItems();
        }
    }

    ngOnInit() {
        this.loadItems();
    }

    loadItems() {
        this.message = 'Loading items...'
        this.itemService.getItems().subscribe(data => {
            this.items = data;
            this.message = ''
        });
    }

    deleteItem(id: number) {
        this.message = 'Deleting item...';
        this.itemService.deleteItem(id).subscribe(() => {
            this.loadItems();
            this.message = 'Item successfully deleted';
        });
    }
}
