// анімація заголовків

function contentOnPage() {
  const content = document.querySelector('.content');

  if (document.contains(content)) {
    animationPrepare();
  } else {
    return;
  }
}
contentOnPage();

function animationPrepare() {
  const mainArea = document.querySelector('.main');
  const content = document.querySelector('.content');
  const containsContent = mainArea.contains(content);

  if (containsContent) {
    const contentTitle = document.querySelector('.content > h2');
    const contentSubTitle = document.querySelector('.content > h3');
    if (content.classList.contains('content_title_anim')) {
      $(contentTitle).addClass('animation-prepare');
      $(contentSubTitle).addClass('animation-prepare');
    }
  } else {}
}



function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('showAnim');
    }
  });
}
let options = {
  threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);

let elements = document.querySelectorAll('.animation-prepare');
for (let elm of elements) {
  observer.observe(elm);
}

function onEntryFast(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('showAnim-fast');
    }
  });
}

let observerFast = new IntersectionObserver(onEntryFast, options);
let elementTitle = document.querySelectorAll('.animation-prepare-fast');
for (let elm of elementTitle) {
  observerFast.observe(elm);
}

function mainImgInit() {
  const imgInit = document.querySelector('.header-about__img');

  if (document.contains(imgInit)) {
    mainImgToShow();
  }
}
mainImgInit();

function mainImgToShow() {
  const mainImg = document.querySelector('.header-about__img');

  if ($(window).width() > 767) {
    mainImg.classList.add('animation-prepare-img');
    $(mainImg).slideDown(700);
  } else {}
}


////////////////////////////////////////////////////////////////////

// faq item відкриття зі скролом

function subMenuToShow() {
  const menuItemsWithChildren = Array.from(document.querySelectorAll('.faq__list > .faq__item-has-children'));

  const iconPlus = '<span class="faq__item-plus"></span>';

  for (let menuItem of menuItemsWithChildren) {

    menuItem.querySelector('h4').insertAdjacentHTML('beforebegin', iconPlus);
  }

  const menu = document.querySelector('.faq__list');

  let openedClass = 'opened';


  if (menu) {
    menu.addEventListener('click', (event) => {


      const target = event.target;
      $(target).addClass('active');
      const submenuIcon = target.classList.contains('active');

      if (!submenuIcon) return;

      event.preventDefault();

      const currentParent = target.closest('.faq__item-has-children');
      const isOpened = currentParent.classList.contains(openedClass);


      if (!isOpened) {

        $(currentParent).children('.faq__item-content').slideDown(500);
        $(currentParent).children('iconPlus').addClass(openedClass);
      } else {
        $(currentParent).children('.faq__item-content').slideUp(500);
        $(currentParent).children('iconPlus').removeClass(openedClass);
      }

      currentParent.classList.toggle(openedClass);
    });
  }
}

subMenuToShow();

////////////////////////////////////////////////////////////////////

// _arrow_slide_up

function pageSlideUp() {
  const mainArea = document.querySelector('.main');
  const elementUp = '<a class="arrow__up" href="#header"></a>';


  const sectionPartners = document.querySelector('.partners');
  const containsPartners = mainArea.contains(sectionPartners);


  const sectionMaterials = document.querySelector('.materials');
  const containsMaterials = mainArea.contains(sectionMaterials);

  mainArea.insertAdjacentHTML('afterbegin', elementUp);

  let arrowUp = document.querySelector('.arrow__up');

  window.addEventListener('scroll', function () {

    if (window.scrollY > 100) {
      arrowUp.classList.add('show');
    } else {
      arrowUp.classList.remove('show');
    }
  });


  if (containsPartners) {
    $(arrowUp).addClass("show__up--top");
  } else {}

  if (containsMaterials) {
    $(arrowUp).addClass("show__up--mid");
  } else {}

  $(arrowUp).on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
}

pageSlideUp();

////////////////////////////////////////////////////////////////////


