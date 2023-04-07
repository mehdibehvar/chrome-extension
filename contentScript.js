/**
 * by this fun when doc load
 */
(()=>{
    let youtubeLeftControls, youtubePlayer;
    let currentVideo='';
    let currentVideoBookmarks=[];
/**
 * Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
 * The callback parameter looks like:
(message: any, sender: MessageSender, sendResponse: function) => boolean | undefined
 */

chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    const {type,value,videoId}=message;
    if(type=="new"){
        currentVideo=videoId;
        newVideoLoaded();
    };
});
const fetchNewVideoBookmarks=async ()=>{
    return new Promise((resolve)=>{
        chrome.storage.sync.get([currentVideo],(obj)=>{
            resolve(obj[currentVideo]?JSON.parse(obj[currentVideo]):[]);
        });
    })
}
const newVideoLoaded=async ()=>{
    const bookmarkButtonExist=document.getElementsByClassName("bookmark-btn")[0];
    if(!bookmarkButtonExist){
        const bookmarkButton=document.createElement("img");
        currentVideoBookmarks=await fetchNewVideoBookmarks();
        ///Converts a relative path within an app/extension install directory to a fully-qualified URL.
        bookmarkButton.src=chrome.runtime.getURL("assets/bookmark.png");
        bookmarkButton.className='typ-button '+"bookmark-btn"
        bookmarkButton.title="add timestamp to bookmark extention";
        youtubeLeftControls=document.querySelector(".ytp-left-controls");
        youtubePlayer=document.getElementsByClassName("video-stream")[0];
        youtubeLeftControls.appendChild(bookmarkButton);
        bookmarkButton.addEventListener("click",addNewBookmarkEventHandler)
    };
};
const addNewBookmarkEventHandler=async ()=>{
    const currentTime=youtubePlayer.currentTime;
    const newBookmark={
        time:currentTime,
        desc:"timestamp at: " + getTime(currentTime)
    }
    currentVideoBookmarks=await fetchNewVideoBookmarks();
    chrome.storage.sync.set({
        [currentVideo]:JSON.stringify([...currentVideoBookmarks,newBookmark].sort((a,b)=>a.time-b.time))
    });
  
};
})();
const getTime=(t)=>{
    const date=new Date(0);
    ///The setSeconds() method sets the seconds for a specified date according to local time.
    date.setSeconds(t);
return date.toISOString().slice(14,23);
}