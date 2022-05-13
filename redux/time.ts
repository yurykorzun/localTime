import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as LocationAPI from "expo-location";

import {API_KEY} from "@env";

const treeTypeCountQuery = `https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position`;

type TimeState = {
  isLoading: boolean;
  currentZone: Zone | undefined;
  longitude: string;
  latitude: string;
  isFailed: boolean;
  currentLocation: Location;
};

type Zone = {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
};

type Location = {
  latitude: string;
  longitude: string;
};

export const getCurrentLocation = createAsyncThunk(
  "time/getCurrentLocation",
  async (_, { rejectWithValue }) => {
    let { status } = await LocationAPI.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return rejectWithValue("Location permission denied");
    }

    let location = await LocationAPI.getCurrentPositionAsync({});

    return {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    } as Location;
  }
);

export const getCurrentZone = createAsyncThunk(
  "trees/getTreeList",
  async (
    { latitude, longitude }: { latitude: string; longitude: string },
    { rejectWithValue }
  ) => {
    if (!latitude || !longitude) {
        return rejectWithValue("Incorrect location");
    }
    try {
      const query = `${treeTypeCountQuery}&lat=${latitude}&lng=${longitude}`;
      const response = await axios.get(query);
      if (response.data === 'FAILED') {
        return rejectWithValue("Record not found.");
      }
      return response.data as Zone;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const treesSlice = createSlice({
  name: "time",
  initialState: { isLoading: true, isFailed: false } as TimeState,
  reducers: {
    setCurrentZone(
      state: any,
      action: PayloadAction<{ zone: Zone }>
    ) {
      state.currentZone = action.payload.zone;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentZone.rejected, (state) => {
        state.isLoading = false;
        state.isFailed = true;

        state.currentZone = undefined;
      })
      .addCase(getCurrentZone.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(getCurrentZone.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFailed = false;

        state.currentZone = payload;
      })
      .addCase(getCurrentLocation.rejected, (state) => {
        state.isLoading = false;
        state.isFailed = true;

        state.currentZone = undefined;
      })
      .addCase(getCurrentLocation.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(getCurrentLocation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFailed = false;
        
        state.currentLocation = {longitude: payload?.longitude, latitude: payload?.latitude};
      })
  },
});

export default treesSlice.reducer;
