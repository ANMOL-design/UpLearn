import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./redux/index";
import Start from "./containers/Start";
import MathQuiz from "./containers/MathQuiz";
import "./game1.css";
// import Footer from './components/Footer';

class Game1 extends Component {
  gameStart = () => {
    this.props.onStartGame();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.props.isStarted ? (
            <Start startPressed={this.gameStart} />
          ) : (
            <MathQuiz {...this.props} gameStart={this.gameStart} />
          )}
        </header>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game1);
