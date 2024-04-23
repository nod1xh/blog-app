export default function Profile() {
  const username = localStorage.getItem("user");

  return (
    <div>
      <h2 className="font-bold text-2xl text-[#4a5568] mt-40 ml-20">
        Your Profile
      </h2>
      <div>
        <form
          className="w-1/3 disabled:cursor-not-allowed focus-visible:outline-none bg-[#2f3f61] text-white"
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
                className="bg-[#2f3f61] cursor-not-allowed"
                aria-invalid={false}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                readOnly
                className="cursor-not-allowed disabled:opacity-50 bg-[#2f3f61]"
                aria-invalid={false}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
