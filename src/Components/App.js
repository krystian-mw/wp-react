import React from "react";

import { withRouter } from "react-router-dom";

import { Container } from "reactstrap";

import Nav from "./Nav";
import Splashscreen from "./Splashscreen";

import Page from "../Templates/Page";
import Post from "../Templates/Post";
import Blog from "../Templates/Blog";
import _404 from "../Templates/_404";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    props.history.listen(() => {
      this.setState({ loaded: false });
      this.updateData();
    });
  }

  ShowPage = () => {
    let out = [<Nav key={0} NavItems={this.state._NAV} />];
    if (!this.state._POSTS.length) {
      switch (this.state._POST_TYPE) {
        case "page":
          out.push(<Page key={1} data={this.state} />);
          break;
        case "post":
          out.push(<Post key={1} data={this.state} />);
        default:
          break;
      }
    } else {
      out.push(<Blog key={1} data={this.state} />);
    }
    return <Container>{out}</Container>;
  };

  Show = () => (this.state._IS_404 ? this.Show404() : this.ShowPage());

  Show404 = () => (
    <Container>
      <Nav NavItems={this.state._NAV} />
      <_404 />
    </Container>
  );

  ShowLoading = () => (
    <Container>
      <Nav NavItems={this.state._NAV || []} />
      <Splashscreen />
    </Container>
  );

  updateData = () => {
    fetch(window.location.href + "?data-only")
      .then((res) => res.json())
      .then((data) => {
        const loaded = true;
        let temp = { ...data, loaded };
        this.setState(temp);
      })
      .catch((err) => {});
  };

  componentDidMount() {
    this.updateData();
  }

  render() {
    return this.state.loaded ? <this.Show /> : <this.ShowLoading />;
  }
}

export default withRouter(App);
