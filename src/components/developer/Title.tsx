import Image from "next/image";

interface TitleProps {
  title: string;
  className?: string;
  id?: string;
}

function Title({ title, className, id }: TitleProps) {
  return (
    <div id={id} className={className ? className : "mt-20 ml-6 flex items-center md:w-15/20 md:mx-auto mb-20"}>
      <h2 className="mr-3 text-xl sm:text-2xl md:text-3xl font-bold text-white/95 drop-shadow-sm">
        {title}
      </h2>
      <div className="relative">
        <Image
          src={"/assets/Portal.svg"}
          alt="Portal"
          width={40}
          height={40}
          className="w-6 md:w-10" />
        <Image
          src={"/assets/Portal.svg"}
          alt="Portal"
          className="absolute bottom-5 left-5 w-2.5 md:bottom-7 md:left-7 md:w-4"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}

export default Title;
