import { Injectable } from '@nestjs/common';
import { ModuleCommunication } from './module-communication.interface';

@Injectable()
export class EstudianteMediator {
  private modules: Map<string, ModuleCommunication> = new Map();

  // Registrar módulos externos
  registerModule(moduleName: string, module: ModuleCommunication): void {
    this.modules.set(moduleName, module);
    console.log(`✅ Módulo registrado: ${moduleName}`);
  }

  // Remover módulos
  unregisterModule(moduleName: string): void {
    this.modules.delete(moduleName);
    console.log(`❌ Módulo removido: ${moduleName}`);
  }

  // Notificar a TODOS los módulos
  async notifyAll(event: string, data: any): Promise<void> {
    const promises = Array.from(this.modules.entries()).map(
      async ([moduleName, module]) => {
        try {
          await module.notify(event, data);
          console.log(`📢 Notificación enviada a ${moduleName}: ${event}`);
        } catch (error) {
          console.error(`❌ Error notificando a ${moduleName}:`, error);
        }
      }
    );
    
    await Promise.all(promises);
  }

  // Notificar a un módulo específico
  async notifyModule(moduleName: string, event: string, data: any): Promise<void> {
    const module = this.modules.get(moduleName);
    if (!module) {
      throw new Error(`Módulo no encontrado: ${moduleName}`);
    }
    
    try {
      await module.notify(event, data);
      console.log(`📢 Notificación enviada a ${moduleName}: ${event}`);
    } catch (error) {
      console.error(`❌ Error notificando a ${moduleName}:`, error);
      throw error;
    }
  }

  // Obtener módulos registrados
  getRegisteredModules(): string[] {
    return Array.from(this.modules.keys());
  }

  // Verificar si un módulo está registrado
  isModuleRegistered(moduleName: string): boolean {
    return this.modules.has(moduleName);
  }
}