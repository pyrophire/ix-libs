import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scroll-position',
  templateUrl: './scroll-position.component.html',
  styleUrls: ['./scroll-position.component.scss']
})
export class ScrollPositionComponent implements OnInit {
  form: FormGroup;
  backgroundColor = new FormControl({ value: null, disabled: false }, []);
  barColor = new FormControl({ value: null, disabled: false }, []);
  position = new FormControl({ value: 'fixed', disabled: false }, []);
  top = new FormControl({ value: null, disabled: false }, []);
  right = new FormControl({ value: null, disabled: false }, []);
  bottom = new FormControl({ value: 0, disabled: false }, []);
  left = new FormControl({ value: 0, disabled: false }, []);

  constructor(private fb: FormBuilder) {}

  buildForm(): void {
    this.form = this.fb.group({
      backgroundColor: this.backgroundColor,
      barColor: this.barColor,
      position: this.position,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left
    });
    this.form.valueChanges.subscribe((value) => {
      // if (value.top?.trim() !== '') {
      //   this.bottom.setValue(null);
      // }
      // if (value.bottom?.trim() !== '') {
      //   this.top.setValue(null);
      // }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }
}
