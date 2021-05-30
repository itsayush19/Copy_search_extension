let current_search_engine='';
const search_engines={
    google:"https://www.google.com/search?q=",
    duckduckgo:"https://www.duckduckgo.com/search?q=",
    bing:"https://www.bing.com/search?q="
}


chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
    if(/^http/.test(tab.url)&&changeInfo.status==='complete'){
        chrome.tabs.executeScript(tabId,{file: '/foreground.js'},()=>{
            console.log('script injected');
        })
    }
})

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if(request.message==='save_search_engine'){
        current_search_engine=request.payload;
        console.log(search_engines[current_search_engine]);
        sendResponse({message:'success'});
    }
    else if(request.message==='get_curr_engine'){
        sendResponse({
            payload:current_search_engine,
        })
    }
    else if(request.message==='search'){
        chrome.tabs.create({
            active:true,
            url:`${search_engines[current_search_engine]}${request.payload}`
        })
    }
})