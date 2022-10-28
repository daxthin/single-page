
const fadeWelcome = document.querySelectorAll('.welcome')[0];
const content = document.querySelectorAll('.content')[0];
const toggleThemeBtn = document.getElementsByClassName('toggle-theme')[0];
const images = document.querySelectorAll('.image-wrapper');
const limitForIconFade = 300;
let darkMode;

// scroll to top after refresh
setTimeout(() => {
    window.scrollTo(0, 0);
}, 100);

// !TOGGLE DARK MODE >
if (darkMode != null) {
    window.localStorage.setItem('dark', false);
}
else {
    darkMode = JSON.parse(window.localStorage.getItem('dark'));
    ToggleDarkMode(darkMode);
}

let scrollTopPosition = 0;

function fadeDarkModeBtn() {
    scrollTopPosition = document.documentElement.scrollTop;
    if (scrollTopPosition <= 300) {
        toggleThemeBtn.style.visibility = 'visible';
    }
    else {
        toggleThemeBtn.style.visibility = 'hidden';
    }  
}

toggleThemeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    window.localStorage.setItem('dark', darkMode);
    if (scrollTopPosition <= 300) {
        ToggleDarkMode(darkMode);       
    }
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


// !SECTION HIGHLIGHT >
// *FIXED DETECTION RANGE
const elementsForHighLight = () => {
    let list = [];
    list.push();
    list.push(document.getElementsByTagName('article'));
    return list;
}

function highlightElements() {
    images.forEach(e => {
        let viewportHeight = window.innerHeight;
        let { top, bottom } = e.getBoundingClientRect();
        // get the center of the element
        let center = top + bottom / 2;
        //set a range between 20 and 100 % of the viewport 
        if( center > viewportHeight*0.2 && center < viewportHeight){
            e.classList.remove('img-overlay');
        }  
        else {
            e.classList.add('img-overlay');
        }   
    })
}


document.addEventListener('scroll', (e) => {
    requestAnimationFrame(highlightElements);
    requestAnimationFrame(fadeDarkModeBtn);
});