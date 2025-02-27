import Toast from "react-native-toast-message";
import { ApiResponseError } from "./http";

const onApiError = (error: ApiResponseError) => {
  Toast.show({
    type: "error",
    text1: error.message,
  });
};

export default onApiError;
