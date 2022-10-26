let fadeWelcome = document.querySelectorAll('.welcome')[0];
let content = document.querySelectorAll('.content')[0];

// !TOGGLE DARK MODE >
let toggleThemeBtn = document.getElementById('toggle-theme');

let darkMode;
let limitForIconFade = 200;

if (darkMode != null) {
    window.localStorage.setItem('dark', false);
}
else {
    darkMode = JSON.parse(window.localStorage.getItem('dark'));
    ToggleDarkMode(darkMode);
}

toggleThemeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    window.localStorage.setItem('dark', darkMode);
    ToggleDarkMode(darkMode);
})

function ToggleDarkMode(mode) {  
    if (darkMode) {
        content.classList.add('dark');
        document.body.classList.add('dark');        
    }
    else
    {
        content.classList.remove('dark');
        document.body.classList.remove('dark');
    }
}

document.addEventListener('scroll', (e) => {
        // get scroll value
        let top = document.documentElement.scrollTop;
    
        toggleThemeBtn.style.opacity = `${Remap(top, 0, limitForIconFade, 1, 0)}`;
});





// *TOGGLE DARK MODE <



// !FADE IN OUT WELCOME TEXT >
function FadeInOut(aT, bT) {
    let delayIn = aT;
    let delayOut = bT;

  
    document.querySelectorAll('.fade-element').forEach((e) => {

        delayIn *= 2;
        delayOut *= 2;

        setTimeout(() => {
            e.classList.add('elementFadeIn');
        }, delayIn);
        setTimeout(() => {
            e.classList.add('elementFadeOut');
        }, delayOut);


    })

    return delayOut;
}
// *FADE IN OUT WELCOME TEXT <

// 

// !CONTENT PARALLAX >
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
// *CONTENT PARALLAX <




document.addEventListener('scroll', (e) => {
    document.querySelectorAll('.parallax-item').forEach((item) => {
        document.querySelectorAll('img').forEach((e) => {
            let top = document.documentElement.scrollTop;
            let viewportHeight = window.innerHeight;
            let y = e.getBoundingClientRect().top;

   

            if( y > viewportHeight/5.5 && y < viewportHeight/1.5 ){
                e.style.filter = 'saturate(1)';
                e.style.transition = '500ms ease-in-out';
    
            }  
            else {
                e.style.filter = 'saturate(0)';
                e.style.transition = '500ms ease-in-out';

            }

        })
    })
});
    
    
    
// !WELCOME ANIM FUNCTION >
document.addEventListener('DOMContentLoaded', () => {

    // !set start delay for fade in to avoid load first
    setTimeout(() => {
        fadeWelcome.classList.add('welcomeFadeIn');
        document.body.style = 'overflow: hidden;';
        document.getElementById('bg').style = `filter: saturate(0); transition: 250ms ease-in-out`;
    },
    50);
    
    // *set delay for fade out after 2500
    setTimeout(() => {
        fadeWelcome.classList.add('welcomeFadeOut');
        fadeWelcome.classList.remove('welcomeFadeIn');
        document.getElementById('bg').style = `filter: saturate(1); transition: 250ms ease-in-out`;
        
        content.style = `transform: translateY(0%); 
                         transition: 1000ms
                         transform ease-in-out;`;
        enablePageInteraction();
    },
    FadeInOut(500, 800));

}, false);
// *WELCOME ANIM FUNCTION <




// !ENABLE PAGE FUNCTIONS >
/**
 * *Allow user to interact after welcome test
 */
function enablePageInteraction() {
    setTimeout(() => {
        content.style = `transform: translateY(0%); transition: 400ms ease;`;
        
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
// *ENABLE PAGE FUNCTIONS <





// !OTHER FUNCTIONS FOR UTILITY >
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

function easeInOut(t) {
    if (t < 0.5) {
        return 2.0 * t * t;
    }
    else
    {
        t -= 0.5;
        return 2.0 * t * (1.0 - t) + 0.5;
    }
}
// *OTHER FUNCTIONS FOR UTILITY <
