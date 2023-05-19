import AuthenticationForm from "./components/AuthenticationForm";

export default function Home() {
  return (
    <div
      className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50'>
      <AuthenticationForm />
    </div>
  );
}
