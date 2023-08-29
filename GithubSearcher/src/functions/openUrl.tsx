import { Linking } from "react-native";

export const openUrl = (url: string) => {
    Linking.openURL(url);
  };