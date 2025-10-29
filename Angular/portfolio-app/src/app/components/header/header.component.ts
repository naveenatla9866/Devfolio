import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Angular: Router for navigation

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: string = 'DevFolio';
  public isMenuOpen: boolean = false;
  public currentYear: number = new Date().getFullYear();
  public isDarkTheme = signal(false);
  
  public navigationItems: any[] = [
    { name: 'Home', route: '/home', icon: '🏠' },
    { name: 'About', route: '/about', icon: '👤' },
    { name: 'Projects', route: '/projects', icon: '💼' },
    { name: 'Blog', route: '/blog', icon: '📝' },
    { name: 'Contact', route: '/contact', icon: '📧' }
  ];

  // Angular: Inject Router service
  constructor(private router: Router) { // Angular: Dependency Injection
    console.log(`📅 DevFolio initialized in year: ${this.currentYear}`);
    
    effect(() => {
      const theme = this.isDarkTheme() ? 'dark' : 'light';
      console.log(`🎨 Theme changed to: ${theme}`);
      this.applyThemeToDocument(theme);
    });
  }

  ngOnInit(): void {
    this.loadUserPreferences();
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(`📱 Menu ${this.isMenuOpen ? 'opened' : 'closed'}`);
  }

  // Updated: Navigate using Angular Router
  public navigateToSection(item: any): void {
    console.log(`🧭 Navigating to: ${item?.name} (${item?.route})`);
    this.router.navigate([item.route]); // Angular: Programmatic navigation
    this.isMenuOpen = false; // Close mobile menu after navigation
  }

  public toggleTheme(): void {
    this.isDarkTheme.update(current => !current);
    this.saveThemePreference(this.isDarkTheme());
  }

  public trackByItem(index: number, item: any): string {
    return item.route;
  }

  // Check if route is active
  public isActiveRoute(route: string): boolean { // Angular: Route checking
    return this.router.url === route; // Angular: Get current URL
  }

  private loadUserPreferences(): void {
    try {
      const preferences = localStorage?.getItem?.('userPreferences');
      
      if (preferences) {
        const userSettings = JSON.parse(preferences);
        console.log('👤 User preferences loaded:', userSettings);
        
        if (userSettings?.theme) {
          this.isDarkTheme.set(userSettings.theme === 'dark');
        }
      } else {
        this.checkSystemThemePreference();
      }
    } catch (error) {
      console.error('❌ Failed to load user preferences:', error ?? 'Unknown error');
      this.checkSystemThemePreference();
    }
  }

  private checkSystemThemePreference(): void {
    if (window?.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme.set(prefersDark);
      console.log(`🎨 System theme: ${prefersDark ? 'dark' : 'light'}`);
    }
  }

  private saveThemePreference(isDark: boolean): void {
    try {
      const preferences = {
        theme: isDark ? 'dark' : 'light',
        timestamp: Date.now()
      };
      
      localStorage?.setItem?.('userPreferences', JSON.stringify(preferences));
      console.log('💾 Theme preference saved:', preferences);
    } catch (error) {
      console.error('❌ Failed to save theme:', error ?? 'Unknown error');
    }
  }

  private applyThemeToDocument(theme: string): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
      } else {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
      }
      
      console.log(`✨ Applied ${theme} theme to document`);
    }
  }
}