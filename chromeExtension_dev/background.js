const define = {
  // URL: "http://3.36.36.62",
  // id: "storePage",
  // title: "Store this page",
  URL : "http://127.0.0.1",
  id: "storePage_dev",
  title: "Store this page_dev",
  PORT: 80
};
//----------------------------------------set mode-----------------------------------------------

// const baseUrl = "http://3.36.36.62:3001";
const baseUrl = define.URL + ':' + define.PORT;
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getStoreClickHandler() {
  return function (info, tab) {

    // The srcUrl property is only available for image elements.
    //var url = 'info.html#' + info.srcUrl;
    submitPostUrls(tab);
    // //object 확인
    // // alert(JSON.stringify(tab));
  };
};
/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id": define.id,
  "title": define.title,
  "type": "normal", //"normal", "checkbox", "radio", or "separator"
  "onclick": getStoreClickHandler(),
  "contexts": ["all"]
});

chrome.commands.onCommand.addListener(function (command, tab) {
  console.log('onCommand event received for message: ', command);
  if (command == "store_page") {
    console.log('in', command);

    submitPostUrls(tab);
  }
});

function submitPostUrls(tab) {
  
  let req = new XMLHttpRequest();

  const title = tab.title;
  const url = tab.url;
  const iconImg = tab.favIconUrl;

  req.open("POST", baseUrl + "/urls", true);
  req.setRequestHeader("Content-type", "application/json");
  req.send(JSON.stringify({
    url: url,
    iconImg: iconImg,
    title: title
  }));

  req.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      alert("Got response 200!");
    }
  }
}