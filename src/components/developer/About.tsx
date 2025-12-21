"use client";

import { motion } from "framer-motion";

export default function About() {
  const systemSpecs = [
    { label: "OS", value: "NirajanOS v2.4" },
    { label: "RUNTIME", value: "Node.js · Python" },
    { label: "ROLE", value: "Full Stack Developer (Backend-Focused)" },
    { label: "LOCATION", value: "Pokhara, Nepal" },
    { label: "UPTIME", value: "Learning by Building" },
    { label: "ARCHITECTURE", value: "Microservices · Serverless" },
  ];

  const bio = `I'm a backend-leaning full-stack developer who focuses on clean APIs, reliable deployments, and pragmatic system design.
I prefer simple, maintainable systems that evolve with real usage.
I learn by shipping projects, debugging in production, and improving developer workflows.`;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 bg-[#0a0a0a] text-gray-300 relative overflow-hidden">
      <div className="grid lg:grid-cols-5 gap-8 xl:gap-12 items-stretch">
        {/* Left: Terminal / Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 w-full h-full"
        >
          <div className="w-full h-full flex flex-col bg-[#0D1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm relative z-10 group hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
            {/* Header */}
            <div className="bg-[#161B22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
              </div>
              <div className="text-gray-500 text-xs font-medium opacity-60">
                fish — nirajan@portfolio — 80x24
              </div>
              <div className="w-10" />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 space-y-6 leading-relaxed bg-[#0D1117]">
              {/* whoami */}
              <div>
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <span>➜</span><span className="text-blue-400">~</span>
                  <span className="text-gray-100">whoami</span>
                </div>
                <div className="pl-5 text-gray-200 mb-4">nirajan</div>

                <div className="flex items-center gap-2 text-green-400 mb-3">
                  <span>➜</span><span className="text-blue-400">~</span>
                  <span className="text-gray-100">neofetch</span>
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1">
                  <div className="text-blue-500 hidden sm:block whitespace-pre text-xs sm:text-sm">
                    {`      z$$$$$$.
    $$$$$$$$$$
   $$$$$$$$$$$
  $$$$$$$$$$$$
 $$$$$$$$$$$$$
$$$$$$$$$$$$$$
$$$$$$"  "$$$$
"$$$"      "$$
`}                  </div>

                  <div className="space-y-1.5 text-xs sm:text-sm">
                    {systemSpecs.map((spec, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-green-400 min-w-[94px] uppercase text-[12px] tracking-wider">
                          {spec.label}
                        </span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* bio */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-100">cat bio.txt</span>
                </div>

                <div className="pl-5 text-sm text-gray-400">
                  <p className="mb-2">
                    <span className="text-orange-400">&gt; info:</span>{" "}
                    <span className="text-gray-100">{bio.split("\n")[0]}</span>
                  </p>
                  <p>{bio.split("\n").slice(1).join(" ")}</p>
                  <div className="mt-3 text-xs text-gray-500 font-mono">
                    $ echo $PHILOSOPHY — <span className="text-blue-400">&quot;Prefer simple systems that evolve.&quot;</span>
                  </div>
                </div>
              </div>

              {/* hobbies */}
              <div className="">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-100">cat hobbies.txt</span>
                </div>

                <div className="pl-5 text-sm text-gray-400">
                  <p>reading, hiking, coding, listening music</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <span className="w-2.5 h-4 bg-gray-500 animate-pulse block" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Engineering Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="h-full flex flex-col bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 shadow-2xl group">
            {/* Dashboard Header */}
            <div className="bg-[#161B22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-xs font-mono text-gray-400">Active</span>
                </div>
                <span className="text-gray-600 text-sm">|</span>
                <span className="text-xs font-mono text-white font-bold">engineering_profile.yaml</span>
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                YAML v1.2
              </div>
            </div>

            <div className="flex-1 bg-[#0D1117] p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
              <div className="space-y-4">
                {[
                  {
                    key: "principles",
                    items: ["simplicity_over_complexity", "correctness_before_optimization", "readability_over_cleverness"]
                  },
                  {
                    key: "focus_areas",
                    items: ["backend_systems", "api_design", "database_modeling", "deployment_and_operations"]
                  },
                  {
                    key: "engineering_habits",
                    items: ["write_code_for_future_self", "measure_before_scaling", "automate_repetitive_work"]
                  },
                  {
                    key: "workflow",
                    items: ["design_api_contracts", "implement_core_logic", "test_with_real_data", "deploy_and_monitor", "iterate_based_on_feedback"]
                  }
                ].map((section, idx) => (
                  <div key={idx}>
                    <div className="flex gap-2 mb-1">
                      <span className="text-blue-400">{section.key}:</span>
                    </div>
                    <div className="space-y-0.5">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex gap-3 pl-4">
                          <span className="text-orange-400">-</span>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5">
                <span className="text-green-500">$</span>
                <span className="text-gray-500">_</span>
                <span className="w-1.5 h-3 bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
