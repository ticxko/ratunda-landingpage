interface GtagEventParams {
  send_to?: string;
  [key: string]: unknown;
}

declare function gtag(command: "event", action: string, params?: GtagEventParams): void;
declare function gtag(command: "config" | "js", target: string | Date, params?: Record<string, unknown>): void;

interface Window {
  gtag?: typeof gtag;
}
