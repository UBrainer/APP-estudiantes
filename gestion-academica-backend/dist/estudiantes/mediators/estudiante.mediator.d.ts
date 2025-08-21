import { ModuleCommunication } from './module-communication.interface';
export declare class EstudianteMediator {
    private modules;
    registerModule(moduleName: string, module: ModuleCommunication): void;
    unregisterModule(moduleName: string): void;
    notifyAll(event: string, data: any): Promise<void>;
    notifyModule(moduleName: string, event: string, data: any): Promise<void>;
    getRegisteredModules(): string[];
    isModuleRegistered(moduleName: string): boolean;
}
