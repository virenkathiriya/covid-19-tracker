import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HelpLineComponent } from './helpline.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [HelpLineComponent],
    imports: [
        BrowserModule,
        AgGridModule.withComponents([])
    ],
    providers: [],
    bootstrap: [HelpLineComponent]
})
export class HelpLineModule { }