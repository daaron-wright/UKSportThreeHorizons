export function HorizonH2() {
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 800 650"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text
          x="400"
          y="30"
          style={{ fontSize: "24px", fontWeight: "bold" }}
          textAnchor="middle"
          fill="#e2e8f0"
        >
          Performance Hub - Growth Phase
        </text>

        {/* Outer border */}
        <rect
          x="60"
          y="60"
          width="680"
          height="570"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          rx="20"
        />

        {/* Left Column - Expanded */}
        <rect
          x="80"
          y="100"
          width="150"
          height="140"
          fill="#93c5fd"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="155"
          y="160"
          style={{ fontSize: "14px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1e3a8a"
        >
          Authentication
        </text>
        <text
          x="155"
          y="180"
          style={{ fontSize: "14px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1e3a8a"
        >
          module
        </text>

        {/* Connection */}
        <path
          d="M 230 170 Q 260 200 230 240"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Consent Module */}
        <rect
          x="80"
          y="270"
          width="150"
          height="120"
          fill="#93c5fd"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="155"
          y="320"
          style={{ fontSize: "14px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1e3a8a"
        >
          Consent?
        </text>
        <text
          x="155"
          y="340"
          style={{ fontSize: "14px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1e3a8a"
        >
          module
        </text>

        {/* Policy */}
        <rect
          x="80"
          y="420"
          width="150"
          height="100"
          fill="#dbeafe"
          stroke="#60a5fa"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="155"
          y="455"
          style={{ fontSize: "11px", fontWeight: "500" }}
          textAnchor="middle"
          fill="#1e40af"
        >
          Policy and
        </text>
        <text
          x="155"
          y="471"
          style={{ fontSize: "11px", fontWeight: "500" }}
          textAnchor="middle"
          fill="#1e40af"
        >
          Procedures
        </text>
        <text
          x="155"
          y="487"
          style={{ fontSize: "11px", fontWeight: "500" }}
          textAnchor="middle"
          fill="#1e40af"
        >
          for data
        </text>

        {/* Main Content Area */}

        {/* UX/UI - Reporting */}
        <rect
          x="280"
          y="100"
          width="420"
          height="60"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="490"
          y="135"
          style={{ fontSize: "18px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#ffffff"
        >
          UX/UI - Reporting &amp; Advanced Analytics
        </text>

        {/* Second Row */}
        <rect
          x="280"
          y="190"
          width="200"
          height="80"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="380"
          y="228"
          style={{ fontSize: "13px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#ffffff"
        >
          Multi modal Data
        </text>
        <text
          x="380"
          y="248"
          style={{ fontSize: "13px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#ffffff"
        >
          Input
        </text>

        <rect
          x="500"
          y="190"
          width="200"
          height="80"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="600"
          y="228"
          style={{ fontSize: "13px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#ffffff"
        >
          LLM/SLM Powered
        </text>
        <text
          x="600"
          y="248"
          style={{ fontSize: "13px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#ffffff"
        >
          Query
        </text>

        {/* Consent Module Main - Red Area - Larger */}
        <rect
          x="280"
          y="300"
          width="420"
          height="180"
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth="2"
          rx="6"
        />

        {/* Consent label */}
        <text
          x="290"
          y="320"
          style={{ fontSize: "12px", fontWeight: "700" }}
          fill="#ffffff"
        >
          Consent Module + Data Processing
        </text>

        {/* Grid inside */}
        <rect
          x="300"
          y="335"
          width="95"
          height="55"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="347.5"
          y="365"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          Athlete Data
        </text>

        <rect
          x="415"
          y="335"
          width="95"
          height="55"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="462.5"
          y="365"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          RAG Retrieval
        </text>

        <rect
          x="530"
          y="335"
          width="95"
          height="55"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="577.5"
          y="365"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          Vector Store
        </text>

        {/* Second row inside */}
        <rect
          x="300"
          y="410"
          width="95"
          height="55"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="347.5"
          y="435"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          Internal
        </text>
        <text
          x="347.5"
          y="450"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          Knowledge
        </text>

        <rect
          x="415"
          y="410"
          width="95"
          height="55"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="462.5"
          y="435"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          Graph DB
        </text>

        <rect
          x="530"
          y="410"
          width="95"
          height="55"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="577.5"
          y="435"
          style={{ fontSize: "11px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          RAG Ingestion
        </text>

        {/* Integration Section */}
        <rect
          x="280"
          y="510"
          width="420"
          height="50"
          fill="#9ca3af"
          stroke="#6b7280"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="490"
          y="542"
          style={{ fontSize: "14px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#ffffff"
        >
          Integration &amp; External APIs
        </text>

        {/* Data Sources */}
        <rect
          x="280"
          y="580"
          width="420"
          height="40"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="490"
          y="605"
          style={{ fontSize: "12px", fontWeight: "600" }}
          textAnchor="middle"
          fill="#1f2937"
        >
          3rd Party data sources &amp; Competition Analysis
        </text>
      </svg>
    </div>
  );
}
