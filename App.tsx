import { StyleSheet, Text, View } from "react-native";
import LocalTime from "./screens/LocalTime";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <LocalTime />
      </SafeAreaProvider>
    </Provider>
  );
}
