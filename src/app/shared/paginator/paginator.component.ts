import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class Paginator {
  dataCount = input.required<number>();
  dataEvent = output<number>();
  dataEventItems = output<number>();

  curr = signal<number>(1);

  pages = computed(() => {
    const pages: number[] = [];
    const numPage = 5;
    const maxLimit = this.dataCount();
    const current = this.curr();

    if (maxLimit <= numPage) {
      for (let i = 1; i <= maxLimit; i++) {
        pages.push(i);
      }
    } else {
      const str = Math.max(1, Math.round(current - numPage / 2));
      const end = Math.min(maxLimit, Math.round(current + numPage / 2));
      for (let i = str; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  });

  pageChange(page: number) {
    if (page >= 1 && page <= this.dataCount()) {
      this.curr.set(page);
      this.dataEvent.emit(page);
    }
  }

  itemsPerPageChange(event: Event) {
    if (this.dataCount() > 0) {
      const value = (event.target as HTMLSelectElement).value;
      this.dataEventItems.emit(Number(value));
    }
  }
}
