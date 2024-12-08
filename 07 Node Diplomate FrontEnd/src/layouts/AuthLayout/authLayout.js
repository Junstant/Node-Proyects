import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import getCareers from "../../components/common/Careers/getCareers";

// ^ --------> Function to verify the user's session
const verifySession = async (setCareers, setUser, setUserTokenFunc, token) => {
  try {
    // ! -----> If there is no token, log out the user
    if (!token) {
      console.log("[VerifySession] - No token found. Logging out user");
      setUser(null);
      setUserTokenFunc(null);
      return;
    }

    // # ---> Send a request to the server to verify the user's session
    const response = await backFetch({
      url: `${BACK_DIR}/api/auth/verify-token`,
      method: "GET",
      headers: {
        "x-api-key": API_INTERNAL,
        Authorization: `Bearer ${token}`,
      },
    });

    // Create a custom response
    const result = await customResponse(response, "Session verified", "Session verification failed");

    // * ---> If the session is verified, update the user's information
    if (result.success) {
      const user = result.data.payload.user;
      setUser(user);
      getCareers(setCareers, user);
    }
    // ! ---> If the session is not verified, log out the user
    else {
      setUser(null);
      setUserTokenFunc(null);
      console.log("Session verification failed");
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
