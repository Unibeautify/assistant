export function sample(
  languageName: string,
  optionKey: string
): string | undefined {
  try {
    return require(`@unibeautify/ugly-samples/samples/${languageName}/${optionKey}.txt`).default;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
