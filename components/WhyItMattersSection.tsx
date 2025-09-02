import React from 'react';

const ConnectorLine = () => (
    <div className="flex-1 h-px bg-slate-700"></div>
)

const StepCircle = ({ number }: { number: string }) => (
    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-fuchsia-500 flex items-center justify-center font-bold text-fuchsia-400 text-lg shadow-lg">
        {number}
    </div>
)

export const WhyItMattersSection: React.FC = () => {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-2">Connecting Data to Dogma</h2>
      <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
        This project isn't just about data; it's about context. Here’s how the tool and the research connect to reveal a deeper truth.
      </p>

      <div className="flex items-center justify-center gap-4">
        <div className="text-center flex-1">
            <h3 className="text-xl font-bold mb-2">The Tool</h3>
            <p className="text-slate-400">Lets you analyze today’s news data in real-time.</p>
        </div>
        
        <div className="flex items-center" aria-hidden="true">
           <StepCircle number="1" />
           <ConnectorLine />
           <span className="text-4xl text-fuchsia-500 mx-4">+</span>
           <ConnectorLine />
           <StepCircle number="2" />
        </div>
        
        <div className="text-center flex-1">
            <h3 className="text-xl font-bold mb-2">The Research</h3>
            <p className="text-slate-400">Provides the scholarly foundation and historical context.</p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="mt-4 p-6 bg-slate-900/50 border border-slate-700 rounded-lg max-w-xl">
            <p className="text-2xl text-cyan-300 font-bold">
            Together, they show how MAGA functions as systemic racism, reinvented for the 21st century.
            </p>
        </div>
      </div>

    </section>
  );
};
