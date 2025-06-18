import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TareaService} from '../../services/tarea.service'

@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CrearTareaPage {
  tareaForm: FormGroup;
  

  constructor(private fb: FormBuilder, private router: Router, private alertCtrl: AlertController, private tareaService: TareaService) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  async guardarTarea() {
  const { fecha } = this.tareaForm.value;
  const hoy = new Date().toISOString().split('T')[0];

  if (fecha < hoy) {
    const alert = await this.alertCtrl.create({
      header: 'Fecha inválida',
      message: 'La fecha de vencimiento debe ser futura.',
      buttons: ['OK'],
    });
  await alert.present();
  return;
}

    // Obtiene los valores del formulario, sin ID
    const nuevaTarea = this.tareaForm.value;

    // Usa el servicio para guardar
    this.tareaService.agregarTarea(nuevaTarea);

    // Alerta de éxito
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Tarea guardada correctamente',
      buttons: ['OK'],
    });
    await alert.present();

    // Redirige al Home
    this.router.navigate(['/home']);
  }
}
