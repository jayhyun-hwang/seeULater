chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTitlePrompt') {
    const tabTitle = message.tabTitle || '';
    let promptTitle = prompt('Enter title (within 100 characters)', tabTitle);
    sendResponse({ promptTitle });
    return true;
  }
  if (message.type === 'alert') {
    alert(message.message);
  }
  if (message.type === 'confirm') {
    const confirmed = window.confirm(message.message);
    sendResponse({ confirmed });
    return true;
  }
});
