export const FormUserEdit = ({ findUser }) => {
  async function EditProfil(formData) {
    "use server";

    const id = formData.get("id");
    const name = formData.get("name");

    await prisma.user.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  }
  return (
    <form
      action={EditProfil}
      className="grid max-w-sm space-y-2 text-lg font-normal text-sky-500"
    >
      <input type="text" name="id" defaultValue={findUser.User.id} hidden />
      <input type="text" name="name" defaultValue={findUser.User.name} />
      <input
        type="text"
        name="email"
        defaultValue={findUser.User.email}
        className="disabled:bg-slate-100 disabled:text-sky-200"
        disabled
      />
      <button className="w-full rounded-lg bg-sky-400 px-3 py-2 text-lg font-normal text-twWhite hover:bg-sky-500 disabled:opacity-30">
        Update
      </button>
    </form>
  );
};
