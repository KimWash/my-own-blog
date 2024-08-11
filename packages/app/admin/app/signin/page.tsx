import { signIn } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default function Home() {

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        action={async (formdata) => {
          "use server";
          let success = false;
          try {
            const result = await signIn("credentials", {
              email: formdata.get("email"),
              password: formdata.get("password"),
              redirect: false,
            });
            if (result) success = true;
          } catch (e) {
            console.log(e);
          }
          redirect('/dashboard');
        }}
      >
        <label>이메일 </label>
        <p>
          <input
            name="email"
            type="email"
            className="input input-bordered"
          ></input>
        </p>
        <label>비밀번호 </label>
        <p>
          <input
            name="password"
            type="password"
            className="input input-bordered"
          ></input>
        </p>
        <button type="submit" className="btn btn-info">
          로그인
        </button>
      </form>
    </div>
  );
}
