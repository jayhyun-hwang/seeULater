const define = {
  URL: "http://localhost",
  id: "storePage_DEV",
  title: "Store this page_DEV",
  // URL : "http://127.0.0.1",
  // id: "storePage_dev",
  // title: "Store this page_dev",
  PORT: 80
};
//----------------------------------------set mode-----------------------------------------------

const baseUrl = define.URL // + ':' + define.PORT;
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getStoreClickHandler() {
  return function (info, tab) {

    submitPostUrls(tab);
  };
};
/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id": define.id,
  "title": define.title,
  "type": "normal", //"normal", "checkbox", "radio", or "separator"
  "contexts": ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === define.id) {
    getStoreClickHandler()(info, tab);
  }
});

chrome.commands.onCommand.addListener(function (command, tab) {
  console.log('onCommand event received for message: ', command);
  if (command == "store_page") {
    console.log('in', command);

    submitPostUrls(tab);
  }
});

function submitPostUrls(tab) {
  let tabTitle = "";
  if (tab.title) {
    tabTitle = tab.title.substring(0, 100);
  }
  chrome.tabs.sendMessage(tab.id, { type: 'getTitlePrompt', tabTitle }, function(response) {
    let promptTitle = response && response.promptTitle;
    //cancel
    if (promptTitle === null) {
      return;
    }
    //trim
    if (promptTitle) {
      promptTitle = promptTitle.trim();
    }
    let inputTitle;
    //check valid and length
    if (!promptTitle) {
      inputTitle = tab.title;
    } else {
      if (promptTitle.length > 100) {
        chrome.tabs.sendMessage(tab.id, { type: 'alert', message: 'Enter the title within 100 characters.\nPlease try again.' });
        return;
      }
      inputTitle = promptTitle;
    }

    const title = inputTitle;
    const url = tab.url;
    const iconImg = tab.favIconUrl;

    fetch(baseUrl + "/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url,
        iconImg: iconImg,
        title: title
      })
    })
    .then(async (response) => {
      if (response.status === 200) {
        chrome.tabs.sendMessage(tab.id, { type: 'alert', message: 'Store Success!\ntitle: ' + title });
      } else if (response.status === 401) {
        chrome.tabs.sendMessage(tab.id, { type: 'confirm', message: 'Please Login first. Do you want to go to SeeULater main page?\n\n Go to SeeULater' }, function(resp) {
          if (resp && resp.confirmed) {
            chrome.tabs.create({ url: baseUrl });
          }
        });
      } else {
        chrome.tabs.sendMessage(tab.id, { type: 'alert', message: 'Please try a minute later. : ' + response.status });
      }
    })
    .catch((error) => {
      console.log("fetch error!!", error);
      chrome.tabs.sendMessage(tab.id, { type: 'alert', message: 'request failed or Please change the extension’s site access to [On all sites].' });
    });
  });
}