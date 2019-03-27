import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { HarborLibraryModule } from './harbor-library.module';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
    declarations: [],
    imports: [
        NgxEchartsModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule,
        HarborLibraryModule.forRoot()
    ],
    providers: [],
    bootstrap: []
})

export class AppModule {
}
