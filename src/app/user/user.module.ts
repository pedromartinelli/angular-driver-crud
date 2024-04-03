import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  exports: [UserComponent],
})
export class UserModule {}
