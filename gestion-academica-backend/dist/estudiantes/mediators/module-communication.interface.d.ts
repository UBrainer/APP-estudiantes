export interface ModuleCommunication {
    notify(event: string, data: any): Promise<void>;
}
