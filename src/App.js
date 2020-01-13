import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//App routes
import routes from "./routes";

//Svg Sprite
import svgFile from './assets/images/svg/svg-sprite.svg';


class App extends React.Component {
  componentDidMount() {
    this.svgSprite()
  }

  svgSprite(){    
    let svgVersion = "1.00";
    console.log("SVG Sprite version : " + svgVersion);
    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect){
      return true;
    }
    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,        
        insertIT = ()=> {
          document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = ()=> {
          if (document.body) {
            insertIT()
          }else {
            document.addEventListener('DOMContentLoaded', insertIT)
          };
        };
    if (isLocalStorage && (localStorage.getItem('inlineSVGrev') === svgVersion)) {
        data = localStorage.getItem('inlineSVGdata');
        if (data !== undefined) {
            insert();
            return true;
        }
    }

    try {
        request = new XMLHttpRequest();
        request.open('GET', svgFile, true);
        request.onload = ()=> {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                console.log(request)
                insert();
                if (isLocalStorage) {
                    localStorage.setItem('inlineSVGdata', data);
                    localStorage.setItem('inlineSVGrev', svgVersion);
                }
            }
        }
        request.send();      
    }
    catch (e) { }
  }
  render(){
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <React.Fragment>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
      </React.Fragment>
    </Router>
    );
  }
}

export default App;
