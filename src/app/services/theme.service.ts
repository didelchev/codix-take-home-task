import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = false;


  toggleTheme():void { 
    this.isDark = !this.isDark;

    if(this.isDark){
      document.body.classList.add('dark')
    }else{
      document.body.classList.remove('dark')
    }

    localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
  }


  loadTheme(): void { 
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark'){
      this.isDark = true
      document.body.classList.add('dark');
    }
  }
}
