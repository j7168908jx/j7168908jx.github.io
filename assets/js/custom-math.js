window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    processEscapes: true,
    processEnvironments: true,
    tags: 'ams', // auto-numbering for equations
    macros: {
      ket: ['\\left\\vert #1 \\right\\rangle', 1],
      bra: ['\\left\\langle #1 \\right\\vert', 1],
      braket: ['\\left\\langle #1 \\right\\rangle', 1]
    }

  },
  options: {
    renderActions: {
      addMenu: [] // disable the MathJax right-click menu if desired
    }
  },
  svg: {
    scale: 0.8, // 80%
    linebreaks: { automatic: true }
  },
  chtml: {
    scale: 0.8,
    linebreaks: { automatic: true }
  },
  loader: {
    load: [
      '[tex]/ams',
      '[tex]/autoload',
      '[tex]/color',
      '[tex]/noerrors',
      '[tex]/noundefined'
    ]
  }
};
