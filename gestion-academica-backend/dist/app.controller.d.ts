import { PrismaService } from './prisma/prisma.service';
export declare class AppController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    testConnection(): Promise<{
        message: string;
        estudiantesCount: number;
        error?: undefined;
        details?: undefined;
    } | {
        error: string;
        details: any;
        message?: undefined;
        estudiantesCount?: undefined;
    }>;
}