function regionSubMenuShow() {
  const box = document.querySelector('.header-title-sub-menu__inner');
  const regionButton = document.querySelector('.header-title-sub-menu__regions');
  const subMenu = document.querySelector('.header-title-sub-menu__list');
  const openedClass = 'opened';

  if (document.contains(box)) {

    box.addEventListener('click', () => {
      const isOpened = regionButton.classList.contains(openedClass);
      regionButton.classList.toggle(openedClass);

      if (isOpened) {
        $(subMenu).slideUp(500);

      } else {
        $(subMenu).slideDown(500);
      }

    });

  } else {
    return;
  }
}

regionSubMenuShow();

////////////////////////////////////////////////////////////////////

function menuItemsWithChildrenInit() {
  const menuItem = document.querySelector('.menu-item-has-children');

  if (document.contains(menuItem)) {
    menuItems();
  } else {
    return;
  }
}
menuItemsWithChildrenInit();

function menuItems() {
  const menuItemsWithChildren = Array.from(document.querySelectorAll('.menu-list > .menu-item-has-children'));
  const iconPlus = '<span class="menu-item__arrow"><svg class="menu-item__arrow-icon" width="10" height="8"><use xlink: href = "' + window.themeLink + 'img/sprite.svg#icon_arrow-burger-menu"></use></svg></span>';
  let wrapp = '<div class="sub-menu__wrapp">';
  
  for (let menuItem of menuItemsWithChildren) {
    menuItem.querySelector('a').insertAdjacentHTML('beforebegin', iconPlus);
    menuItem.querySelector('ul').insertAdjacentHTML('beforebegin', wrapp);
    menuItem.querySelector('.sub-menu__wrapp').append(menuItem.querySelector('ul'));
  }

  let menu = document.querySelector('.menu-list');

  let openedClass = 'opened';


  menu.addEventListener('click', (event) => {

    const target = event.target;
    const closestTarget = target.closest('span');
    const submenuIcon = closestTarget.classList.contains('menu-item__arrow');

    if (!submenuIcon) return;

    event.preventDefault();

    const currentParent = target.closest('.menu-item-has-children');
    const isOpened = currentParent.classList.contains(openedClass);

    if (!isOpened) {

      $(currentParent).children('.sub-menu__wrapp').slideDown(500);
      $(closestTarget).addClass('active');

    } else {

      $(currentParent).children('.sub-menu__wrapp').slideUp(500);
      $(closestTarget).removeClass('active');
      $(submenuIcon).removeClass(openedClass);
    }
    currentParent.classList.toggle(openedClass);
  });
}

////////////////////////////////////////////////////////////////////

$(function () {
  const itemArticle = Array.from(document.querySelectorAll('.article__bg'));
  $(itemArticle).addClass('position');

  const backgroumd = '<span class="img__bg"></span>';

  for (let item of itemArticle) {
    item.querySelector('img').insertAdjacentHTML('beforebegin', backgroumd);
  }
});


////////////////////////////////////////////////////////////////////


$(function () {
  $('.slider').slick({
    dots: true,
    mobileFirst: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    fade: true
  });
});

////////////////////////////////////////////////////////////////////


$('.count').each(function () {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 4000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
  $('body,html').animate({
    scrollTop: top
  }, 1500);
});

////////////////////////////////////////////////////////////////////


$(document).on("scroll", function () {
  if ($(document).scrollTop() > 0) {
    $(".header__content").addClass("fixed");
  } else {
    $(".header__content").removeClass("fixed");
  }

  if ($(document).scrollTop() > 0) {
    $(".header__wrapper").addClass("fixed");
  } else {
    $(".header__wrapper").removeClass("fixed");
  }
});

////////////////////////////////////////////////////////////////////
function burgerClick() {
  const body = document.querySelector('body');
  const burgerBtn = document.querySelector('.header__burger');
  const burgerMenu = document.querySelector('.burger-menu');
  const headerContent = document.querySelector('.header__content');
  const headerWrapper = document.querySelector('.header__wrapper');

  burgerBtn.addEventListener('click', () => {
    let burgerBtnActive = burgerBtn.classList.contains('active');

    if (!burgerBtnActive) {
      burgerBtn.classList.add('active');
      burgerMenu.classList.add('active');
      body.classList.add('lock');
      headerContent.classList.add('fixed');
      headerWrapper.classList.add('fixed');
    } else {
      if (window.scrollY > 0) {
        burgerBtn.classList.remove('active');
        burgerMenu.classList.remove('active');
        body.classList.remove('lock');
      } else {
        burgerBtn.classList.remove('active');
        burgerMenu.classList.remove('active');
        body.classList.remove('lock');
        headerContent.classList.remove('fixed');
        headerWrapper.classList.remove('fixed');
      }
    }
  });
}

