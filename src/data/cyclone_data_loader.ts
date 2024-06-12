import { Bom, Component } from "../cyclonedx/models";
import * as data from "./data.json";

export class CycloneDataLoader {
  public bom = data as Bom | null;
  public componentHash : Map<String, Component>;

  constructor() {
    this.componentHash = new Map<String, Component>();
    if (this.bom) {
      if (this.bom.components) {
        if (this.bom.components.length > 0) {
          this.bom.components.forEach(c => {
            this.componentHash.set(c["bom-ref"], c);
          });
        }
      }
    }
  }
}