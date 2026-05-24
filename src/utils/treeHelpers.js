export const flattenTree = (nodes, expanded, depth = 0) => {
  let result = [];

  for (const node of nodes) {
    result.push({ node, depth });

    if (node.type === "folder" && expanded.has(node.id)) {
      result = result.concat(flattenTree(node.children || [], expanded, depth + 1));
    }
  }

  return result;
};

export const findParentMap = (nodes, parent = null, map = {}) => {
  for (const node of nodes) {
    map[node.id] = parent;

    if (node.children) {
      findParentMap(node.children, node.id, map);
    }
  }
  return map;
};