import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
    private alertCtrl: AlertController
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const tarea = tareas.find((t: any) => t.id === this.tareaId);

    if (tarea) {
      this.tareaForm.setValue({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        fecha: tarea.fecha,
      });
    }
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

    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const index = tareas.findIndex((t: any) => t.id === this.tareaId);

    if (index > -1) {
      tareas[index] = { id: this.tareaId, ...this.tareaForm.value };
      localStorage.setItem('tareas', JSON.stringify(tareas));

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Tarea actualizada correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      this.router.navigate(['/home']);
    }
  }
}
