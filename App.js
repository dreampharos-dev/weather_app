import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "8467bb5752d81308564952ae6010076c";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // send to API and get weather
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("Can not find your location", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
