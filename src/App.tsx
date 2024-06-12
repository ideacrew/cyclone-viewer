import { Component, ReactNode } from 'react';
import { CycloneDataLoader } from './data/cyclone_data_loader'
import './App.css';
import { MainSummaryComponent } from './components/MainSummary.component';
import { ViewSelectionComponent } from './components/ViewSelection.component';
import { MenuComponent } from './components/Menu.component';
import { ViewState, ViewSelection } from "./view_models/view_state";

export class App extends Component<any, ViewState, any> {
  private dataLoader : CycloneDataLoader;

  constructor(propSet: any) {
    super(propSet);
    this.dataLoader = new CycloneDataLoader();
    this.state = {
      selectedView: ViewSelection.COMPONENTS
    };
  }

  public selectView(value: ViewSelection) {
    this.setState({
      selectedView: value
    });
  }

  render() : ReactNode {
    return (
      <div className="App">
        <MenuComponent selectedView={this.state.selectedView} viewSelector={this}/>
        <div className="contentArea">
        <MainSummaryComponent dataLoader={this.dataLoader}/>
        <ViewSelectionComponent dataLoader={this.dataLoader} viewState={this.state.selectedView}/>
        </div>
      </div>
    );
  }
}