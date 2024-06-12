import { Component, ReactNode } from "react";
import { CycloneDataLoader } from "../data/cyclone_data_loader";
import { ComponentComponent } from "./Component.component";

type PropsType = {
  dataLoader: CycloneDataLoader;
};

export class ComponentListComponent extends Component<PropsType, any, any> {
  private dataLoader : CycloneDataLoader;

  constructor(props: PropsType) {
    super(props);
    this.dataLoader = props.dataLoader;
  }

  componentNodes() : Array<ReactNode> | string {
    if (this.dataLoader.bom?.components) {
      let componentDisplay = this.dataLoader.bom?.components.map((c) => {
        return <ComponentComponent dataLoader={this.dataLoader} component={c} key={c["bom-ref"] + "-component"}></ComponentComponent>;
      })
      return componentDisplay;
    }
    return "";
  }

  public render(): ReactNode {
    return (
        <div>
          <table className="component-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              { this.componentNodes() }
            </tbody>
          </table>
        </div>
    );
  }
}