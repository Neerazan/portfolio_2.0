import { Icone } from "../ui/Icone";

export function Socials() {
  return (
    <div className="rounded-full bg-linear-to-r from-purple-600 to-indigo-600 p-0.5">
      <nav className="flex items-center justify-between gap-x-8 rounded-full bg-[#1C1C1C] px-1 py-1">
        <Icone
          src={"/assets/email.svg"}
          alt="Email"
          href="mailto:nirajandhakal634@gmail.com"
        />
        <Icone
          src={"/assets/linkedin.svg"}
          alt="LinkedIn"
          href="https://www.linkedin.com/in/nirajan-dhakal-a49a36214/"
        />
        <Icone src={"/assets/github.svg"} alt="GitHub" href="https://github.com/neerazan" />
        <Icone src={"/assets/twitter.svg"} alt="Twitter" href="https://github.com/neerazan" />
      </nav>
    </div>
  );
}
