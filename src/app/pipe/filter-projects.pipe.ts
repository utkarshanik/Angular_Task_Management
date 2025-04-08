import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjects',
  standalone: true
})

export class FilterProjectsPipe implements PipeTransform {

  transform(taskdata: any[], searchText: string): any[] {
    if (!taskdata || !searchText) {
      return taskdata;
    }

    return taskdata.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
}
