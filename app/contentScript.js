document.body.addEventListener('click', (evt) => {
  if (!evt.isTrusted) return;
  let target = evt.target;

  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }
  if (target) {
    const url = target.href;
    if (url.startsWith('file://')) {
      evt.preventDefault();
      try {
        chrome.runtime.sendMessage({
          method: 'openLocalFile',
          localFileUrl: url,
          target: target,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});
