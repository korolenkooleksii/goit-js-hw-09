!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",a),e.addEventListener("click",a);var n=null;function a(){var a=d();t.disabled?(clearInterval(n),t.disabled=!1,e.disabled=!0):(n=setInterval((function(){a=d(),document.body.style.backgroundColor=a}),1e3),t.disabled=!0,e.disabled=!1)}function d(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}e.disabled=!0}();
//# sourceMappingURL=01-color-switcher.076361d9.js.map