burgerClick();


////////////////////////////////////////////////////////////////////

$('[data-fancybox="gallery"]').fancybox({});


////////////////////////////////////////////////////////////////////


function initStickInit() {
  function initStick() {
    const stickParent = document.querySelector('.list__stick');
    $(stickParent).stick_in_parent();
  }

  if ($(window).width() > 1023) {
    initStick();
  } else {}
}

initStickInit();


////////////////////////////////////////////////////////////////////


function mapOnPage() {
  const mapIn = document.getElementById('map');

  if (document.contains(mapIn)) {
    mapInit();
  } else {
    return;
  }
}
mapOnPage();

function mapInit() {
  const map = document.querySelector('.map__ua');

  const itemPlus = '<span class="item"></span>';

  for (let i = 0; i < 1972; i++) {
    map.insertAdjacentHTML('afterbegin', itemPlus);
  }

  let itemDfault = document.querySelectorAll('.item');

  for (let i = 0; i < 30; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 37; i < 88; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 95; i < 142; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 154; i < 178; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 180; i < 181; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 189; i < 200; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 212; i < 236; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 273; i < 294; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 332; i < 352; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 390; i < 411; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 449; i < 469; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 513; i < 527; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 572; i < 584; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 635; i < 642; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 696; i < 699; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 754; i < 756; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 812; i < 814; i++) {
    itemDfault[i].classList.add('transparent');
  }
  itemDfault[869].classList.add('transparent');
  for (let i = 1060; i < 1063; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1102; i < 1104; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1118; i < 1124; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1159; i < 1167; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1172; i < 1183; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1215; i < 1241; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1272; i < 1300; i++) {
    itemDfault[i].classList.add('transparent');
  }
  itemDfault[1327].classList.add('transparent');
  for (let i = 1329; i < 1359; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1383; i < 1417; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1440; i < 1473; i++) {
    itemDfault[i].classList.add('transparent');
  }
  itemDfault[1480].classList.add('transparent');
  for (let i = 1495; i < 1531; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1538; i < 1541; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1552; i < 1588; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1595; i < 1604; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1610; i < 1645; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1652; i < 1660; i++) {
    itemDfault[i].classList.add('transparent');
  }
  itemDfault[1669].classList.add('transparent');
  for (let i = 1673; i < 1703; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1709; i < 1717; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1731; i < 1778; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1789; i < 1836; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1843; i < 1894; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1901; i < 1952; i++) {
    itemDfault[i].classList.add('transparent');
  }
  for (let i = 1957; i < 1972; i++) {
    itemDfault[i].classList.add('transparent');
  }


  let itemCity = '<span class="city"></span>';
  let itemVolunteer = '<span class="volunteer"></span>';
  /*   let itemSeparator = '<span class="separator"></span>';
    let itemPara = '<span class="para"></span>'; */

  citiesArray.forEach(element => {
    let elementId = element.id;
    let elemenCity = element.city;
    let elemenVolunteer = element.volunteer;
    /*     let elemenSeparator = element.separator;
        let elemenPara = element.para; */

    itemDfault[elementId].classList.add('active');
    /*     itemDfault[elementId].insertAdjacentHTML('afterbegin', itemPara);
        itemDfault[elementId].insertAdjacentHTML('afterbegin', itemSeparator); */
    itemDfault[elementId].insertAdjacentHTML('afterbegin', itemVolunteer);
    itemDfault[elementId].insertAdjacentHTML('afterbegin', itemCity);

    itemDfault[elementId].children[1].textContent = elemenVolunteer;
    itemDfault[elementId].children[0].textContent = elemenCity;

    /* itemDfault[elementId].children[2].textContent = elemenSeparator;
    itemDfault[elementId].children[3].textContent = elemenPara; */
  });
}