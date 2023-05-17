import Image from "next/image";
import AuthenticationForm from "./components/AuthenticationForm";

export default function Home() {
  return (
    <div>
      <div>
        <Image alt="logo" height="48" width="48" src="/images/logo.png" />
        <h2>Sign in to your Account</h2>
      </div>
      <AuthenticationForm />
    </div>
  );
}
