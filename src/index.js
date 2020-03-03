import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from "./Spinner";

class App extends React.Component{
   constructor(props){
      //Required for constructor to function
      super(props);
      //This is the only time we do direct assignment and initialized
      //to this.state
      this.state = { 
         lat: null, 
         errorMessage: null
       };

   }

   componentDidMount(){
      console.log('My component was rendered to the screen');
      window.navigator.geolocation.getCurrentPosition(
         (position) => this.setState({ lat: position.coords.latitude }),
         (err) => this.setState({ errorMessage: err.message })
      );
   }

   componentDidUpdate(){
      console.log('My component was updated - rerendered!');
   }

   renderContent(){
      if (this.state.errorMessage && !this.state.lat) {
         return <div> Message: {this.state.errorMessage}</div>;
      }
      if (!this.state.errorMessage && this.state.lat) {
         return <SeasonDisplay lat={this.state.lat}/>
      }
      return <Spinner message="Please accept location request"/>;
   }

   //React says we have to define render 
   render() {
      return <div className="border red">{this.renderContent()}</div>
   }
}

ReactDOM.render(<App />, document.querySelector('#root'));