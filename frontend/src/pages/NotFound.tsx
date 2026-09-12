import { NavLink, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  const isMissingPage = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl text-center mb-8">
        {isMissingPage ? "Page not found" : "Something went wrong"}
      </h1>
      <p className="text-center text-[#4a5568] mb-8">
        {isMissingPage
          ? "That address does not match anything on this blog."
          : "An unexpected error occurred while loading this page."}
      </p>
      <NavLink to="/" className="signin text-base">
        Back to the homepage
      </NavLink>
    </div>
  );
}
