import React, { Children } from "react";

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
    };
  }

  componentDidCatch(err, info) {
    console.log(err, info);
  }

  static getDerivedStateFromError(error) {
    return { err: error };
  }

  render() {
    if (this.state.err)
      return (
        <div>
          <h2>Error Occured</h2>
          <p>{this.state.err.message}</p>
        </div>
      );
    return this.props.children;
  }
}
