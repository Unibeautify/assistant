export abstract class BeautifyError {
  type: BeautifyErrorType;
}

export enum BeautifyErrorType {
  InvalidExecutableVersion,
}

export class InvalidExecutableVersionError extends BeautifyError {
  type = BeautifyErrorType.InvalidExecutableVersion;
  constructor(readonly executable: string, readonly version: string) {
    super();
  }
}
