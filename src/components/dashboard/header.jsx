export const Header = ({ nama }) => {
  return (
    <div className="fixed top-0 flex w-full items-center justify-end gap-3 border-b-2 bg-twYellow px-8 py-4 text-sky-600">
      <h1>
        Welcome Back, <span className="font-bold">{nama}</span>
      </h1>
    </div>
  );
};
