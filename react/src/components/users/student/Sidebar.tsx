
type SidebarProps = {
  open: boolean;
};

function Sidebar({ open }: SidebarProps) {
  // unused sidebar
  return (
    <div
      className={`absolute top-0 transition-all duration-300 ease-in-out left-0 w-dvw h-dvh bg-black/20 z-1 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`flex flex-col absolute top-0 right-0 w-2/3 bg-white h-full transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-[400%]"
        }`}
      >
        <div className="flex justify-between items-center text-white bg-blue-500 p-3">
          <p className="text-xl font-bold">Menu</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
