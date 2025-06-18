import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonItem, IonLabel, IonText, IonFab, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFab, IonText, IonLabel, IonItem, IonList, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class HomePage implements OnInit {

   tareas: any[] = [];

  ngOnInit() {
    this.cargarTareas();
  }

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    const data = localStorage.getItem('tareas');
    this.tareas = data ? JSON.parse(data) : [];
  }
  
  constructor() { 
    addIcons({addOutline}); 
  }


}
