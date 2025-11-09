function StaffHeader() {
  return (
    <>
      {/* mobile view only */}
      <header className="w-full">
        <div
          className="
                    flex justify-between items-center 
                    w-full p-3 shadow
                    bg-blue-900 text-white
                    "
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              Attend
              <strong className="text-xl  text-blue-400">AMS</strong>
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-white/10">
              Staff Mode
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default StaffHeader;
