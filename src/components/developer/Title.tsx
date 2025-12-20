
interface TitleProps {
  title: string;
  className?: string;
  id?: string;
}

function Title({ title, className, id }: TitleProps) {
  return (
    <div id={id} className={className ? className : "mt-24 sm:mt-32 ml-6 flex items-center md:w-15/20 md:mx-auto mb-10 sm:mb-12 font-mono"}>
      <span className="text-gray-500 mr-4 text-lg md:text-xl">{"//"}</span>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mr-4">
        {title}
      </h2>
      <div className="h-px bg-gray-800 flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-green-500/50 to-transparent w-1/2 animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}

export default Title;
