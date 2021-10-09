// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
chrome.commands.onCommand.addListener(function (command) {
  console.log('onCommand event received for message: ', command);
});
function getStoreClickHandler() {
  return function (info, tab) {

    // The srcUrl property is only available for image elements.
    //var url = 'info.html#' + info.srcUrl;
    const title = tab.title;
    const url = tab.url;
    const icon = tab.favIconUrl;

    //object 확인
    // alert(JSON.stringify(tab));

    // var params = {
    //   userID: 1,
    //   url: url
    // }

    var req = new XMLHttpRequest();
    var baseUrl = "http://3.36.36.62:3001/urls";
    // var params = "url=" + url;

    // req.open("GET", baseUrl + params, true);
    // req.send();
    req.open("POST", baseUrl, true);
    // req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-type", "application/json");
    // alert(req);
    // alert(JSON.stringify(req));
    req.send(JSON.stringify({ userID: 1, url: url }));
    // req.send("userID=1&url=" + url);
    
    req.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert("Got response 200!");
      }
    }
    // var urlParams = "userID=1&url=" + url;

    // var data = new FormData();
    // data.append('userID', 1);
    // data.append('url', url);
    // req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // req.send(JSON.stringify({ userID: 1, url: url }));


    // Create a new window to the info page.
    // console.log("title= " + title);
    // console.log("url= " + url);

    // alert(title + "/" + url);
    // alert("stored!");

    // chrome.storage.sync.set({ title: url }, function () {
    //   alert('settings saved' + url);
    // });

    //chrome.storage.sync.get([title], function(result){
    //  alert(result.id);
    //})
    // alert(chrome.loginState.SessionState);
    //chrome.windows.create({ url: url, width: 520, height: 660 });
  };
};
/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id": "storePage",
  "title": "Store this page",
  "type": "normal", //"normal", "checkbox", "radio", or "separator"
  "onclick": getStoreClickHandler(),
  "contexts": ["all"]
});
