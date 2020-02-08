document.addEventListener('DOMContentLoaded', function(e) {
    if ( location.hash === "#comanda" ) {
        document.querySelector(".modal1").classList.add('show');
    }
    
    function locationHashChanged( e ) {
        console.log( location.hash );
        console.log( e.oldURL, e.newURL );
        if ( location.hash === "#comanda" ) {
            document.querySelector(".modal1").classList.add('show');
        } else {
            document.querySelector(".modal1").classList.remove('show');
        }
    }
    
    window.onhashchange = locationHashChanged;

    document.querySelector('.close-btn').onclick = function(e) {
        sessionStorage.setItem('like-modal-show', 'true');
        window.location.hash = '';
        document.querySelector(".modal1").classList.remove('show');
    }
/*

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
    


    document.onmouseleave = leaveFromTop;
    function leaveFromTop(e){
        if( e.clientY < 0 ) {
            let wasVisible = sessionStorage.getItem('like-modal-show');
            if(wasVisible !== "true") {
                document.querySelector(".modal1").classList.add('show');
            }
        }
    }
*/
}, false);