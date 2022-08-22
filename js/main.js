const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// progress bar 

var progressBar = $('.progress-bar');

document.addEventListener('scroll', ()=>{
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clienHeight = document.documentElement.clientHeight;
    const percentage = ((scrollTop/(scrollHeight - clienHeight))*100);
    
    progressBar.style.width = `${percentage}%`;
})


// main header
var header =$('.main_header');
var JumpLeft = $$('.triangle-l');
var JumpRight = $$('.triangle-r')
var headerJumpLefts = Array.from(JumpLeft);
var headerJumpRights = Array.from(JumpRight);


function mainHeader(){
    if(document.documentElement.scrollTop){
        header.classList.add('headerScroll');
        headerJumpLefts.forEach(function(headerJump){
            headerJump.classList.remove('jump-l');
        })
        headerJumpRights.forEach(function(headerJump){
            headerJump.classList.remove('jump-r');
        })
    }
    else {
        header.classList.remove('headerScroll');
        headerJumpLefts.forEach(function(headerJump){
            headerJump.classList.add('jump-l');
        })
        headerJumpRights.forEach(function(headerJump){
            headerJump.classList.add('jump-r');
        })
    }
}

// menu nav 

var menuBtn = $('.menu-btn');
var menuNav = $('.menu-nav');
var menuNavCloseBtn = $('.menu-nav_close');
var menuNavServices = $('.menu-nav_link-list');
var menuServicesList = $('.menu-nav_services-list');
var menuServicesListIcon = $('.menu-nav_link-list-icon');

menuBtn.onclick = function(){
    menuBtn.classList.toggle('active');
    menuNav.classList.toggle('active');
};

menuNavCloseBtn.onclick = function(){
    menuBtn.classList.remove('active');
    menuNav.classList.remove('active');
}

menuNavServices.onclick = function(){
    menuServicesList.classList.toggle('active');
    menuServicesListIcon.classList.toggle('active');
};

// share btn

var headerShareBtn = $('.header-share');
var headerIconShare = $$('.header-share_icon');
var headerContainar = $('.share-container-list');

headerShareBtn.onclick = function(){
    if(headerContainar){
        headerIconShare.forEach(function(headerIcon){
            headerIcon.classList.toggle('active');
        });
        headerContainar.classList.toggle('active');
    }
}


// video play btn 

const videoPlayBtn = $('.container_play-video-btn');
const OverPlayVideo = $('.overlay_playvideo');
const tagVideo = $('.play-video');
const videoPlay = $('#video-play');
const videoClose = $('.overlay_close');

videoPlayBtn.onclick = function(){
    OverPlayVideo.classList.remove('close');
    tagVideo.classList.remove('play')
    videoPlay.play();
}
videoClose.onclick= function(){
    OverPlayVideo.classList.add('close');
    tagVideo.classList.add('play')
    videoPlay.pause();
}

// function about us 

var animationEl = $$('.show-on-scroll')

function checkAnimation(){
    animationEl.forEach((e)=>{
        toggleAboutUsClass(e);
    })
}

function toggleAboutUsClass(element) {

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects khá khó giải thích 
    var rect = element.getClientRects()[0];

    // lấy ra độ cao layout view port 
    var heigthScreen = window.innerHeight;

    if(!rect.bottom >0 || rect.top < heigthScreen) {
        element.classList.add('strat')
    }
    else {
        element.classList.remove('strat')
    }

}


// sroll up 
var scrollUP = $('.scroll-up');

function scrollUp(){
    if(document.documentElement.scrollTop){
        scrollUP.classList.add('active');
    }
    else{
        scrollUP.classList.remove('active');
    }
}
// event scroll

document.onscroll= function(){
    //  main-header
    mainHeader();

    // about-us 
    checkAnimation();
    //  scroll up
    scrollUp();
}

//

// carousel wrap 

var swiperContainer = $('.swiper-container');
var swiperSlides = $$('.swiper-slide');
var carouselBtnPrev = $('.carousel-prev');
var carouselBtnNext = $('.carousel-next');
var dataIndex = [];

// cover lại sang array
_swiperSlides = Array.from(swiperSlides);

//  lấy ra data index
_swiperSlides.forEach(function(slide) {
    
   dataIndex.push(slide.getAttribute('data-index'));
   
});
// xóa phần tử trùng lặp  trong data index
_dataIndex = dataIndex.reduce((accumulator, ele)=>{
    if(accumulator.indexOf(ele)=== -1){
        accumulator.push(ele);
    }

    return accumulator
},[]);

//  sắp xếp lại trong data index
_dataIndex.sort((fistr, secon)=>{
    if(secon>fistr){return -1}
    else {return 0};
})

var currentIndex = 1
slideShow(currentIndex);

carouselBtnNext.onclick = function(){
    slideShow(currentIndex += 1);
}

carouselBtnPrev.onclick = function(){
    slideShow(currentIndex += -1);
}

function slideShow(index){

    if (index > _dataIndex.length){currentIndex = 1};
    if (index < 1) {currentIndex =_dataIndex.length};
    for(var i = 0 ; i<_swiperSlides.length ; i++){
        // _swiperSlides[i].classList.add('none');
        _swiperSlides[i].classList.remove('prev');
        _swiperSlides[i].classList.remove('active');
        _swiperSlides[i].classList.remove('next');
    }

    _swiperSlides[currentIndex -1].classList.add('prev');
    _swiperSlides[currentIndex].classList.add('active');
    _swiperSlides[currentIndex+1].classList.add('next');
    
}


// footer spread 

var spreads = $$('.footer-img-dot');
_spreads = Array.from(spreads);
var i = 0;
setInterval(() => {
    i = Math.floor(Math.random() * 4);
    if ( i=== 0 ){
        setTimeout(() => {
            _spreads[2].classList.remove('footer-img-dot_active');
            _spreads[0].classList.add('footer-img-dot_active');
        }, 3000);
    }
    else if( i=== 1){
        setTimeout(() => {
            _spreads[0].classList.remove('footer-img-dot_active');
            _spreads[1].classList.add('footer-img-dot_active');
        }, 4000);
    }
    else if ( i=== 2){
        setTimeout(() => {
            _spreads[1].classList.remove('footer-img-dot_active')
            _spreads[2].classList.add('footer-img-dot_active');
        }, 3000);
    }
    i++;
    
},3000)


var heightFooter = $('.footer').offsetHeight;   
var heightEmulator = $('.height-emulator');
heightEmulator.style.height = `${heightFooter}px`;









