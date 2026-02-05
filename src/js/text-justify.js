/**
 * 読点「、」と句点「。」のみを span で囲む（安全版）
 * - . ? は一切対象にしない
 * - script/style/code/pre/textarea 等は除外
 */

const EXCLUDE_SELECTOR =
  'script,style,textarea,code,pre,kbd,samp,noscript';

function isExcluded(node) {
  return node.closest(EXCLUDE_SELECTOR);
}

export function wrapCommaKuten(target) {
  const elements =
    typeof target === 'string'
      ? document.querySelectorAll(target)
      : target instanceof NodeList
      ? target
      : [target];

  elements.forEach((root) => {
    if (!root || root.nodeType !== 1) return;
    if (root.dataset.kutenProcessed) return;

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (isExcluded(parent)) return NodeFilter.FILTER_REJECT;
          if (
            parent.classList.contains('comma') ||
            parent.classList.contains('kuten')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!/[、。]/.test(node.nodeValue)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach((textNode) => {
      const text = textNode.nodeValue;
      const regex = /[、。]/g;
      let last = 0;
      let m;

      const frag = document.createDocumentFragment();

      while ((m = regex.exec(text)) !== null) {
        if (m.index > last) {
          frag.appendChild(
            document.createTextNode(text.slice(last, m.index))
          );
        }
        const span = document.createElement('span');
        span.className = m[0] === '、' ? 'comma' : 'kuten';
        span.textContent = m[0];
        frag.appendChild(span);
        last = regex.lastIndex;
      }

      if (last < text.length) {
        frag.appendChild(
          document.createTextNode(text.slice(last))
        );
      }

      textNode.parentNode.replaceChild(frag, textNode);
    });

    root.dataset.kutenProcessed = 'true';
  });
}

export function initCommaKuten(selector = 'body') {
  const run = () => {
    const els = document.querySelectorAll(selector);
    if (els.length) wrapCommaKuten(els);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}
