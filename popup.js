import { getActiveTabURL } from "./utils.js";

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement,bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const controlsElement = document.createElement("div");
    bookmarkTitleElement.className = "bookmark-title";
    controlsElement.className = "bookmark-controls";
    bookmarkTitleElement.textContent=bookmark.desc;
    // setBookmarkAttributes("play", onPlay, controlsElement);
    // setBookmarkAttributes("delete", onDelete, controlsElement);

    const newBookmarkElement= document.createElement("div");
    newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);
  newBookmarkElement.id="bookmark-" + bookmark.time;

    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
   bookmarksElement.appendChild(newBookmarkElement);
};
const viewBookmarks = (currentVideoBookmarks) => {
const bookmarksElement=document.getElementById("bookmarks");

if (currentVideoBookmarks.length>0) {
    currentVideoBookmarks.forEach((bookmark) => {
        addNewBookmark(bookmarksElement,bookmark)
    });
} else {
    bookmarksElement.innerHTML="<i>there is not any bookmark to show</i>";
}

};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {

};

document.addEventListener("DOMContentLoaded",async () => {
    const currentTab=await getActiveTabURL();
    const queryParameters=currentTab.url.split("?")[1];
    const urlParameters=new URLSearchParams(queryParameters);
    const currentVideo=urlParameters.get("v");
if (currentTab.url && currentTab.url.includes("youtube.com/watch")) {
 chrome.storage.sync.get([currentVideo],(obj)=>{
const currentVideoBookmarks=obj[currentVideo]?JSON.parse(obj[currentVideo]):[];
viewBookmarks(currentVideoBookmarks);
    })
}else{
    const title=document.querySelector(".title");
    title.textContent="your are not in a youtube webpage"
}
   
});
