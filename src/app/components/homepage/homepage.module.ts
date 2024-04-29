

// Import necessary Angular modules and dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component';
import { HomepageService } from './homepage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { AppLoaderModule } from '../app-loader/app-loader.module';
import { NgxSelectModule } from 'ngx-select-ex';
@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, // Include FormsModule here
    DialogModule,
    ToastModule, // SHOW ERROR OR SUCCESS MESSAGE
    AppLoaderModule,
    NgxSelectModule
  ],
  providers: [
    HomepageService,
    MessageService
  ],
})
// Define the module class
export class HomepageModule { }
