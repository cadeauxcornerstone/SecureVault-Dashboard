export default function PropertiesPanel({ selected }) {
  if (!selected) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <div className="text-3xl mb-2 opacity-30">📄</div>
        <div className="text-sm">No file selected</div>
        <div className="text-xs opacity-60 mt-1">
          Select a file to view details
        </div>
      </div>
    );
  }

  const isFolder = selected.type === "folder";

  return (
    <div className="h-full p-4 space-y-4 text-sm">

      {/* HEADER */}
      <div className="border-b border-[#2B3957] pb-3">
        <div className="text-xs text-gray-400 uppercase tracking-wider">
          Inspector
        </div>

        <div className="text-white font-medium mt-1 truncate">
          {selected.name}
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-2">
        <SectionTitle title="Basic Info" />

        <InfoRow label="Name" value={selected.name} />
        <InfoRow label="Type" value={selected.type} />

        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span
            className={`
              text-xs px-2 py-0.5 rounded
              ${isFolder ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"}
            `}
          >
            {isFolder ? "FOLDER" : "FILE"}
          </span>
        </div>
      </div>

      {/* FILE DETAILS */}
      {!isFolder && (
        <div className="space-y-2">
          <SectionTitle title="File Details" />

          <InfoRow label="Size" value={selected.size || "—"} />
          <InfoRow label="Extension" value={getExt(selected.name)} />
        </div>
      )}

      {/* SECURITY */}
      <div className="space-y-2">
        <SectionTitle title="Security" />

        <InfoRow label="Encryption" value="AES-256-GCM" />
        <InfoRow label="Access Level" value="READ / WRITE" />
        <InfoRow label="Integrity" value="VERIFIED" />
      </div>

      {/* ACTIONS */}
      {!isFolder && (
        <button className="w-full mt-4 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs py-2 rounded transition">
          Download File
        </button>
      )}
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function SectionTitle({ title }) {
  return (
    <div className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-[#2B3957] pb-1">
      {title}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-200 truncate max-w-[140px] text-right">
        {value || "—"}
      </span>
    </div>
  );
}

function getExt(name = "") {
  if (!name.includes(".")) return "—";
  return name.split(".").pop();
}