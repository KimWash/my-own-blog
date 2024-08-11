"use client";

import { authenticate } from "@/components/actions/authenticate";
import { useFormState } from "react-dom";

export default function Home() {
  const [errMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="flex flex-1 justify-center items-center">
      <form action={dispatch}>
        <label>이메일 </label>
        <p>
          <input name="email" type="email" className="input input-bordered"></input>
        </p>
        <label>비밀번호 </label>
        <p>
          <input name="password" type="password" className="input input-bordered"></input>
        </p>
        <button type="submit" className="btn btn-info">로그인</button>
      </form>
    </div>
  );
}
