const define = {
  URL: "https://www.seeulater.site",
  id: "storePage",
  title: "Store this page",
  // URL : "http://127.0.0.1",
  // id: "storePage_dev",
  // title: "Store this page_dev",
  PORT: 80
};
//----------------------------------------set mode-----------------------------------------------

// const baseUrl = "http://www.seeulater.site";
const baseUrl = define.URL // + ':' + define.PORT;
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
    // //object 확인
    // // alert(JSON.stringify(tab));
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
  req.timeout = 5000

  console.log(req.HEADERS_RECEIVED)
  // console.log(req.getAllResponseHeaders())
  // console.log(req.getResponseHeader())
  try {
    req.send(JSON.stringify({
      url: url,
      iconImg: iconImg,
      title: title
    }));
  } catch (error) {
    alert("2 Please change the extension’s site access to [On all sites].")
    return
  }

  req.onreadystatechange = function () { // Call a function when the state changes.
    // if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    if (this.readyState === XMLHttpRequest.DONE) {
      switch (this.status) {
        case 200:
          alert("Store Success!\ntitle: " + title);
          break;
        case 401:
          if (window.confirm('Please Login first. Do you want to go to SeeULater main page?\n\n Go to SeeULater')) {
            window.open('https://www.seeulater.site', '_blank', 'noopener, noreferrer')
          }
          break;
        default:
          alert("Please try a minute later. : " + this.status)
          break;
      }
    }
  }
}