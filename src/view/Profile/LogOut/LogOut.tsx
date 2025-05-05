import { logout } from "@/store/reducer";
import { useAppDispatch } from "@/store/hooks";

const LogOut = () => {
  const dispatch = useAppDispatch();
  dispatch(logout());

  return <div>Logging out...</div>;
};

export default LogOut;
