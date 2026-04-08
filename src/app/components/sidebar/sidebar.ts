import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, User, DollarSign, Palette, List } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { CustomInitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CustomInitialsPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  time = signal('');
  period = signal('');
  day = signal('');
  date = signal('');

  fullName = '';
  initials = '';

  readonly UserIcon = User;
  readonly DollarIcon = DollarSign;
  readonly PaletteIcon = Palette;
  readonly ListIcon = List;

  private intervalId: any;

  constructor(
    private themeService: ThemeService,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.updateClock();
    this.intervalId = setInterval(() => this.updateClock(), 1000);
    this.loadUser();

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateClock(): void {
    const now = new Date();

    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.time.set(`${hours}:${minutes}`);
    this.period.set(now.getHours() >= 12 ? 'PM' : 'AM');

    this.day.set(now.toLocaleDateString('en-US', { weekday: 'long' }));
    this.date.set(
      now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    );
  }

  private loadUser(): void {
    const savedUser = localStorage.getItem('client');
    if (savedUser) {
      const client = JSON.parse(savedUser);
      this.fullName = `${client.name} ${client.secondName}`;
      this.initials = `${client.name[0]}${client.secondName[0]}`;
    } else {
      this.clientService.getClient().subscribe((client) => {
        this.fullName = `${client.name} ${client.secondName}`;
        this.initials = `${client.name[0]}${client.secondName[0]}`;
      });
    }
  }

  changeTheme(): void {
    return this.themeService.toggleTheme();
  }
}
