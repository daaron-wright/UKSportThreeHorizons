import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HorizonH1 } from "@/components/dashboard/HorizonH1";
import { HorizonH2 } from "@/components/dashboard/HorizonH2";
import { HorizonH3 } from "@/components/dashboard/HorizonH3";

export default function Index() {
  const [activeHorizon, setActiveHorizon] = useState("h1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Three Horizons Framework
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Explore the evolution of our architecture across three strategic horizons
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeHorizon}
          onValueChange={setActiveHorizon}
          className="w-full"
        >
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-700/50 p-1">
              <TabsTrigger
                value="h1"
                className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <span className="font-semibold">Horizon 1</span>
              </TabsTrigger>
              <TabsTrigger
                value="h2"
                className="rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <span className="font-semibold">Horizon 2</span>
              </TabsTrigger>
              <TabsTrigger
                value="h3"
                className="rounded-md data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
              >
                <span className="font-semibold">Horizon 3</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Horizon 1 */}
          <TabsContent value="h1" className="animate-fade-in">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Horizon 1: Core Foundation
                </h2>
                <p className="mt-2 text-slate-400">
                  Essential components and infrastructure for immediate value delivery
                </p>
              </div>
              <HorizonH1 />
            </div>
          </TabsContent>

          {/* Horizon 2 */}
          <TabsContent value="h2" className="animate-fade-in">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Horizon 2: Expansion
                </h2>
                <p className="mt-2 text-slate-400">
                  Growing capabilities with enhanced integration and advanced features
                </p>
              </div>
              <HorizonH2 />
            </div>
          </TabsContent>

          {/* Horizon 3 */}
          <TabsContent value="h3" className="animate-fade-in">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Horizon 3: Transformation
                </h2>
                <p className="mt-2 text-slate-400">
                  Full ecosystem integration with advanced analytics and autonomous systems
                </p>
              </div>
              <HorizonH3 />
            </div>
          </TabsContent>
        </Tabs>

        {/* Timeline Info */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
            <h3 className="text-lg font-semibold text-blue-300">H1: Now</h3>
            <p className="mt-2 text-sm text-slate-300">
              Current state with authentication and basic consent handling
            </p>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6">
            <h3 className="text-lg font-semibold text-purple-300">H2: 6-12 Months</h3>
            <p className="mt-2 text-sm text-slate-300">
              Expanded capabilities with multi-modal input and RAG systems
            </p>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-6">
            <h3 className="text-lg font-semibold text-cyan-300">H3: 1+ Years</h3>
            <p className="mt-2 text-sm text-slate-300">
              Full transformation with advanced AI and complete integration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
