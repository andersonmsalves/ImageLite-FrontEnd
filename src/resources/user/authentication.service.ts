import { log } from "console";
import {
  User,
  Credentials,
  AccessToken,
  UserSessionToken,
} from "./users.resource";
import { jwtDecode } from "jwt-decode";

class AuthService {
  baseURL: string = "http://localhost:8080/v1/users";
  static AUTH_PARAM: string = "_auth";

  async authenticate(credentials: Credentials): Promise<AccessToken> {
    const response = await fetch(this.baseURL + "/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 401) {
      throw new Error("User or password are incorrent!");
    }
    return await response.json();
  }

  async save(user: User): Promise<void> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response auth.save: " + JSON.stringify(response));

    if (response.status == 409) {
      throw new Error("User already exists!");
    }

    //return await response.json(); // because the method was declared as void return.
  }

  initSession(token: AccessToken) {
    if (token.accessToken) {
      const decodedToken: any = jwtDecode<any>(token.accessToken);
      console.log("DECODED TOKEN: " + JSON.stringify(decodedToken));

      const userSessionToken: UserSessionToken = {
        accessToken: token.accessToken,
        email: decodedToken.sub,
        name: decodedToken.name,
        expiration: decodedToken.exp,
      };

      this.setUserSession(userSessionToken);
    }
  }

  setUserSession(userSessionToken: UserSessionToken) {
    localStorage.setItem(
      AuthService.AUTH_PARAM,
      JSON.stringify(userSessionToken)
    );
  }
}

export const useAuth = () => new AuthService();
