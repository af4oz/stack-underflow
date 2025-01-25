import * as React from "react";
import createCtx from "../utils/createCtx";
import storage from "../utils/localStorage";

interface IAuthContext {
  user: any;
  setUser: (userData: any) => void;
  logoutUser: () => void;
}
const [useAuthCtx, AuthCtxProvider] = createCtx<IAuthContext>();

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(authReducer, { user: null });

  React.useEffect(() => {
    const loggedUser = storage.loadUser();

    if (loggedUser) {
      dispatch({
        type: "LOGIN",
        payload: loggedUser,
      });
    }
  }, []);

  const value = React.useMemo(() => {
    const setUser: IAuthContext["setUser"] = (userData) => {
      storage.saveUser(userData);
      dispatch({
        type: "LOGIN",
        payload: userData,
      });
    };

    const logoutUser = () => {
      storage.removeUser();
      dispatch({ type: "LOGOUT" });
    };
    return {
      user: state.user,
      setUser,
      logoutUser,
    };
  }, [state, dispatch]);

  return <AuthCtxProvider value={value}>{children}</AuthCtxProvider>;
};

export const useAuthContext = useAuthCtx;
