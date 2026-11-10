const CASES = [
  { name: "LiveQuiz", title: "Real-time, without a persistent server.", stack: "Next.js · DynamoDB · Lambda · WebSockets", description: "A multiplayer trivia system built on an event-driven AWS architecture.", decisions: ["A single-table DynamoDB design models rooms, players, questions, and answers with explicit partition-key patterns.", "DynamoDB Streams trigger Lambda to push state changes over WebSockets.", "Structured questions are generated and written through when a game begins."], github: "https://github.com/MEMOMG8/livequiz-app" },
  { name: "IncidentPilot", title: "From an alert to coordinated response.", stack: "TypeScript · Node.js · Slack Bolt · MCP", description: "A rule-based triage pipeline connected to incident-response tools.", decisions: ["Classify incoming alerts into four severity tiers across six services.", "Expose three MCP tools to coordinate incident channels, briefings, and escalation.", "Separate classification from operational actions so the response remains easy to inspect."], github: "https://github.com/MEMOMG8/slack-incident-response-agent" },
  { name: "PathReview", title: "Find the failure behind the failures.", stack: "Python · pytest · SQLAlchemy · unittest.mock", description: "Tracing asynchronous test failures to a shared mocking problem.", decisions: ["Traced failures to an AsyncMock-derived scalars() call returning a coroutine where a synchronous result was expected.", "Found a paginated endpoint reusing a mocked result across tests, masking count and page conflation.", "Rewrote eight tests with isolated mocks and submitted the correction as a contribution."], github: "https://github.com/MEMOMG8/pathreview" },
];

export default function EngineeringDetails() {
  return <section id="engineering" className="min-h-screen snap-start snap-always pt-24 pb-16 px-6 md:px-12 lg:px-24" aria-labelledby="engineering-title">
    <div className="max-w-6xl mx-auto">
      <span className="section-label">Engineering details</span>
      <h2 id="engineering-title" className="text-3xl md:text-4xl font-bold text-white mt-2 mb-5">Behind the code</h2>
      <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">Architecture, debugging, and the decisions that turn an idea into a working system.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {CASES.map(study => <details key={study.name} className="rounded-2xl border border-[#1E1E2E] bg-[#0F0F17] p-5 group">
          <summary className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg list-none">
            <div className="flex items-start justify-between gap-4"><h3 className="text-white font-semibold text-base">{study.name}</h3><span aria-hidden="true" className="text-indigo-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span></div>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">{study.title}</p>
            <span className="block text-indigo-400 text-xs mt-5 group-open:hidden">Read the details ↗</span>
          </summary>
          <div className="mt-5">
            <p className="font-mono text-xs text-indigo-300 leading-relaxed mb-4">{study.stack}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{study.description}</p>
            <ul className="space-y-3 text-sm text-slate-400 leading-relaxed list-disc pl-4">{study.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul>
            <a href={study.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-indigo-400 hover:text-white text-sm mt-6 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">View on GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </details>)}
      </div>
    </div>
  </section>;
}
