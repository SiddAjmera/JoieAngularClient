import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimmer'
})
export class TrimmerPipe implements PipeTransform {

  transform(input: string, lengthToTrimTo?: any): string {
    return input.trim().slice(0, lengthToTrimTo) + '...';
  }

}
