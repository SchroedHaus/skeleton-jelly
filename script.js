document.addEventListener('DOMContentLoaded', function() {
  const span = (text, index) => {
    const node = document.createElement('span');

    node.textContent = text;
    node.style.setProperty('--index', index);

    return node;
  };

  const byLetter = text => [...text].map((char, index) => span(char, index));

  const byWord = text => text.split(' ').map((word, index) => span(word, index));

  const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');

  if (motionOK) {
    const splitTargets = document.querySelectorAll('[split-by]');

    splitTargets.forEach(node => {
      const type = node.getAttribute('split-by');
      let nodes = null;

      if (type === 'letter') {
        nodes = byLetter(node.innerText);
      } else if (type === 'word') {
        nodes = byWord(node.innerText);
      }

      if (nodes) {
        node.firstChild.replaceWith(...nodes);
      }
    });
  }
});


