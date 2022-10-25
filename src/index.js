function Parallax() {
    let zoom = 300;
    // let saturate = 100;
    document.addEventListener('scroll', (e) => {
        document.querySelectorAll('.parallax-item').forEach((item) => {
            const speed = item.getAttribute('data-speed');
            let top = document.documentElement.scrollTop;

            zoom = top * speed;
            zoom = Math.min(Math.max(zoom, 0), 300);

            // saturate = top;
            // saturate = Math.min(Math.max(saturate, 0), 400) / 100;

            
            // console.log(Remap(saturate, 0, 4, 4, 0));

            item.style.transform = `translateY(${-zoom}px)`;
            // document.getElementById('bg').style = `filter: saturate(${Remap(saturate, 0, 4, 1, 0)}); transition: 50ms ease; transform: translateY(${-zoom}px)`;
        });
    });
}

let fadeWelcome = document.querySelectorAll('.welcome')[0];
let content = document.querySelectorAll('.content')[0];

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        fadeWelcome.classList.add('fadeIn');
        document.body.style = 'overflow: hidden;';
        document.getElementById('bg').style = "filter: saturate(0); transition: 250ms ease-in-out"
    }, 50);
    
    setTimeout(() => {
        fadeWelcome.classList.add('fadeOut');
        fadeWelcome.classList.remove('fadeIn');
        fadeWelcome.style = 'visibility: hidden;';
        document.getElementById('bg').style = "filter: saturate(1); transition: 250ms ease-in-out"
        content.style = 'transform: translateY(0%); transition: 1000ms transform ease-in-out;';
        enablePageInteraction();
    }, 2500);

}, false);


function enablePageInteraction() {
    setTimeout(() => {
        content.style = 'transform: translateY(0%); transition: 50ms transform ease;';
        document.getElementById('bg').style = "filter: saturate(1); transition: 50ms ease"
        document.body.style = 'overflow: scroll;';
        document.querySelectorAll('p').forEach((p) => {
            p.addEventListener('click', () => {
                p.contentEditable = 'true';
                console.log("click");
            })
        })
        Parallax();
    }, 1000);
}

function Remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}