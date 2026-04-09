const { naturalCompare } = require("./filetreeUtils");

/**
 * Parse a wiki-link string like "[[Name]]" or "[[Name|Alias]]" and return the note name.
 * Returns null if the string doesn't match wiki-link syntax.
 */
function parseWikiLink(link) {
  const match = link.match(/^\[\[([^\]|]+)(?:\|[^\]]+)?\]\]$/);
  return match ? match[1].trim() : null;
}

/**
 * Extract the first parent name from a note's `up` property.
 * `up` can be a string ("[[X]]") or an array (["[[X]]"]).
 * Returns null if no valid parent is found.
 */
function getFirstParentName(up) {
  if (!up) return null;
  const raw = Array.isArray(up) ? up[0] : up;
  if (typeof raw !== "string") return null;
  return parseWikiLink(raw);
}

/**
 * Build a tree of notes from their `up` (parent) relationships.
 * Returns an array of root nodes, each with nested children.
 */
function getNoteTree(data) {
  const notes = data.collections.note || [];

  // Phase 1: Index all notes by title
  const nodesByTitle = new Map();
  const allNodes = [];

  for (const note of notes) {
    const isHome =
      note.data.tags && note.data.tags.indexOf("gardenEntry") !== -1;
    if (isHome) continue;

    const title = note.data.title || note.fileSlug;
    const noteIcon = note.data.noteIcon || process.env.NOTE_ICON_DEFAULT;
    const permalink = note.data.permalink || "/";
    const props = note.data["dg-note-properties"] || {};
    const parentName = getFirstParentName(props.up);

    const hideInTree = !!props.hideInTree;

    const node = {
      name: title,
      permalink,
      noteIcon,
      parentName,
      hideInTree,
      children: [],
    };

    allNodes.push(node);

    // Index by title — first note with a given title wins
    if (!nodesByTitle.has(title)) {
      nodesByTitle.set(title, node);
    }
  }

  // Phase 2: Link children to parents
  const roots = [];

  for (const node of allNodes) {
    if (node.parentName && nodesByTitle.has(node.parentName)) {
      const parent = nodesByTitle.get(node.parentName);
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // Phase 3: Detect cycles — any node reachable from itself is broken out to roots
  const visited = new Set();
  const inStack = new Set();

  function detectCycles(node) {
    if (inStack.has(node)) {
      console.warn(`[noteTree] Cycle detected at "${node.name}", breaking link`);
      return true;
    }
    if (visited.has(node)) return false;

    visited.add(node);
    inStack.add(node);

    node.children = node.children.filter((child) => {
      if (detectCycles(child)) {
        roots.push(child);
        return false;
      }
      return true;
    });

    inStack.delete(node);
    return false;
  }

  for (const root of [...roots]) {
    detectCycles(root);
  }

  // Phase 4: Remove hidden nodes, promoting their children to the parent level
  function promoteChildren(nodes) {
    const result = [];
    for (const node of nodes) {
      node.children = promoteChildren(node.children);
      if (node.hideInTree) {
        result.push(...node.children);
      } else {
        result.push(node);
      }
    }
    return result;
  }

  const visibleRoots = promoteChildren(roots);
  roots.length = 0;
  roots.push(...visibleRoots);

  // Phase 5: Sort children recursively
  function sortNodes(nodes) {
    nodes.sort((a, b) => {
      // Nodes with children (branches) come before leaves
      const aHasChildren = a.children.length > 0;
      const bHasChildren = b.children.length > 0;
      if (aHasChildren && !bHasChildren) return -1;
      if (!aHasChildren && bHasChildren) return 1;
      return naturalCompare(a.name, b.name);
    });
    for (const node of nodes) {
      if (node.children.length > 0) {
        sortNodes(node.children);
      }
    }
  }

  sortNodes(roots);

  console.log(`[noteTree] Built tree: ${roots.length} roots, ${allNodes.length} total notes`);

  return roots;
}

function userComputed(data) {
  return {
    noteTree: getNoteTree(data),
  };
}

exports.userComputed = userComputed;
