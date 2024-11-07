import { InjectionToken } from "@angular/core";

export const ENV = new InjectionToken<AppEnv>('ENV');

export interface AppEnv {
  stage: "dev"|"pr"|"test"|"accp"|"prod";
  api: string;
  cdn: string;
}
