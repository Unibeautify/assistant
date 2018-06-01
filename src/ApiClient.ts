import { BeautifyData, Language, OptionsRegistry } from "unibeautify";

export default class ApiClient {
  constructor(private apiUrl: string) {}

  public beautify(payload: BeautifyData): Promise<BeautifyResponse> {
    return this.fetch<BeautifyResponse>("beautify", payload);
  }

  public support(): Promise<SupportResponse> {
    return this.fetch<SupportResponse>("support");
  }

  private fetch<T>(path: string = "", payload?: object): Promise<T> {
    return fetch(`${this.apiUrl}/${path}`, {
      method: "POST",
      body: payload && JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }).then(res => res.json());
  }
}

export interface BeautifyResponse {
  error?: string;
  beautifiedText: string;
}

export interface SupportResponse {
  beautifiers: string[];
  languages: LanguageWithOptions[];
}

export interface LanguageWithOptions extends Language {
  options: OptionsRegistry;
  beautifiers: string[];
}