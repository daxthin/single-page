let fadeWelcome = document.querySelectorAll('.welcome')[0];
let content = document.querySelectorAll('.content')[0];

function Parallax() {
    let scroll = 300;
    document.addEventListener('scroll', (e) => {
        document.querySelectorAll('.parallax-item').forEach((item) => {
            // store element parallax speed
            const speed = item.getAttribute('data-speed');

            // get scroll value
            let top = document.documentElement.scrollTop;
            
            // control element speed
            scroll = top * speed;

            // clamp scroll value
            scroll = Math.min(Math.max(scroll, 0), 300);
            item.style.transform = `translateY(${-scroll}px)`;
        });
    });
}


// *welcome anim function
document.addEventListener('DOMContentLoaded', () => {

    // !set start delay for fade in to avoid load first
    setTimeout(() => {
        fadeWelcome.classList.add('fadeIn');
        document.body.style = 'overflow: hidden;';
        document.getElementById('bg').style = `filter: saturate(0); transition: 250ms ease-in-out`;
    },
    50);
    
    // *set delay for fade out after 2500
    setTimeout(() => {
        fadeWelcome.classList.add('fadeOut');
        fadeWelcome.classList.remove('fadeIn');
        document.getElementById('bg').style = `filter: saturate(1); transition: 250ms ease-in-out`;
        
        content.style = `transform: translateY(0%); 
                         transition: 1000ms
                         transform ease-in-out;`;
        enablePageInteraction();
    },
    2500);

}, false);


/**
 * *Allow user to interact after welcome test
 */
function enablePageInteraction() {
    setTimeout(() => {
        content.style = `transform: translateY(0%); transition: 50ms transform ease;`;
        
        document.getElementById('bg').style = `filter: saturate(1); transition: 50ms ease`;
        
        document.body.style = 'overflow: scroll;';
        
        document.querySelectorAll('p').forEach((p) => {
            p.addEventListener('click', () => {
                p.contentEditable = 'true';
            })
        })
        fadeWelcome.style = 'display: none;';
        Parallax();
    },
    1000);
}


/**
 * *Replace low and high values from an input
 * 
 * *Example: Remap(input, 0, 4, 4, 0);
 * 
 * *this will return the values inverted
 * *if you have a range between 0 and 4 you will get 4 and 0
 * @param {float} value [initial value]
 * @param {float} low1  [lowest value in the input]
 * @param {float} high1 [highest value in the input]
 * @param {float} low2 [Remap the lowest value of the input]
 * @param {float} high2 [Remap the highest value of the input]
 * @returns [Remapped value]
 */
function Remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) *
                  (value - low1) /
                  (high1 - low1);
}

