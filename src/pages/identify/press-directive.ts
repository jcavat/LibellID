import {Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[longPress]'
})
export class PressDirective implements OnInit, OnDestroy {
    el: HTMLElement;
    pressGesture: Gesture;

    @Output()
    longPress: EventEmitter<any> = new EventEmitter();

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        this.pressGesture = new Gesture(this.el);
        this.pressGesture.listen();
        this.pressGesture.on('press', e => {
            this.longPress.emit(e);
        })
    }

    ngOnDestroy() {
        this.pressGesture.destroy();
    }
}
