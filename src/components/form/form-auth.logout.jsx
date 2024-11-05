import { LogoutUser } from "@/auth.actions/logout";

export const FormLogout = ({ sessionID }) => {
  return (
    <form action={LogoutUser}>
      <input type="text" name="id" defaultValue={sessionID} hidden />
      <button>Logout</button>
    </form>
  );
};
