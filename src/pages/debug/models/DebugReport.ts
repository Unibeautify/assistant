import { BeautifyError, InvalidExecutableVersionError } from "./BeautifyError";

export class DebugReport {
    constructor(private raw: string) {
    }

    get isValid(): boolean {
        return this.raw.indexOf("Atom Beautify - Debugging information") !== -1;
    }

    get date(): Date {
        const s = this.parse(" on `(.+)`.");
        const d = new Date(s);
        return d;
    }

    get platform(): string {
        return this.parse("[*][*]Platform[*][*]: (.+)\n", "unknown");
    }

    get operatingSystem(): OperatingSystem {
        switch (this.platform) {
            case 'win32':
                return OperatingSystem.Windows;
            case 'darwin':
                return OperatingSystem.Mac;
            default:
                return OperatingSystem.Linux;
        }
    }

    get atomVersion(): string {
        return this.parse("[*][*]Atom Version[*][*]: (.+)\n", "unknown");
    }

    get atomBeautifyVersion(): string {
        return this.parse("[*][*]Atom Beautify Version[*][*]: (.+)\n", "unknown");
    }

    get filePath(): string {
        return this.parse("[*][*]Original File Path[*][*]: `(.+)`", "unknown");
    }

    get grammar(): string {
        return this.parse("[*][*]Original File Grammar[*][*]: (.+)\n", "unknown");
    }

    get language(): string {
        return this.parse("[*][*]Original File Language[*][*]: (.+)\n", "unknown");
    }

    get languageNamespace(): string {
        return this.parse("[*][*]Language namespace[*][*]: (.+)\n", "unknown");
    }

    get beautifiers(): string {
        return this.parse("[*][*]Supported Beautifiers[*][*]: (.+)\n", "unknown");
    }

    get beautifier(): string {
        return this.parse("[*][*]Selected Beautifier[*][*]: (.+)\n", "unknown");
    }

    get editorOptions(): object {
        return this.parseJson("[*][*]Editor Options[*][*]: \n.+\n```json\n((.|[\r\n])+?)```");
    }

    get configOptions(): object {
        return this.parseJson("[*][*]Config Options[*][*]: \n.+\n```json\n((.|[\r\n])+?)```");
    }

    get homeOptions(): object {
        return this.parseJson("[*][*]Home Options[*][*]: \n.+\n```json\n((.|[\r\n])+?)```");
    }

    get editorConfigOptions(): object {
        return this.parseJson("[*][*]EditorConfig Options[*][*]: \n.+\n```json\n((.|[\r\n])+?)```");
    }
    
    get projectOptions(): object {
        return this.parseJson("[*][*]Project Options[*][*]: \n.+\n```json\n((.|[\r\n])+?)```");
    }

    get preTransformedOptions(): object {
        return this.parseJson("[*][*]Pre-Transformed Options[*][*]: \n.+\n```json\n((.|[\r\n])+?)```");
    }

    get finalOptions(): object {
        return this.parseJson("### Final Options\n\n.+\n```json\n((.|[\r\n])+?)```");
    }

    get output(): string {
        return this.parse("## Results\n\n.+\n```((.|[\r\n])+?)```", "");
    }

    get logs(): string {
        return this.parse("### Logs\n\n```\n((.|[\r\n])+?)```", "");
    }

    get hasError(): boolean {
        return this.error !== undefined;
    }

    get error(): BeautifyError | undefined {
        let failedExecutable: string;
        if (failedExecutable = DebugReport.parse(this.logs, "Error loading executables.+ Could not find '(.+)'.")) {
            let versionText: string;
            if (versionText = DebugReport.parse(this.logs, "Version is not valid: (.+)")) {
                return new InvalidExecutableVersionError(failedExecutable, versionText);
            }
        }
        return undefined;
    }

    private parseJson(pattern: string, defaultValue: any = {}): object {
        try {
            const s = this.parse(pattern, defaultValue);
            return JSON.parse(s);
        } catch (error) {
            console.error(error);
            return defaultValue;
        }
    }

    private parse(pattern: string, defaultValue: any = undefined): string | undefined {
        return DebugReport.parse(this.raw, pattern, defaultValue);
    }

    private static parse(raw: string, pattern: string, defaultValue: any = undefined): string | undefined {
        try {
            const r = new RegExp(pattern);
            const s = raw.match(r)[1];
            return s;
        } catch (error) {
            console.error(error);
            return defaultValue;
        }        
    }

    toJSON(): object {
        return {
            isValid: this.isValid,
            date: this.date,
            platform: this.platform,
            atomVersion: this.atomVersion,
            atomBeautifyVersion: this.atomBeautifyVersion,
            filePath: this.filePath,
            grammar: this.grammar,
            language: this.language,
            languageNamespace: this.languageNamespace,
            beautifiers: this.beautifiers,
            beautifier: this.beautifier,
            editorOptions: this.editorOptions,
            configOptions: this.configOptions,
            homeOptions: this.homeOptions,
            editorConfigOptions: this.editorConfigOptions,
            projectOptions: this.projectOptions,
            preTransformedOptions: this.preTransformedOptions,
            finalOptions: this.finalOptions,
            output: this.output,
            logs: this.logs,
            hasError: this.hasError,
            error: this.error,
        };
    }

}

export enum OperatingSystem {
    Mac,
    Windows,
    Linux
}
