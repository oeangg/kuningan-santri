import { LogoutUser } from "@/actions.auth/logout";

export const FormLogout = ({ sessionID }) => {
  return (
    <form action={LogoutUser} className="px-5 pb-6">
      <input type="text" name="id" defaultValue={sessionID} hidden />
      <button>Logout</button>
    </form>
  );
};
