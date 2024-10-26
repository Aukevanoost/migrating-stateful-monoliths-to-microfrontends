import { inject, Pipe, PipeTransform } from '@angular/core';
import { ENV } from '../env/env.contract';

@Pipe({
  name: 'toPath',
  standalone: true,
})
export class toPath implements PipeTransform {
  env = inject(ENV);

  transform(path: string): string {
    return `${this.trimIfFirstChar(this.env.frontendUrl)}/${this.trimIfLastChar(path)}`;
  }

  private trimIfFirstChar(raw: string, needle = '/') {
    return (raw.endsWith(needle)) ? raw.slice(0, -1) : raw;
  }
  private trimIfLastChar(raw: string, needle = '/') {
    return (raw.endsWith(needle)) ? raw.slice(1) : raw;
  }
}