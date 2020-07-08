document.body.addEventListener('click', (evt) => {
  if (!evt.isTrusted) return;
  let target = evt.target;

  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }
  if (target) {
    const url = decodeURIComponent(target.href);
    console.log(url);
    if (url.startsWith('file://')) {
      evt.preventDefault();
      try {
        chrome.runtime.sendMessage({
          method: 'openLocalFile',
          localFileUrl: url,
          target: target,
        }, function (res) {
          const message = res.message;
          if (message === 'notInstalled') {
            console.error(chrome.i18n.getMessage("not_installed_title"));
          } else if (message === 'notFound') {
            console.error(chrome.i18n.getMessage("not_found_title"));
          } else if (message === 'error') {
            console.error('Native messaging error');
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});
