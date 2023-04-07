///
// Use the chrome.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.///
/**
 * chrome.tabs.onUpdated.addListener(
  callback: function,
)
Fired when a tab is updated.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
if(tab.url,tab.url.includes("youtube.com/watch")){
  const queryParameters=tab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  /**
   * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
   */
  chrome.tabs.sendMessage(tabId,{
    type:"new",
    videoId: urlParameters.get("v"),
  },()=>{
    console.log('THE OPTIONAL CALLBACK IS RUNIING');
  })
}
})
  