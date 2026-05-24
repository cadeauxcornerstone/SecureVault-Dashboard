import { useState } from "react";
import FileTree from "./components/FileTree";
import PropertiesPanel from "./components/PropertiesPanel";

export default function App() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 controls whether tree shows focus highlight
  const [treeActive, setTreeActive] = useState(true);

  return (
    <div className="flex h-screen bg-[#0B1020] text-white">

      {/* LEFT PANEL */}
      <div className="w-[320px] border-r border-[#1E2E4A] flex flex-col">

        {/* SEARCH */}
        <div className="p-4 border-b border-[#1E2E4A]">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111827] border border-[#1E2E4A] rounded-xl px-4 py-2"
          />
        </div>

        {/* TREE */}
        <div className="flex-1 overflow-y-auto">
          <FileTree
            expanded={expanded}
            setExpanded={setExpanded}
            selected={selected}
            setSelected={setSelected}
            focusedId={focusedId}
            setFocusedId={setFocusedId}
            searchTerm={searchTerm}
            treeActive={treeActive}
            setTreeActive={setTreeActive}
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center">
        {!selected ? (
          <div className="text-gray-500">Select a file</div>
        ) : (
          <div className="bg-[#111827] p-8 rounded-2xl border border-[#1E2E4A]">
            <h1 className="text-2xl font-bold mb-2">
              {selected.name}
            </h1>
            <p className="text-gray-400">
              Type: {selected.type}
            </p>
            {selected.size && (
              <p className="text-gray-400">
                Size: {selected.size}
              </p>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[320px] border-l border-[#1E2E4A]">
        <PropertiesPanel selected={selected} />
      </div>

    </div>
  );
}