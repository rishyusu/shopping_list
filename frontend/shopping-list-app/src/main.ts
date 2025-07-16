import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // No item form or item list displayed? Solution:
    // to avoid NullInjectorError: No provider for _HttpClient!
    provideHttpClient()
  ]
}).catch((err) => console.error(err));
