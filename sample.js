// A generic onclick callback function.

//function genericOnClick(info, tab) {
//   alert("item " + info.menuItemId + " was clicked");
//   alert("info: " + JSON.stringify(info));
//   alert("tab: " + JSON.stringify(tab));
// }

chrome.browserAction.onClicked.addListener(openReversoContext);

function openReversoContext() {
    chrome.tabs.create({url: 'http://context.reverso.net'});
}

function translateSelection(info) {
    var text = info.selectionText;
    var formatedText = text.replace(/ /g, "+");
    chrome.tabs.create({url: 'http://context.reverso.net/перевод/английский-русский/'+formatedText});
    // alert(formatedText);
}

// Create one test item for each context type.
var contexts = ["page","selection"];
var titles = ["Open Reverso Context", "Translate selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = titles[i];
  if (context == "page") {
      var id = chrome.contextMenus.create({"title": title,
                                           "contexts":[context],
                                           "onclick": openReversoContext});
  } else if (context == "selection") {
        var id = chrome.contextMenus.create({"title": title,
                                             "contexts":[context],
                                             "onclick": translateSelection});
  }
}




// Intentionally create an invalid item, to show off error checking in the
// create callback.
console.log("About to try creating an invalid item - an error about " +
            "item 999 should show up");
chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
  if (chrome.extension.lastError) {
    console.log("Got expected error: " + chrome.extension.lastError.message);
  }
});
