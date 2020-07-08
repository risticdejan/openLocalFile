'use strict';

const extensionName = chrome.runtime.getManifest().name;

const showNotification = info => {
  const iconUrl = info.iconUrl ? info.iconUrl : "images/32.png";
  const message = info.message ? info.message : "";

  chrome.notifications.create({
    type: 'basic',
    iconUrl: iconUrl,
    title: info.title,
    message: message,
  });
};


// chrome.runtime.onInstalled.addListener(function () {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'localhost' },
//           }),
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });

const notInstalled = () => {
  showNotification({
    title: chrome.i18n.getMessage("not_installed_title"),
    message: chrome.i18n.getMessage("not_installed_message"),
  });
}

const showError = () => {
  showNotification({
    title: chrome.i18n.getMessage("error_title"),
    message: chrome.i18n.getMessage("error_description"),
  });
}

const notFound = (path) => {
  showNotification({
    title: chrome.i18n.getMessage("not_found_title"),
    // message: path
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.method === 'openLocalFile') {
    const localFilePath = message.localFileUrl.replace('file://', '');
    chrome.runtime.sendNativeMessage(
      'open.local.file',
      { path: localFilePath },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log('ERROR: ' + chrome.runtime.lastError.message);
          if (chrome.runtime.lastError.message === 'Specified native messaging host not found.') {
            sendResponse({ message: 'notInstalled' });
            notInstalled();
          } else {
            sendResponse({ message: 'error' });
            showError();
          }
        } else {
          console.log('Messaging host: ', response);
          if (response === 'not found') {
            sendResponse({ message: 'notFound' });
            notFound(localFilePath);
          } else {
            sendResponse({ message: 'success' });
          }
        }
      }
    );
    return true;
  }
});
