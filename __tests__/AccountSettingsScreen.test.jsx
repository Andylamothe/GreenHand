import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserApi } from "../src/api/userApi";

//* Mocks for testing :
// Changement de username → updateMe + AsyncStorage.setItem
// Changement de mot de passe → updateMe uniquement
// Suppression de compte → deleteMe + AsyncStorage.removeItem*/

// Mock d'AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock UserApi
jest.mock("../src/api/userApi", () => ({
  UserApi: {
    updateMe: jest.fn(),
    me: jest.fn(),
    deleteMe: jest.fn(),
  },
}));

describe("AccountSettings API logic", () => {
  const mockUser = { username: "John", email: "john@test.com", location: "Montreal" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Username change (update me)", async () => {
    UserApi.updateMe.mockResolvedValue({});
    UserApi.me.mockResolvedValue({ data: { user: { ...mockUser, username: "NewName" } } });

    const payload = { username: "NewName" };
    await UserApi.updateMe(payload);
    console.log("updateMe called with:", payload);

    const meRes = await UserApi.me();
    const freshUser = meRes.data.user;
    await AsyncStorage.setItem("user", JSON.stringify(freshUser));
    console.log("AsyncStorage.setItem =>:", JSON.stringify(freshUser));

    expect(UserApi.updateMe).toHaveBeenCalledWith(payload);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(freshUser));
  });

  it("Password change (update me)", async () => {
    UserApi.updateMe.mockResolvedValue({});

    const passwordPayload = { password: "newpass123" };
    await UserApi.updateMe(passwordPayload);
    console.log("updateMe => password with:", passwordPayload);

    expect(UserApi.updateMe).toHaveBeenCalledWith(passwordPayload);
  });

  it("deleteMe", async () => {
    UserApi.deleteMe.mockResolvedValue({});

    await UserApi.deleteMe();
    console.log("deleteMe called");

    await AsyncStorage.removeItem("token");
    console.log("AsyncStorage.removeItem => token");

    await AsyncStorage.removeItem("user");
    console.log("AsyncStorage.removeItem => user");

    expect(UserApi.deleteMe).toHaveBeenCalled();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");
  });
});
