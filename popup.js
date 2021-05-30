chrome.runtime.sendMessage({message:'get_curr_engine'},response=>{
    document.querySelectorAll('option').forEach(Option=>{
        if(response.payload===Option.value){
            document.querySelector('#search_engine').value=response.payload;
            document.querySelector('.search_engine_choice').style.opacity=1;
            document.querySelector('.search_engine_choice').innerHTML=Option.innerText;
        }
    })
})


document.querySelector('button').addEventListener('click',()=>{
    document.querySelectorAll('option').forEach(Option=>{
        if(Option.selected){
            chrome.runtime.sendMessage({
                message:'save_search_engine',
                payload:Option.value
            }, response=>{
                if(response.message==='success'){
                    document.querySelector('.search_engine_choice').style.opacity=1;
                    document.querySelector('.search_engine_choice').innerHTML=Option.innerText;
                }
            })
        }
    })
})