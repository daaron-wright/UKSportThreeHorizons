export function HorizonH1() {
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 800 600"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text
          x="400"
          y="30"
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fill="#e2e8f0"
        >
          Performance Hub - Foundation
        </text>

        {/* Outer border */}
        <rect
          x="80"
          y="70"
          width="640"
          height="500"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          rx="20"
        />

        {/* Authentication Module - Left */}
        <rect
          x="100"
          y="120"
          width="140"
          height="120"
          fill="#93c5fd"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="170"
          y="180"
          fontSize="16"
          fontWeight="600"
          textAnchor="middle"
          fill="#1e3a8a"
        >
          Authentication
        </text>
        <text
          x="170"
          y="200"
          fontSize="16"
          fontWeight="600"
          textAnchor="middle"
          fill="#1e3a8a"
        >
          module
        </text>

        {/* Connection line from Auth to Consent */}
        <path
          d="M 240 180 Q 280 220 240 260"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Consent Module - Left Bottom */}
        <rect
          x="100"
          y="340"
          width="140"
          height="100"
          fill="#93c5fd"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="170"
          y="390"
          fontSize="16"
          fontWeight="600"
          textAnchor="middle"
          fill="#1e3a8a"
        >
          Consent?
        </text>
        <text
          x="170"
          y="410"
          fontSize="16"
          fontWeight="600"
          textAnchor="middle"
          fill="#1e3a8a"
        >
          module
        </text>

        {/* Policy Box - Left Bottom Corner */}
        <rect
          x="100"
          y="470"
          width="140"
          height="80"
          fill="#dbeafe"
          stroke="#60a5fa"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="170"
          y="500"
          fontSize="12"
          fontWeight="500"
          textAnchor="middle"
          fill="#1e40af"
        >
          Policy and
        </text>
        <text
          x="170"
          y="516"
          fontSize="12"
          fontWeight="500"
          textAnchor="middle"
          fill="#1e40af"
        >
          Procedures
        </text>
        <text
          x="170"
          y="532"
          fontSize="12"
          fontWeight="500"
          textAnchor="middle"
          fill="#1e40af"
        >
          for data
        </text>

        {/* Main Content Area */}
        <rect
          x="280"
          y="70"
          width="440"
          height="500"
          fill="none"
          stroke="none"
          rx="20"
        />

        {/* UX/UI - Reporting Top */}
        <rect
          x="320"
          y="100"
          width="360"
          height="50"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="500"
          y="132"
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
        >
          UX/UI - Reporting
        </text>

        {/* Multi modal Data Input */}
        <rect
          x="320"
          y="180"
          width="160"
          height="80"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="400"
          y="218"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
        >
          Multi modal Data
        </text>
        <text
          x="400"
          y="238"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
        >
          Input
        </text>

        {/* LLM/SLM Powered Query */}
        <rect
          x="520"
          y="180"
          width="160"
          height="80"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="600"
          y="218"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
        >
          LLM/SLM Powered
        </text>
        <text
          x="600"
          y="238"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
        >
          Query
        </text>

        {/* Consent Module Main - Red Area */}
        <rect
          x="320"
          y="290"
          width="360"
          height="200"
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth="2"
          rx="6"
        />

        {/* Consent label */}
        <text
          x="330"
          y="310"
          fontSize="12"
          fontWeight="700"
          fill="#ffffff"
          backgroundColor="#000000"
        >
          Consent Module
        </text>

        {/* Content Inside Red Box */}
        {/* Left Column */}
        <rect
          x="340"
          y="330"
          width="130"
          height="60"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="405"
          y="365"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          fill="#1f2937"
        >
          Athlete Data
        </text>

        <rect
          x="340"
          y="410"
          width="130"
          height="60"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="405"
          y="441"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          fill="#1f2937"
        >
          Internal
        </text>
        <text
          x="405"
          y="458"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          fill="#1f2937"
        >
          Knowledge
        </text>

        {/* Right Column */}
        <rect
          x="520"
          y="330"
          width="130"
          height="60"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="585"
          y="365"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          fill="#1f2937"
        >
          RAG Retrieval
        </text>

        <rect
          x="520"
          y="410"
          width="130"
          height="60"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="585"
          y="441"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          fill="#1f2937"
        >
          Graph DB
        </text>

        {/* Integration Section */}
        <rect
          x="320"
          y="510"
          width="360"
          height="40"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="500"
          y="537"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
        >
          Integration
        </text>
      </svg>
    </div>
  );
}
