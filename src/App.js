import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather"

const API_KEY = "42f5ca021688d4ffcf0e1534fbef6607";

class App extends React.Component {
  state = {
    temperature : undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (a) =>{
    a.preventDefault();
    const city = a.target.elements.city.value;
    const country = a.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country ){
    this.setState({
      temperature : data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    })
  }
  else {
    this.setState({
      temperature : undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Pleas enter the value !!!"
    })
  }
}
  render() {
    return (
      <div>
        <Title/>
        <Form getWeather={this.getWeather}/>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );

  }

}

export default App;