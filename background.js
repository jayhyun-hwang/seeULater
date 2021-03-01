// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
});
function getStoreClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    //var url = 'info.html#' + info.srcUrl;
    var title = tab.title;
    var url = tab.url;

    // Create a new window to the info page.
    //console.log("title= "+title);
    //console.log("url= "+url);
    //alert(title+"/"+url);
    //alert("stored!");

    chrome.storage.sync.set({title : url}, function(){
      alert('settings saved');
    });
    chrome.storage.sync.get([title], function(result){
      alert(result.id);
    })
    alert(chrome.loginState.SessionState);
    //chrome.windows.create({ url: url, width: 520, height: 660 });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id": "storePage",
  "title" : "Store this page",
  "type" : "normal", //"normal", "checkbox", "radio", or "separator"
  "onclick" : getStoreClickHandler(),
  "contexts": ["all"]
});
