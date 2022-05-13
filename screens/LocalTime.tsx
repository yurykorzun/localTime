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
    if (longitude && latitude) {
      dispatch(getCurrentZone({ longitude, latitude }));
    }
  };

  return (
    <View style={styles.container}>
      {isFailed && <ErrorMessage />}
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

      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#6AB2FA",
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={onShowCurrentTime}
        >
          <Text>Show current time</Text>
        </TouchableOpacity>
      </View>

      {(!isFailed && currentZone && !!currentZone.zoneName) && (
        <>
          <View>
            <Text>Timezone {currentZone.zoneName}</Text>
          </View>
          <View style={styles.clock}>
            <Clock timezone={currentZone.zoneName} />
          </View>
        </>
      )}

      {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={"black"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: 200,
    marginBottom: 10
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#6AB2FA",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clock: {
    margin: 10,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(179, 178, 178, 0.3)",
  },
});
