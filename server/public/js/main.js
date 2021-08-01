const listBox = document.querySelectorAll('.list1');
const wrapperBox = document.querySelector('.review-box');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const reviewDiv = document.querySelector('.review');

const SliderState = {
    amountSlideAppear: 3,
    widthItemAndMargin: reviewDiv.offsetWidth / 3,
    spacing: 0,
    count: 0,
    transformNumber: 0,
}

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    window.addEventListener('resize', initSlider);
});

function initSlider() {
    if (window.innerWidth >= 1366) {
        make_slide(3);
    } else if (window.innerWidth >= 900) {
        make_slide(3);
    } else if (window.innerWidth >= 500) {
        make_slide(2);
    } else {
        make_slide(1);
    }
}

function make_slide(amountSlideAppear) {

    SliderState.transformNumber = 0;
    SliderState.amountSlideAppear = amountSlideAppear;
    SliderState.widthItemAndMargin = reviewDiv.offsetWidth / amountSlideAppear;

    let widthAllBox = SliderState.widthItemAndMargin * listBox.length;

    wrapperBox.style.width = `${widthAllBox}px`;

    listBox.forEach((element) => {
        element.style.marginRight = '20px';
        element.style.width = `${SliderState.widthItemAndMargin - 20}px`;
    });

    SliderState.count = 0;
    SliderState.spacing = widthAllBox - SliderState.amountSlideAppear * SliderState.widthItemAndMargin;

    btnRight.removeEventListener('click', rightClick);
    btnRight.addEventListener('click', rightClick);

    btnLeft.removeEventListener('click', leftClick);
    btnLeft.addEventListener('click', leftClick);
}

function rightClick() {
    const {
        widthItemAndMargin,
        spacing,
        transformNumber
    } = SliderState;


    if ((transformNumber + 1) * widthItemAndMargin > spacing) {
        return null;
    } else {
        SliderState.transformNumber = transformNumber + 1;
    }

    wrapperBox.style.transform = `translateX(${-transformNumber*widthItemAndMargin}px)`;
}

function leftClick() {
    const {
        widthItemAndMargin,
        transformNumber
    } = SliderState;

    if (transformNumber < 1) {
        return;
    }
    SliderState.transformNumber = transformNumber - 1;
    wrapperBox.style.transform = `translateX(${-SliderState.transformNumber*widthItemAndMargin}px)`;
}

// Get the modal
function eventClick() {
    var modal = document.getElementById('id01');
    var loginBtn = document.getElementById('login-btn');
    var tabs = document.getElementsByClassName("tablinks");


    modal.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    loginBtn.onclick = function (e) {
        document.getElementById('id01').style.display = 'block'
    }

    Array.from(tabs).forEach(tab => {
        console.log(tab);

        tab.onclick = function(event) {
            openTab(tab.id);
        }
    })
}


//onclicktab
function openTab(tabName) {

    var ele = document.getElementById(tabName);

    var i, html1, tablinks;
    html1 = document.getElementsByClassName("html1");
    for (i = 0; i < html1.length; i++) {
        html1[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }


    // document.getElementById(tabName).style.display = "block";
    ele.classList.add("active");
}

openTab(
   "menu_tab1"
)


//end onlicktab
//array abiect
//   let colors = ['red', 'green', 'blue']
// for (let i = 0; i < colors.length; i++) {
//   console.log(colors[i])
// }

// let color = ['n', 't', 'n']
//   color.forEach(color => console.log(color))

// let myArray = new Array('1', '2', '3')
// myArray.forEach(function)
// console.log(myArray)




eventClick();