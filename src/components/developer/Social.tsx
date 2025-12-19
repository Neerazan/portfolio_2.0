
export function Socials() {
  return (
    <div className="font-mono text-xs sm:text-sm text-gray-400 bg-[#0d1117] p-4 rounded border border-gray-800">
      <span className="text-green-400">const</span> <span className="text-yellow-200">socials</span> <span className="text-white">=</span> <span className="text-yellow-400">{"{"}</span>
      <div className="pl-4 flex flex-col gap-1 my-1">
        <div>
          <span className="text-blue-300">email</span>: <a href="mailto:nirajandhakal634@gmail.com" className="text-green-300 hover:underline">"nirajandhakal634@gmail.com"</a>,
        </div>
        <div>
          <span className="text-blue-300">linkedin</span>: <a href="https://linkedin.com/in/nirajan-dhakal" target="_blank" className="text-green-300 hover:underline">"in/nirajan-dhakal"</a>,
        </div>
        <div>
          <span className="text-blue-300">github</span>: <a href="https://github.com/neerazan" target="_blank" className="text-green-300 hover:underline">"@neerazan"</a>
        </div>
      </div>
      <span className="text-yellow-400">{"}"}</span>;
    </div>
  );
}
