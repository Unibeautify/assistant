export function sample(languageName: string, optionKey: string): string | undefined {
    try {
        return require(`ugly-samples/samples/${languageName}/${optionKey}.txt`);
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
