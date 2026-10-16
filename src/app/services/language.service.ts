import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly currentLanguage = signal('en');

  readonly availableLanguages = [
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' },
  ];

  constructor(
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'ru']);

    const browserLang = this.translate.getBrowserLang();
    if (browserLang && ['en', 'ru'].includes(browserLang)) {
      this.translate.use(browserLang);
      this.currentLanguage.set(browserLang);
    } else {
      this.translate.use('en');
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage.set(lang);
  }
}