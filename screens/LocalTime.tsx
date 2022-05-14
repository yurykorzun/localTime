import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { getCurrentLocation, getCurrentZone } from "../redux/time";
import Clock from "./components/Clock";
import ErrorMessage from "./components/ErrorMessage";
import LocationInput from "./components/LocationInput";

export default function LocalTime() {
  const currentLocation = useSelector(
    (state: RootState) => state.app.currentLocation
  );
  const currentZone = useSelector((state: RootState) => state.app.currentZone);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const isFailed = useSelector((state: RootState) => state.app.isFailed);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setLongitude(currentLocation.longitude);
      setLatitude(currentLocation.latitude);
    }
  }, [currentLocation]);

  const initialize = async () => {
    await dispatch(getCurrentLocation());
  };

  const onShowCurrentTime = () => {
    if (!!longitude && !!latitude) {
      dispatch(getCurrentZone({ longitude, latitude }));
    }
  };

  return (
    <View style={styles.container}>
      {isFailed && <ErrorMessage />}
      <View style={styles.formContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Enter a location</Text>
        </View>
        <View style={styles.inputs}>
          <LocationInput
            name={"Latitude:"}
            value={longitude}
            onChange={setLongitude}
          />
          <LocationInput
            name={"Longitude:"}
            value={latitude}
            onChange={setLatitude}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onShowCurrentTime}>
          <Text>Show current time</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        {!isFailed && currentZone && !!currentZone.zoneName && (
          <View
            style={styles.result}
          >
            <View style={styles.zone}>
              <Text>Timezone: {currentZone.zoneName}</Text>
            </View>
            <View>
              <Text>Time in {currentZone.countryName}</Text>
            </View>
            <View style={styles.clock}>
              <Clock timezone={currentZone.zoneName} />
            </View>
          </View>
        )}
      </View>

      {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={"black"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    marginBottom: 10,
  },
  resultContainer: {
    height: 100,
    width: "100%",
  },
  result: {
    flex: 1,
    backgroundColor: "#bee9e8",
    borderWidth: 1,
    borderColor: "#62b6cb",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    borderTopWidth: 0,
    padding: 10,
  },
  titleText: {
    fontSize: 16,
  },
  title: {
    paddingBottom: 20,
    alignItems: "center",
  },
  formContainer: {
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#bee9e8",
    width: "100%",
    borderColor: "#62b6cb",
  },
  button: {
    padding: 10,
    backgroundColor: "#5fa8d3",
    borderRadius: 5,
    borderColor: "#1b4965",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  inputs: {
    marginBottom: 10,
    width: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cae9ff",
  },
  clock: {
    padding: 10,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(179, 178, 178, 0.3)",
  },
});
