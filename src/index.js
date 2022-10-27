
const fadeWelcome = document.querySelectorAll('.welcome')[0];
const content = document.querySelectorAll('.content')[0];
const toggleThemeBtn = document.getElementById('toggle-theme');
let darkMode;
const limitForIconFade = 300;
const images = document.querySelectorAll('img');

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

function fadeDarkModeBtn() {
    let top = document.documentElement.scrollTop;
    toggleThemeBtn.style.opacity = `${Remap(top, 0, limitForIconFade, 1, 0)}`;
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
            e.style.filter = 'saturate(1)';
            e.style.maxWidth = '500px';
            e.style.transition = '500ms ease-in-out';
        }  
        else {
            e.style.filter = 'saturate(0)';
            e.style.maxWidth = '400px';
            e.style.transition = '500ms ease-in-out';
        }   
    })
}


document.addEventListener('scroll', (e) => {
    requestAnimationFrame(fadeDarkModeBtn);
    requestAnimationFrame(highlightElements);
});

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
