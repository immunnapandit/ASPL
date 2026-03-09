declare module "wowjs" {
  export interface WOWOptions {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
    callback?: (box: HTMLElement) => void;
    scrollContainer?: string | HTMLElement | null;
    resetAnimation?: boolean;
  }

  export class WOW {
    constructor(options?: WOWOptions);
    init(): void;
    sync(): void;
  }
}