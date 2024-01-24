export default function Login() {
  return (
    <div className="flex justify-center">
      <div className="w-2/4 flex flex-col items-center mt-20">
        <form action="" className="w-3/4 font-courier p-5">
          <h1 className="text-center text-3xl font-bold mb-10">
            Log in to create posts
          </h1>
          <label htmlFor="username">Username or E-mail</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" />
          <div className="flex justify-center">
            <button className="p-3 border-2 mt-10 rounded-md bg-slate-500 w-2/4 font-bold">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
