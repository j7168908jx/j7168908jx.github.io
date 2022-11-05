MathJax.Hub.Config({
  extensions: ["tex2jax.js"],
  tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true,
      processRefs: true,
      processEnvironments: true
  },
  TeX: {
    equationNumbers: { autoNumber: "AMS" },
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js", "color.js","autoload-all.js"]
  },
  "HTML-CSS": {
    scale: 80, linebreaks: { automatic: true }
  },

});

MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
    MathJax.InputJax.TeX.Definitions.Add({
        macros: {
            ket: ["Macro", "{\\left\\vert #1 \\right\\rangle}", 1],
            bra: ["Macro", "{\\left\\langle #1 \\right\\vert}", 1],
            braket: ["Macro", "{\\left\\langle #1 \\right\\rangle}", 1],
        }
    });
});

MathJax.Ajax.loadComplete("/assets/js/custom-math.js");

