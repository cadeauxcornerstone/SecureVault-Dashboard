import data from "../data/data.js";
import TreeNode from "./TreeNode";
import { useMemo, useEffect } from "react";

/*  FLATTEN VISIBLE NODES */
function getVisibleNodes(nodes, expanded) {
  const result = [];

  function walk(list) {
    for (const node of list) {
      result.push(node);

      if (
        node.type === "folder" &&
        expanded.includes(node.id) &&
        node.children
      ) {
        walk(node.children);
      }
    }
  }

  walk(nodes);
  return result;
}

/*  FIND PARENT (for ArrowLeft navigation) */
function findParent(nodes, targetId, parent = null) {
  for (const node of nodes) {
    if (node.id === targetId) return parent;

    if (node.type === "folder" && node.children) {
      const found = findParent(node.children, targetId, node);
      if (found) return found;
    }
  }
  return null;
}

export default function FileTree({
  expanded,
  setExpanded,
  selected,
  setSelected,
  focusedId,
  setFocusedId,
  searchTerm,
  treeActive,
}) {
  const visibleNodes = useMemo(() => {
    return getVisibleNodes(data, expanded);
  }, [expanded]);

  /*  AUTO FOCUS FIRST ITEM */
  useEffect(() => {
    if (!focusedId && visibleNodes.length > 0) {
      setFocusedId(visibleNodes[0].id);
    }
  }, [visibleNodes]);

  /*  KEYBOARD HANDLER */
  useEffect(() => {
    function onKeyDown(e) {
      if (!treeActive) return;

      const index = visibleNodes.findIndex(
        (n) => n.id === focusedId
      );

      const current = visibleNodes[index];
      if (!current) return;

      /* DOWN */
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = visibleNodes[index + 1];
        if (next) setFocusedId(next.id);
      }

      /* UP */
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = visibleNodes[index - 1];
        if (prev) setFocusedId(prev.id);
      }

      /* RIGHT (expand folder) */
      if (e.key === "ArrowRight") {
        e.preventDefault();

        if (current.type === "folder") {
          setExpanded((prev) =>
            prev.includes(current.id)
              ? prev
              : [...prev, current.id]
          );
        }
      }

      /* ⬅ LEFT (collapse or go to parent) */
      if (e.key === "ArrowLeft") {
        e.preventDefault();

        if (
          current.type === "folder" &&
          expanded.includes(current.id)
        ) {
          // collapse folder
          setExpanded((prev) =>
            prev.filter((id) => id !== current.id)
          );
        } else {
          // go to parent folder
          const parent = findParent(data, current.id);
          if (parent) setFocusedId(parent.id);
        }
      }

      /* ENTER */
      if (e.key === "Enter") {
        e.preventDefault();

        if (current.type === "folder") {
          setExpanded((prev) =>
            prev.includes(current.id)
              ? prev.filter((id) => id !== current.id)
              : [...prev, current.id]
          );
        } else {
          setSelected(current);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [visibleNodes, focusedId, treeActive]);

  return (
    <div className="p-2">
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={0}
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