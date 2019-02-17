declare class Platform {
    static name: string;
    static workDir: string;
    static close(): void;
    static isMobile(): boolean;
}