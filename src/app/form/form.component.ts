import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatesService } from '../states.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  checkOutForm;
  estados$: any;
  estados: any[];
  estado: any;
  municipios = [];
  suscripcion: any;

  constructor(private statesService: StatesService, private formBuilder: FormBuilder) {
    this.checkOutForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: [null, Validators.required],
      gender: ['', Validators.required],
      direction: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.estados$ = this.statesService.getStates().pipe(tap((data) => this.estados = data))
  }

  onSelectState(estado) {
    this.municipios = this.estados.find(e => e.nombre === estado).municipios;
  }

  onSubmit() {
    if (this.checkOutForm.valid) {
      this.suscripcion = this.statesService.sendForm(this.checkOutForm.value).subscribe(resp => {
        console.log(resp);
      });
    }
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }
}
