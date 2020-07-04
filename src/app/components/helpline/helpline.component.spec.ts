import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpLineComponent } from './helpline.component';

describe('HelpLineComponent', () => {
    let component: HelpLineComponent;
    let fixture: ComponentFixture<HelpLineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HelpLineComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HelpLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
