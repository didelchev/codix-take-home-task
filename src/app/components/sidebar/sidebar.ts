import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, User, DollarSign, Palette, List } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar  {

  time = signal('');
  period = signal('');
  day = signal('');
  date = signal('');


  readonly UserIcon = User
  readonly DollarIcon = DollarSign 
  readonly PaletteIcon = Palette
  readonly ListIcon = List
  
  private intervalId: any;


  constructor(private themeService: ThemeService){}



  ngOnInit(): void {
    this.themeService.loadTheme();
    this.updateClock();
    this.intervalId = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  
  private updateClock(): void{
    const now = new Date();

    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.time.set(`${hours}:${minutes}`);
    this.period.set(now.getHours() >= 12 ? 'PM' : 'AM');

    this.day.set(now.toLocaleDateString('en-US', { weekday: 'long' }));
    this.date.set(now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

  }


  changeTheme(): void {
    return this.themeService.toggleTheme();
  }

}
