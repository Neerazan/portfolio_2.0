
interface TitleProps {
  title: string;
  className?: string;
  id?: string;
}

function Title({ title, className, id }: TitleProps) {
  return (
    <div id={id} className={className ? className : "mt-20 sm:mt-28 ml-6 flex items-center md:w-15/20 md:mx-auto mb-8 sm:mb-10 font-mono"}>
      <span className="text-gray-500 mr-3 text-base md:text-lg">{"//"}</span>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mr-3">
        {title}
      </h2>
      <div className="h-px bg-gray-800 flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-green-500/50 to-transparent w-1/2 animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}

export default Title;
