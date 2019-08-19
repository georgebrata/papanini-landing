document.addEventListener('DOMContentLoaded', function(e) {
    document.querySelector('.like-overlay').onclick = function(e) {
        document.querySelector('.like-overlay').style.display = 'none';

        setTimeout(() => {
            document.querySelector('#surpriza-btn').classList.remove('btn-disabled');
            document.querySelector('.notification').classList.remove('background-img');
            document.querySelector('.fb-like.fb_iframe_widget').style.display = "none";

        }, 6000);
    }
    document.querySelector('#surpriza-btn').onclick = function(e) {
        if(document.querySelector('#surpriza-btn').innerHTML === "Vezi surpriza") {
            document.querySelector('#surpriza-btn').innerHTML = "Ascunde surpriza";
            document.querySelector('#cod-reducere').classList.remove('hidden');
        } else {
            document.querySelector('#surpriza-btn').innerHTML = "Vezi surpriza";
            document.querySelector('#cod-reducere').classList.add('hidden');
        }

    }
    document.querySelector('.close-btn').onclick = function(e) {
        sessionStorage.setItem('like-modal-show', 'true');
        document.querySelector(".modal1").classList.remove('show');
    }


    document.onmouseleave = leaveFromTop;
    function leaveFromTop(e){
        if( e.clientY < 0 ) {
            let wasVisible = sessionStorage.getItem('like-modal-show');
            if(wasVisible !== "true") {
                document.querySelector(".modal1").classList.add('show');
            }
        }
    }
}, false);