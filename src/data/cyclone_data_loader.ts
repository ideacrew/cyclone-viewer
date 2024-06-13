import { Bom, Component, getComponentKind } from "../cyclonedx/models";
import * as data from "./data.json";

export type ComponentSearchValues = {
  names: string[],
  kinds: string[],
  descriptions: string[]
}

export class CycloneDataLoader {
  public bom = data as Bom | null;
  public componentHash : Map<string, Component>;
  public componentSearchValues : ComponentSearchValues;

  constructor() {
    this.componentHash = new Map<string, Component>();
    this.componentSearchValues = this.assignComponentValues();
  }

  assignComponentValues() {
    const compNameHash = new Map<string, any>();
    const compKindHash = new Map<string, any>();
    const compDescHash = new Map<string, any>();
    if (this.bom) {
      if (this.bom.components) {
        if (this.bom.components.length > 0) {
          this.bom.components.forEach(c => {
            this.componentHash.set(c["bom-ref"], c);
            compNameHash.set(c.name, null);
            compKindHash.set(getComponentKind(c), null);
            if (c.description) {
              compDescHash.set(c.description, null);
            }
          });
        }
      }
    }
    return {
      names: Array.from(compNameHash.keys()),
      kinds: Array.from(compKindHash.keys()),
      descriptions: Array.from(compDescHash.keys())
    };
  }

}