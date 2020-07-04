import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'helpline',
    templateUrl: './helpline.component.html',
    styleUrls: ['./helpline.component.scss']
})

export class HelpLineComponent implements OnInit {
    columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
];

    rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];
    // @Input('totalConfirmed') totalConfirmed;
    // @Input('totalDeaths') totalDeaths;
    // @Input('totalActive') totalActive;
    // @Input('totalRecovered') totalRecovered;
    constructor() { }

    ngOnInit(): void {
        // this.columnDefs = [
        //     { headerName: 'Make', field: 'make' },
        //     { headerName: 'Model', field: 'model' },
        //     { headerName: 'Price', field: 'price' }
        // ];

        // this.rowData = [
        //     { make: 'Toyota', model: 'Celica', price: 35000 },
        //     { make: 'Ford', model: 'Mondeo', price: 32000 },
        //     { make: 'Porsche', model: 'Boxter', price: 72000 }
        // ];
    }
    
}
