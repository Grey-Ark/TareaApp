import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CrearTareaPage {
  tareaForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private alertCtrl: AlertController) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  async guardarTarea() {
    if (this.tareaForm.invalid) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const nuevaTarea = this.tareaForm.value;

    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');

    tareasGuardadas.push({ id: Date.now(), ...nuevaTarea });

    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Tarea guardada correctamente',
      buttons: ['OK'],
    });
    await alert.present();

    this.router.navigate(['/home']);
  }
}
