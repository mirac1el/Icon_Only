chrome.action.onClicked.addListener(() => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    function traverseBookmarks(bookmarks) {
      for (let bookmark of bookmarks) {
        if (bookmark.children) {
          traverseBookmarks(bookmark.children);
        } else {
          if (bookmark.parentId === '1') {  // '1' is typically the id for the bookmarks bar
            chrome.bookmarks.update(bookmark.id, { title: '' });
          }
        }
      }
    }
    traverseBookmarks(bookmarkTreeNodes);
    
    // 添加消息通知
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Icon Only',
      message: '已完成！'
    });
  });
});
