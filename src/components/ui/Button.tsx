interface ButtonProps {
  title: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function Button({ title, onClick, ariaLabel }: ButtonProps) {
  return (
    <div className="group relative rounded-full bg-linear-to-r from-purple-600 to-indigo-600 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-[#717cf0]/50">
      <button
        onClick={onClick}
        aria-label={ariaLabel || title}
        className="cursor-pointer rounded-full bg-[#1C1C1C] from-indigo-600 to-purple-600 py-2.5 px-6 text-white group-hover:bg-linear-to-r flex items-center justify-center"
      >
        {title}
      </button>
    </div>
  );
}
