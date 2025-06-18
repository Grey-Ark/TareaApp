import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TareaService, Tarea } from '../../services/tarea.service';

@Component({
  standalone: true,
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
})
export class DetalleTareaPage implements OnInit {
  tareaForm: FormGroup;
  tareaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,
    private tareaService: TareaService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    const tarea = this.tareaService.getTareaPorId(this.tareaId);

    if (!tarea) {
      // Manejar tarea no encontrada
      this.router.navigate(['/home']);
      return;
    }

    this.tareaForm = this.fb.group({
      titulo: [tarea.titulo, Validators.required],
      descripcion: [tarea.descripcion, Validators.required],
      fecha: [tarea.fecha, Validators.required],
    });
  }

  async guardarCambios() {
    if (this.tareaForm.invalid) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const tareaActualizada = this.tareaForm.value;
    this.tareaService.actualizarTarea(this.tareaId, tareaActualizada);

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Tarea actualizada correctamente.',
      buttons: ['OK'],
    });
    await alert.present();

    this.router.navigate(['/home']);
  }
}
