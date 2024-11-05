import { FormLogout } from "../form/form-auth.logout";

export const SideBarLogout = ({ sessionID }) => {
  return (
    <div className="absolute bottom-20 left-0 w-full px-8">
      <FormLogout sessionID={sessionID} />
    </div>
  );
};
