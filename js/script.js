/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // when we click on each nav__link, we remove the show menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})


/*==================== EDUCATION MODAL ====================*/
const modalViews = document.querySelectorAll('.education__modal'),
    modalBtns = document.querySelectorAll('.education__button'),
    modalCloses = document.querySelectorAll('.education__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose, i) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== EMAIL JS ====================*/
/*==================== EMAIL JS ====================*/

const contactForm = document.getElementById("contact__form");
const contactMessage = document.getElementById("contact__message");

// Store page load time
const formLoadedTime = Date.now();

const sendEmail = (e) => {
    e.preventDefault();

    // Get form values
    const name = contactForm.user_name.value.trim();
    const email = contactForm.user_email.value.trim();
    const message = contactForm.user_message.value.trim();

    // Honeypot field
    const honeypot = contactForm.querySelector('input[name="website"]');

    /*==================== HONEYPOT ====================*/
    if (honeypot && honeypot.value !== "") {
        return;
    }

    /*==================== NAME VALIDATION ====================*/
    const nameRegex = /^[A-Za-z\s]{3,40}$/;

    if (!nameRegex.test(name)) {
        contactMessage.textContent =
            "Please enter a valid name.";
        return;
    }

    /*==================== EMAIL VALIDATION ====================*/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        contactMessage.textContent =
            "Please enter a valid email address.";
        return;
    }

    /*==================== MESSAGE LENGTH ====================*/
    if (message.length < 20) {
        contactMessage.textContent =
            "Message should be at least 20 characters long.";
        return;
    }

    /*==================== WORD COUNT ====================*/
    const words = message.split(/\s+/);

    if (words.length < 4) {
        contactMessage.textContent =
            "Please enter a more detailed message.";
        return;
    }

    /*==================== BLOCK URLS ====================*/
    if (/(https?:\/\/|www\.)/i.test(message)) {
        contactMessage.textContent =
            "Links are not allowed in the message.";
        return;
    }

    /*==================== PREVENT INSTANT SUBMISSION ====================*/
    const seconds = (Date.now() - formLoadedTime) / 1000;

    if (seconds < 5) {
        contactMessage.textContent =
            "Please wait a few seconds before submitting.";
        return;
    }

    /*==================== RATE LIMIT ====================*/
    const lastSubmit = localStorage.getItem("lastSubmit");

    if (lastSubmit) {

        const diff = Date.now() - Number(lastSubmit);

        if (diff < 60000) {
            contactMessage.textContent =
                "Please wait 1 minute before sending another message.";
            return;
        }
    }

    /*==================== RECAPTCHA ====================*/
    const captcha = grecaptcha.getResponse();

    if (captcha.length === 0) {
        contactMessage.textContent =
            "Please verify that you are not a robot.";
        return;
    }

    /*==================== SEND EMAIL ====================*/
    emailjs.sendForm(
        "service_b7qjgmd",
        "template_i9a3koo",
        "#contact__form",
        "3Tle9MVUGVZJejuxy"
    )
    .then(() => {

        contactMessage.textContent =
            "Message sent successfully ✅";

        // Save submission time
        localStorage.setItem(
            "lastSubmit",
            Date.now()
        );

        // Reset form
        contactForm.reset();

        // Reset captcha
        grecaptcha.reset();

        // Clear success message
        setTimeout(() => {
            contactMessage.textContent = "";
        }, 5000);

    })
    .catch(() => {

        contactMessage.textContent =
            "Message could not be sent ❌";

    });
};

contactForm.addEventListener("submit", sendEmail);



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})