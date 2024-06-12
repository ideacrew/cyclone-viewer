import { Component, ReactNode, Fragment } from "react";
import { CycloneDataLoader } from "../data/cyclone_data_loader";
import { ComponentListComponent } from './ComponentList.component';
import { ViewState, ViewSelection } from "../view_models/view_state";
import { VulnerabilitiesListComponent } from "./VulnerabilitiesList.component";

type PropsType = {
  dataLoader: CycloneDataLoader;
  viewState: ViewSelection;
};

export class ViewSelectionComponent extends Component<PropsType, any, any> {
  sectionClass(vs: ViewSelection) {
    if (this.props.viewState == vs) {
      return "shown-section";
    }
    return "hidden-section";
  }

  render() : ReactNode {
      return <Fragment>
      <div className={this.sectionClass(ViewSelection.COMPONENTS)}>
      <ComponentListComponent dataLoader={this.props.dataLoader}/>
      </div>
      <div className={this.sectionClass(ViewSelection.VULNERABLITIES)}>
      <VulnerabilitiesListComponent dataLoader={this.props.dataLoader}/>
      </div>
      </Fragment>
  }
}