// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    //var url = 'info.html#' + info.srcUrl;
    var title = 'info.html#' + tab.title;
    var url = 'info.html#' + tab.url;

    // Create a new window to the info page.
    //console.log("title= "+title);
    //console.log("url= "+url);
    //alert(title+"/"+url);
    alert("stored!");

    chrome.windows.create({ url: url, width: 520, height: 660 });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id": "todoContextMenuGetPage",
  "title" : "Get this page", 
  "type" : "normal", //"normal", "checkbox", "radio", or "separator"
  "onclick" : getClickHandler(),
  "contexts": ["all"]
});