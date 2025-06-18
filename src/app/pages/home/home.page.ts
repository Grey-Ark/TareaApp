import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonItem, IonLabel, IonText, IonFab, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TareaService} from '../../services/tarea.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonFab, IonText, IonLabel, IonItem, IonList, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class HomePage implements OnInit {

   tareas: any[] = [];
 
  constructor(private tareaService: TareaService) { 
    addIcons({createOutline,trashOutline,addOutline}); 
  }

  ngOnInit() {
    this.cargarTareas();
  }

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = this.tareaService.getTareas();
  }

  eliminarTarea(id: number) {
    const confirm = window.confirm('¿Estás seguro de eliminar esta tarea?');
    if (confirm) {
      this.tareaService.eliminarTarea(id);
      this.cargarTareas();
    }
  }



}
