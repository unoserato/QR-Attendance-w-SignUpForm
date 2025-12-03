function ErrorPage() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-1 w-full h-full">
        <h2 className="text-8xl">404</h2>
        <p className="text-2xl">Page not found.</p>
        <p className="text-sm text-center text-neutral-500 px-4">
          We're sorry, but the page you requested could not be found. It might
          have been moved, deleted, or the link may be incorrect.
        </p>
      </div>
    </>
  );
}

export default ErrorPage;
