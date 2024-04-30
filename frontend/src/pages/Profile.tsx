export default function Profile() {
  const username = localStorage.getItem("user");
  const email = localStorage.getItem("email");

  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl text-[#4a5568] mb-20 mt-10">
        Your Profile
      </h2>
      <div className="w-1/3">
        <form
          className=" disabled:cursor-not-allowed focus-visible:outline-none bg-[#fcfeff]"
          action=""
        >
          <fieldset>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                readOnly
                value={username!}
                className=" cursor-not-allowed"
                aria-invalid={false}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                readOnly
                value={email!}
                className="cursor-not-allowed disabled:opacity-50"
                aria-invalid={false}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
