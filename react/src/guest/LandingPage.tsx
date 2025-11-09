import LoginForm from "../components/guest/LoginForm";

function LandingPage() {
  return (
    <>
      {/* mobile view only */}
      <main
        className="
                  flex flex-col 
                  justify-center 
                  h-full w-full
                  gap-10 p-5"
      >
        <h2 className="font-bold text-blue-500 text-4xl">
          A digital platform designed to record, track, and manage student
          attendance efficiently.
        </h2>
        <div></div>
        <div className="">
          <LoginForm />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
