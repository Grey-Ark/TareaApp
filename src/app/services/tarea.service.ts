import { Injectable } from '@angular/core';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private storageKey = 'tareas';

  constructor() {}

  getTareas(): Tarea[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  agregarTarea(tarea: Omit<Tarea, 'id'>): void {
    const tareas = this.getTareas();
    const nuevaTarea: Tarea = {
      id: Date.now(),
      ...tarea,
    };
    tareas.push(nuevaTarea);
    this.guardarTareas(tareas);
  }

  actualizarTarea(id: number, tareaActualizada: Omit<Tarea, 'id'>): void {
    const tareas = this.getTareas().map((tarea) =>
      tarea.id === id ? { id, ...tareaActualizada } : tarea
    );
    this.guardarTareas(tareas);
  }

  eliminarTarea(id: number): void {
    const tareas = this.getTareas().filter((tarea) => tarea.id !== id);
    this.guardarTareas(tareas);
  }

  getTareaPorId(id: number): Tarea | undefined {
    return this.getTareas().find((tarea) => tarea.id === id);
  }

  private guardarTareas(tareas: Tarea[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tareas));
  }
}
