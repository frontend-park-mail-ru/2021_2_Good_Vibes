export default function loadScript(src, async = true) {
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  document.body.append(script);
}

loadScript('./loadTemplates.js');
