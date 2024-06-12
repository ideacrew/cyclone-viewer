import { Component, ReactNode, Fragment } from "react";
import { CycloneDataLoader } from "../data/cyclone_data_loader";
import * as CycloneModel from "../cyclonedx/models";
import * as cdx from "@cyclonedx/cyclonedx-library";

type PropsType = {
  dataLoader: CycloneDataLoader;
  component: CycloneModel.Component;
};

type StateType = {
  shown: boolean;
}

export class ComponentComponent extends Component<PropsType, StateType, any> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      shown: false
    };
  }

  toggleShow = () => {
    this.setState((s) => {
      return {...s, shown: !s.shown}
    });
  };

  purlValues() : ReactNode | string {
    if (this.props.component.purl) {
    return <Fragment key={this.props.component["bom-ref"] + "purl"}>
             <dt>PURL</dt>
             <dd>{this.props.component.purl}</dd>
           </Fragment>;
    }
    return "";
  }

  cpeValues() : ReactNode | string {
    if (this.props.component.cpe) {
      return <Fragment key={this.props.component["bom-ref"] + "cpe"}>
              <dt>CPE</dt>
              <dd>{this.props.component.cpe}</dd>
            </Fragment>;
    }
    return "";
  }
  
  vcsValues() : ReactNode[] | string {
    if (this.props.component.externalReferences) {
      const vcsRefs = this.props.component.externalReferences.filter(er => {
        if (er.type === cdx.Enums.ExternalReferenceType.VCS) {
          return true;
        }
        return false;
      });
      if (vcsRefs.length > 0) {
        return vcsRefs.map(vcsr => {
          return <Fragment key={this.props.component["bom-ref"] + vcsr.url}>
            <dt>VCS</dt>
            <dd>{vcsr.url}</dd>
            {this.mapVcsShas(vcsr.hashes)}
          </Fragment>;
        });
      }
    }
    return "";
  }

  mapVcsShas(hashes : CycloneModel.Hash[] | null | undefined) : ReactNode[] | string {
    if (hashes) {
      return hashes.map(h => {
        return <Fragment key={this.props.component["bom-ref"] + "vcs_hash_display" + h.alg}>
          <dt>VCS {h.alg}</dt>
          <dd>{h.content}</dd>
        </Fragment>;
      });
    }
    return "";
  }

  descriptionValues() : ReactNode | string {
    return "";
  }

  componentDetailClassName() {
    if (this.state.shown) {
      return "component-detail-row component-detail-shown";
    } else {
      return "component-detail-row component-detail-hidden";
    }
  }

  componentHasVcs() {
    if (this.props.component.externalReferences) {
      const vcsRefs = this.props.component.externalReferences.filter(er => {
        if (er.type === cdx.Enums.ExternalReferenceType.VCS) {
          return true;
        }
        return false;
      });
      if (vcsRefs.length > 0) {
        return true;
      }
    }
    return false;
  }

  componentHasDetails() {
    return this.props.component.cpe || this.props.component.purl || this.componentHasVcs();
  }

  detailsLink() : ReactNode | string {
    if (this.componentHasDetails()) {
      return <td onClick={this.toggleShow} className="table-detail-toggle">Details</td>;
    }
    return "";
  }

  getComponentKind() {
    if (this.props.component.purl) {
      const purl = this.props.component.purl;
      if (purl.startsWith("pkg:gem/")) {
        return "Gem";
      } else if (purl.startsWith("pkg:npm/")) {
        return "NPM";
      } else if (purl.startsWith("pkg:deb/")) {
        return "Debian";
      } else if (purl.startsWith("pkg:apk/")) {
        return "Alpine";
      }
    }
    return "other";
  }

  public render(): ReactNode {
    return (
      <Fragment>
        <tr key={this.props.component["bom-ref"] + "-mainrow"} className="component-main-row">
          <td>{this.props.component.name}</td>
          <td>{this.props.component.version}</td>
          <td>{this.getComponentKind()}</td>
          {this.detailsLink()}
        </tr>
        <tr key={this.props.component["bom-ref"] + "-detailrow"} className={this.componentDetailClassName()}>
          <td colSpan={2}>
            <dl>
              {this.purlValues()}
              {this.cpeValues()}
              {this.vcsValues()}
              {this.descriptionValues()}
            </dl>
          </td>
        </tr>
      </Fragment>
    );
  }
}