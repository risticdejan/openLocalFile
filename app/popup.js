chrome.runtime.getPlatformInfo(function (info) {
    var container = document.getElementById('container');
    var content = '';
    var title = chrome.i18n.getMessage("extension_title") || "Open local file";
    var instruction = chrome.i18n.getMessage('popup_instruction') || 'Instruction';
    var item_1 = chrome.i18n.getMessage('popup_item_1', '/host-app-src/setup.exe') || 'Download the application from this link <a href="/host-app-src/setup.exe">download setup.exe</a>';
    var item_2 = chrome.i18n.getMessage('popup_item_2') || 'Run the downloaded application (setup.exe)';
    var item_3 = chrome.i18n.getMessage('popup_item_3') || 'The extension opens the local file in the corresponding program when the link to the local file is clicked';
    var item_1_linux = chrome.i18n.getMessage('popup_item_1_linux', '/host-app-src/setup.tar.xz') || 'Download the application from this link <a href="/host-app-src/setup.tar.xz">download setup.tar.xz</a>';
    var item_2_linux = chrome.i18n.getMessage('popup_item_2_linux') || 'Unpack setup.tar.kz and move the content where it suits you and then run instal_host.sh';
    var unknown_os = chrome.i18n.getMessage('popup_unknown_os') || 'The extension is not supported on your operating system';
    // console.log(info.os);
    if (info.os === 'win') {
        content += '<h1>' + title + '</h1>';
        content += '<h3>' + instruction + ': </h3>';
        content += '<p> 1. ' + item_1 + ',</p>';
        content += '<p> 2. ' + item_2 + ',</p>';
        content += '<p> 3. ' + item_3 + '.</p>';
    } else if (info.os === 'linux') {
        content += '<h1>' + title + '</h1>';
        content += '<h3>' + instruction + ': </h3>';
        content += '<p> 1. ' + item_1_linux + ',</p>';
        content += '<p> 2. ' + item_2_linux + ',</p>';
        content += '<p> 3. ' + item_3 + '.</p>';
    } else {
        content += '<h1>' + title + '</h1>';
        consent += '<p>' + unknown_os + '.</p>';
    }
    container.innerHTML = content;
});