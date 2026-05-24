import { useEffect } from "react";

export default function TreeNode({
  node,
  level,
  expanded,
  setExpanded,
  selected,
  setSelected,
  focusedId,
  setFocusedId,
  treeActive,
}) {
  const isFolder = node.type === "folder";

  const isExpanded = expanded.includes(node.id);
  const isSelected = selected?.id === node.id;
  const isFocused = focusedId === node.id;

  function handleClick(e) {
    e.stopPropagation();
    
    setFocusedId(node.id);

    if (isFolder) {
      setExpanded((prev) =>
        prev.includes(node.id)
          ? prev.filter((id) => id !== node.id)
          : [...prev, node.id]
      );
    } else {
      setSelected(node);
    }
  }

  //  ONLY SHOW FOCUS WHEN TREE IS ACTIVE (VS CODE BEHAVIOR)
  const showFocus = isFocused && treeActive;

  return (
    <div>
      <div
        id={node.id}
        onClick={handleClick}
        style={{ marginLeft: `${level * 20}px` }}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          cursor-pointer

          hover:bg-blue-500/10

          ${isSelected
            ? "bg-blue-500/15 border border-blue-500/40"
            : ""}

          ${showFocus
            ? "bg-blue-400/5 border border-blue-300/20"
            : ""}
        `}
      >
        <span>
          {isFolder ? (isExpanded ? "📂" : "📁") : "📄"}
        </span>
        

        <span className="text-sm text-gray-200">
          {node.name}
        </span>
      </div>
         
      {isFolder &&
        isExpanded &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
            expanded={expanded}
            setExpanded={setExpanded}
            selected={selected}
            setSelected={setSelected}
            focusedId={focusedId}
            setFocusedId={setFocusedId}
            treeActive={treeActive}
          />
        ))}
    </div>
  );
}