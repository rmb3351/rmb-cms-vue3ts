export type AnyObject = Record<string | symbol, any>;

export interface IFormatter {
  formatUtcString: (utcString: string, formatString?: string) => string;
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $formatter: IFormatter;
  }
}
