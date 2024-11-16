import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromCDN',
  standalone: true,
})
export class fromCDNPipe implements PipeTransform {
  cdn = "http://localhost:8080";

  transform(path: string, size?: string): string {
    const url =  `${this.trimIfLastChar(this.cdn)}/${this.trimIfFirstChar(path)}`;
    return !!size ? url.replace('[size]', size) : url;
  }

  private trimIfFirstChar(raw: string, needle = '/') {
    return (raw.startsWith(needle)) ? raw.slice(1) : raw;
  }
  private trimIfLastChar(raw: string, needle = '/') {
    return (raw.endsWith(needle)) ? raw.slice(0, -1) : raw;
  }
}