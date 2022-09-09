import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import Login from "./Screen/Login";
import Auth from "./Context/store/Auth";

export default function App() {
  return (
    <NativeBaseProvider>
      <Auth>
        <Login />
      </Auth>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
