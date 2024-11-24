import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
import ENVIROMENT from "../../config/enviroment.config";

// ^ --------> Function to verify the user's session
const verifySession = async (setUser, setUserTokenFunc, token, actualRoute) => {
  try {
    console.log("Verifying session...");  
    if (!token) {
      console.log("No token found");
      setUser(null);
      setUserTokenFunc(null);
      return;
    }

    // # ---> Send a request to the server to verify the user's session
    const response = await backFetch({
      url: "http://localhost:3000/api/auth/verify-token",
      method: "GET",
      headers: {
        "x-api-key": ENVIROMENT.API_INTERNAL,
        Authorization: `Bearer ${token}`,
      },
    });

    // Create a custom response
    const result = await customResponse(response, "Session verified", "Session verification failed");

    // * ---> If the session is verified, update the user's information
    if (result.success) {
      setUser(result.data.payload.user);
    }
    // ! ---> If the session is not verified, log out the user
    else {
      setUser(null);
      setUserTokenFunc(null);
      console.log("Session verification failed");

      // Redirect to the login page if the user is not logged in
      // if (actualRoute !== "/") {
      //   window.location.href = "/";
      // }
    }
  } 
    // ! -----> If an error occurred, log the error
    catch (error) {
    setUser(null);
    setUserTokenFunc(null);
    console.error("[VerifySession] - An error occurred:", error);
  }
};

export default verifySession;
