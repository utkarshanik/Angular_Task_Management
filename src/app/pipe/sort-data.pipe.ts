import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortData',
  standalone:true
})
export class SortDataPipe implements PipeTransform {

  transform(data: any[], field: string, order: 'asc' | 'desc'): any[] {
    if (!data || !field || !order) return data;

    return data.sort((a, b) => {
      const fieldA = a[field]?.toString().toLowerCase();
      const fieldB = b[field]?.toString().toLowerCase();

      if (!fieldA || !fieldB) return 0;

      if (field === 'startdate' || field === 'enddate') {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }

      return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
  }
}
