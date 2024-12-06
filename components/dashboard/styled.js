import styled from 'styled-components';

export const StyledDashboardContainer = styled.div`
width: 100%;
background-color: #F6F7F9;
 .dashboard-nav, .dashboard-body__content, .dashboard-footer {
    padding-left: 32px;
    padding-right: 32px;
}

@media screen and (max-width: 1399px) {
    .dashboard-nav, .dashboard-body__content, .dashboard-footer {
        padding-left: 24px;
        padding-right: 24px;
    }
}

.dashboard-footer {
    margin-top: auto !important;
}

.dashboard {
    background-color: hsl(var(--gray-seven));
}

.dashboard-body {
    width: calc(100% - 312px);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

@media screen and (max-width: 991px) {
    .dashboard-body {
        width: 100%;
    }
}

.dashboard-body__content {
    margin: 32px 0;
    margin-top: 4rem;
}

.dashboard-body__item {
    margin-bottom: 32px;
}

.dashboard-body__item:last-child {
    margin-bottom: 0;
}

/* Sidebar Collapse */
@media (min-width: 992px) {
    .dashboard.active .dashboard-sidebar {
        width: auto;
    }

    .dashboard.active .dashboard-sidebar .logo {
        display: none;
    }

    .dashboard.active .dashboard-sidebar .logo.favicon {
        display: block;
    }

    .dashboard.active .dashboard-sidebar .sidebar-list__link {
        width: 44px;
        height: 44px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dashboard.active .dashboard-sidebar .sidebar-list__link .text {
        display: none;
    }

    .dashboard.active .bar-icon {
        display: none;
    }

    .dashboard.active .arrow-icon {
        display: block;
    }
}
/* Sidebar Collapse End */
/* Dashboard Widget Css Start */
.dashboard-widget {
    padding: 16px 24px;
    border-radius: 8px;
    background-color: transparent;
    position: relative;
    z-index: 1;
    transition: 0.2s linear;
}

@media screen and (max-width: 1399px) {
    .dashboard-widget {
        padding: 16px;
    }
}

.dashboard-widget:hover {
    box-shadow: 0px 20px 30px 0px rgba(197, 196, 201, 0.25);
    background: var(--main-gradient);
}

.dashboard-widget:hover .dashboard-widget__shape.one {
    visibility: hidden;
    opacity: 0;
}

.dashboard-widget:hover .dashboard-widget__shape.two {
    visibility: visible;
    opacity: 1;
}

.dashboard-widget::before {
    position: absolute;
    content: "";
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: hsl(var(--white));
    left: 1px;
    top: 1px;
    border-radius: inherit;
    z-index: -1;
    transition: 0.2s linear;
}

.dashboard-widget__shape {
    position: absolute;
    right: 0;
    top: 16px;
    transition: 0.2s linear;
}

.dashboard-widget__shape.two {
    visibility: hidden;
    opacity: 0;
}

.dashboard-widget__icon {
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: hsl(var(--gray-seven));
}

@media (min-width: 992px) and (max-width: 1399px) {
    .dashboard-widget__icon {
        width: 60px;
        height: 60px;
    }
}

@media (min-width: 992px) and (max-width: 1399px) {
    .dashboard-widget__number {
        font-size: 22px;
    }
}
/* Dashboard Widget Css End */
/* Dashboard Card Css Start */
.dashboard-card {
    background-color: hsl(var(--white));
    border-radius: 16px;
    border: 1px solid hsl(var(--gray-five));
    height: 100%;
}

.dashboard-card__header {
    padding: 24px;
    border-bottom: 1px solid hsl(var(--gray-five));
}

.dashboard-card .select-has-icon::before {
    right: 12px;
}

.dashboard-card .select-sm {
    background-color: hsl(var(--gray-seven)) !important;
    border-color: hsl(var(--gray-five));
    padding: 6px 12px;
    width: auto;
}

/* Chart Css Start */
.apexcharts-toolbar {
    display: none !important;
}

.apexcharts-legend {
    display: none !important;
}

/* Chart Css End */
.country-list__item {
    padding: 10px 24px;
    border-bottom: 1px dashed hsl(var(--gray-five));
}

.country-list__item:last-child {
    border-bottom: 0;
}

.country-list__flag {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
}

/* Dashboard Card Css End */
/* ===================== Dashboard End ======================= */
/* ======================== Dashboard Profile Css Start ========================= */
.profile-info {
    padding: 32px 16px;
    background-color: hsl(var(--white));
    border: 1px solid hsl(var(--gray-five));
    border-radius: 8px;
}

@media screen and (max-width: 1199px) {
    .profile-info {
        padding: 24px 16px;
    }
}
/* Cover Photo Upload Css Start */
.cover-photo .avatar-upload {
    display: block;
}

.cover-photo .avatar-upload .avatar-edit {
    top: 38px;
    bottom: auto;
    right: 32px;
}

.cover-photo .avatar-upload .avatar-edit input + label {
    width: unset;
    height: unset;
    border-radius: 8px;
    padding: 8px 12px;
    color: hsl(var(--white));
    gap: 8px;
    border: 0;
    background: hsl(var(--black)/0.5);
    backdrop-filter: blur(8px);
    font-weight: 300;
}

.cover-photo .avatar-upload .avatar-edit input + label:hover {
    background: hsl(var(--black)/0.8);
}

.cover-photo .avatar-upload .avatar-preview {
    height: 300px;
    width: 100%;
    border-radius: 0;
    background-image: url(../images/thumbs/cover-photo.png);
}

@media screen and (max-width: 991px) {
    .cover-photo .avatar-upload .avatar-preview {
        height: 250px;
    }
}

.cover-photo .avatar-upload .avatar-preview > div {
    border-radius: 0;
}

/* Cover Photo Upload Css End */
/* Image Upload Css Start */
.avatar-upload {
    position: relative;
    margin: 0 auto;
    display: inline-block;
}

.avatar-upload .avatar-edit {
    position: absolute;
    right: 8px;
    z-index: 1;
    bottom: 0;
}

.avatar-upload .avatar-edit input {
    display: none;
}

.avatar-upload .avatar-edit input + label {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-bottom: 0;
    border-radius: 100%;
    background: var(--main-gradient);
    border: 1px solid hsl(var(--white));
    cursor: pointer;
    font-weight: normal;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-upload .avatar-preview {
    width: 116px;
    height: 116px;
    position: relative;
    border-radius: 100%;
    background-image: url(../images/thumbs/profile-info-img.png);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.avatar-upload .avatar-preview > div {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

/* Image Upload Css End */
.profile-info-list__item {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px dashed hsl(var(--gray-four));
}

.profile-info-list__item:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
}

@media screen and (max-width: 1599px) {
    .profile-info-list__item {
        font-size: 0.875rem;
    }
}

@media screen and (max-width: 424px) {
    .profile-info-list__item {
        font-size: 0.8125rem;
    }
}

.profile-info-content {
    padding: 24px;
}

/* ======================== Dashboard Profile Css End ========================= */
/* ===================== Gradient Bg Css Start ======================= */
.bg--gradient, .bg-pattern {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
}

/* ===================== Gradient Bg Css End ======================= */
/* ======================== Element Css Start ========================== */
/* Curve Shape */
.curve-shape {
    position: absolute;
    bottom: calc(100% - 1px);
    left: 0;
}

.curve-shape.right {
    left: auto;
    right: 0;
}

@media screen and (max-width: 1399px) {
    .curve-shape {
        max-width: 250px;
    }
}

@media screen and (max-width: 991px) {
    .curve-shape {
        max-width: 140px;
    }
}
/* Curve Shape */
/* Brush Element */
.element-brush {
    position: absolute;
    z-index: -1;
    left: 50px;
    top: 64%;
    animation: upDownRotate 15s linear infinite;
}

/* Element */
.element {
    position: absolute;
    left: 90px;
    bottom: 22%;
    animation: upDownRotate 15s linear infinite;
    z-index: -1;
}

.element.two {
    left: auto;
    right: 90px;
    bottom: auto;
    top: 22%;
    animation-delay: 3s;
}

.element.three {
    left: auto;
    right: 16%;
    bottom: 14%;
    animation-delay: 5s;
}

@keyframes upDownRotate {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(200px) rotate(360deg);
    }

    100% {
        transform: translateY(0px) rotate(720deg);
    }
}
/* Line Vector Element */
.line-vector {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    max-width: 46%;
}

.line-vector.two {
    left: auto;
    right: 0;
}

/* ======================== Element Css End ========================== */
/* ============================ Dark Version Css Start =============================== */


:root {

  /* Font Size Variable Start */
    --heading-one: clamp(1.875rem, -2.0093rem + 8.3527vw, 4.25rem);
    --heading-two: clamp(1.75rem, -0.8115rem + 5.3364vw, 3.1875rem);
    --heading-three: clamp(1.5rem, -0.0592rem + 3.2483vw, 2.375rem);
    --heading-four: clamp(1.375rem, 0.7068rem + 1.3921vw, 1.75rem);
    --heading-five: clamp(1.125rem, 0.4568rem + 1.3921vw, 1.5rem);
    --heading-six: clamp(1rem, 0.7773rem + 0.464vw, 1.125rem);
  /* Font Size End */
  /* Gray Color */
    --gray-one: 0 0% 14%;
    --gray-two: 0 0% 31%;
    --gray-three: 0 0% 51%;
    --gray-four: 0 0% 74%;
    --gray-five: 252 10% 90%;
    --gray-six: 252 10% 90%;
    --gray-seven: 210 25% 97%;
  /* White Color */
    --white: 0 0% 100%;
    --static-white: 0 0% 100%;
    --white-one: 236 13% 77%;
    --static-white-one: 236 13% 77%;
  /* Light Color */
    --light-h: 0;
    --light-s: 1%;
    --light-l: 53%;
    --light: var(--light-h) var(--light-s) var(--light-l);
  /* Black Color */
    --black-h: 234;
    --black-s: 100%;
    --black-l: 7%;
    --black: var(--black-h) var(--black-s) var(--black-l);
  /* Black Color */
    --static-black-h: 234;
    --static-black-s: 100%;
    --static-black-l: 7%;
    --static-black: var(--static-black-h) var(--static-black-s) var(--static-black-l);
  /* Black Two Color */
    --black-two-h: 234;
    --black-two-s: 69%;
    --black-two-l: 9%;
    --black-two: var(--black-two-h) var(--black-two-s) var(--black-two-l);
  /* Black three Color */
    --black-three-h: 235;
    --black-three-s: 5%;
    --black-three-l: 43%;
    --black-three: var(--black-three-h) var(--black-three-s) var(--black-three-l);
    --heading-color: var(--black);
    --body-color: var(--black-three);
    --body-bg: 0 0% 100%;
    --border-color: 236 13% 77%;
    --section-bg: 210 25% 97%;
  /* Card box shadow */
    --box-shadow: 0px 20px 30px 0px rgba(197, 196, 201, 0.25);
    --box-shadow-lg: 0 1rem 3rem rgba(0,0,0,.1);
  /* Color Variables Start */
    --main-gradient: linear-gradient(312deg, hsl(var(--main)) 5.38%, hsl(var(--main-two)) 113.21%);
    --main-gradient-rev: linear-gradient(312deg, hsl(var(--main-two)) 5.38%, hsl(var(--main)) 113.21%);
    --main-gradient-two: linear-gradient(305deg, hsl(var(--main)) 0%, hsl(var(--main-three)) 100%);
  /* ========================= Main Color ============================= */
    --main-h: 253;
    --main-s: 88%;
    --main-l: 58%;
    --main: var(--main-h) var(--main-s) var(--main-l);
  /* Main Lighten */
    --main-l-100: var(--main-h) calc(var(--main-s)) calc(var(--main-l) + (100% - var(--main-l)) * 0.1);
    --main-l-200: var(--main-h) calc(var(--main-s)) calc(var(--main-l) + (100% - var(--main-l)) * 0.2);
    --main-l-300: var(--main-h) calc(var(--main-s)) calc(var(--main-l) + (100% - var(--main-l)) * 0.3);
    --main-l-400: var(--main-h) calc(var(--main-s)) calc(var(--main-l) + (100% - var(--main-l)) * 0.4);
    --main-l-500: var(--main-h) calc(var(--main-s)) calc(var(--main-l) + (100% - var(--main-l)) * 0.5);
  /* Main Darken  */
    --main-d-100: var(--main-h) var(--main-s) calc(var(--main-l) - var(--main-l) * 0.1);
    --main-d-200: var(--main-h) var(--main-s) calc(var(--main-l) - var(--main-l) * 0.2);
    --main-d-300: var(--main-h) var(--main-s) calc(var(--main-l) - var(--main-l) * 0.3);
    --main-d-400: var(--main-h) var(--main-s) calc(var(--main-l) - var(--main-l) * 0.4);
    --main-d-500: var(--main-h) var(--main-s) calc(var(--main-l) - var(--main-l) * 0.5);
  /* ========================= Main Color ============================= */
  /* ========================= Main two Color ============================= */
    --main-two-h: 184;
    --main-two-s: 96%;
    --main-two-l: 48%;
    --main-two: var(--main-two-h) var(--main-two-s) var(--main-two-l);
  /* Main-two Lighten */
    --main-two-l-100: var(--main-two-h) calc(var(--main-two-s)) calc(var(--main-two-l) + (100% - var(--main-two-l)) * 0.1);
    --main-two-l-200: var(--main-two-h) calc(var(--main-two-s)) calc(var(--main-two-l) + (100% - var(--main-two-l)) * 0.2);
    --main-two-l-300: var(--main-two-h) calc(var(--main-two-s)) calc(var(--main-two-l) + (100% - var(--main-two-l)) * 0.3);
    --main-two-l-400: var(--main-two-h) calc(var(--main-two-s)) calc(var(--main-two-l) + (100% - var(--main-two-l)) * 0.4);
    --main-two-l-500: var(--main-two-h) calc(var(--main-two-s)) calc(var(--main-two-l) + (100% - var(--main-two-l)) * 0.5);
  /* Main-two Darken  */
    --main-two-d-100: var(--main-two-h) var(--main-two-s) calc(var(--main-two-l) - var(--main-two-l) * 0.1);
    --main-two-d-200: var(--main-two-h) var(--main-two-s) calc(var(--main-two-l) - var(--main-two-l) * 0.2);
    --main-two-d-300: var(--main-two-h) var(--main-two-s) calc(var(--main-two-l) - var(--main-two-l) * 0.3);
    --main-two-d-400: var(--main-two-h) var(--main-two-s) calc(var(--main-two-l) - var(--main-two-l) * 0.4);
    --main-two-d-500: var(--main-two-h) var(--main-two-s) calc(var(--main-two-l) - var(--main-two-l) * 0.5);
  /* ========================= Main Three Color ============================= */
  /* ========================= Main three Color ============================= */
    --main-three-h: 306;
    --main-three-s: 100%;
    --main-three-l: 68%;
    --main-three: var(--main-three-h) var(--main-three-s) var(--main-three-l);
  /* Main-three Lighten */
    --main-three-l-100: var(--main-three-h) calc(var(--main-three-s)) calc(var(--main-three-l) + (100% - var(--main-three-l)) * 0.1);
    --main-three-l-200: var(--main-three-h) calc(var(--main-three-s)) calc(var(--main-three-l) + (100% - var(--main-three-l)) * 0.2);
    --main-three-l-300: var(--main-three-h) calc(var(--main-three-s)) calc(var(--main-three-l) + (100% - var(--main-three-l)) * 0.3);
    --main-three-l-400: var(--main-three-h) calc(var(--main-three-s)) calc(var(--main-three-l) + (100% - var(--main-three-l)) * 0.4);
    --main-three-l-500: var(--main-three-h) calc(var(--main-three-s)) calc(var(--main-three-l) + (100% - var(--main-three-l)) * 0.5);
  /* Main-three Darken  */
    --main-three-d-100: var(--main-three-h) var(--main-three-s) calc(var(--main-three-l) - var(--main-three-l) * 0.1);
    --main-three-d-200: var(--main-three-h) var(--main-three-s) calc(var(--main-three-l) - var(--main-three-l) * 0.2);
    --main-three-d-300: var(--main-three-h) var(--main-three-s) calc(var(--main-three-l) - var(--main-three-l) * 0.3);
    --main-three-d-400: var(--main-three-h) var(--main-three-s) calc(var(--main-three-l) - var(--main-three-l) * 0.4);
    --main-three-d-500: var(--main-three-h) var(--main-three-s) calc(var(--main-three-l) - var(--main-three-l) * 0.5);
  /* ========================= Main Two Color ============================= */
  /* ========================= Info Color ============================= */
    --info-h: 214;
    --info-s: 84%;
    --info-l: 56%;
    --info: var(--info-h) var(--info-s) var(--info-l);
  /* info Lighten */
    --info-l-100: var(--info-h) calc(var(--info-s)) calc(var(--info-l) + (100% - var(--info-l)) * 0.1);
    --info-l-200: var(--info-h) calc(var(--info-s)) calc(var(--info-l) + (100% - var(--info-l)) * 0.2);
    --info-l-300: var(--info-h) calc(var(--info-s)) calc(var(--info-l) + (100% - var(--info-l)) * 0.3);
    --info-l-400: var(--info-h) calc(var(--info-s)) calc(var(--info-l) + (100% - var(--info-l)) * 0.4);
    --info-l-500: var(--info-h) calc(var(--info-s)) calc(var(--info-l) + (100% - var(--info-l)) * 0.5);
  /* info Darken  */
    --info-d-100: var(--info-h) var(--info-s) calc(var(--info-l) - var(--info-l) * 0.1);
    --info-d-200: var(--info-h) var(--info-s) calc(var(--info-l) - var(--info-l) * 0.2);
    --info-d-300: var(--info-h) var(--info-s) calc(var(--info-l) - var(--info-l) * 0.3);
    --info-d-400: var(--info-h) var(--info-s) calc(var(--info-l) - var(--info-l) * 0.4);
    --info-d-500: var(--info-h) var(--info-s) calc(var(--info-l) - var(--info-l) * 0.5);
  /* ========================= Info Color ============================= */
  /* ========================= Success Color ============================= */
    --success-h: 145;
    --success-s: 63%;
    --success-l: 42%;
    --success: var(--success-h) var(--success-s) var(--success-l);
  /* success Lighten */
    --success-l-100: var(--success-h) calc(var(--success-s)) calc(var(--success-l) + (100% - var(--success-l)) * 0.1);
    --success-l-200: var(--success-h) calc(var(--success-s)) calc(var(--success-l) + (100% - var(--success-l)) * 0.2);
    --success-l-300: var(--success-h) calc(var(--success-s)) calc(var(--success-l) + (100% - var(--success-l)) * 0.3);
    --success-l-400: var(--success-h) calc(var(--success-s)) calc(var(--success-l) + (100% - var(--success-l)) * 0.4);
    --success-l-500: var(--success-h) calc(var(--success-s)) calc(var(--success-l) + (100% - var(--success-l)) * 0.5);
  /* success Darken  */
    --success-d-100: var(--success-h) var(--success-s) calc(var(--success-l) - var(--success-l) * 0.1);
    --success-d-200: var(--success-h) var(--success-s) calc(var(--success-l) - var(--success-l) * 0.2);
    --success-d-300: var(--success-h) var(--success-s) calc(var(--success-l) - var(--success-l) * 0.3);
    --success-d-400: var(--success-h) var(--success-s) calc(var(--success-l) - var(--success-l) * 0.4);
    --success-d-500: var(--success-h) var(--success-s) calc(var(--success-l) - var(--success-l) * 0.5);
  /* ========================= Success Color ============================= */
  /* ========================= Warning Color ============================= */
    --waring-h: 45;
    --waring-s: 74%;
    --waring-l: 56%;
    --waring: var(--waring-h) var(--waring-s) var(--waring-l);
  /* waring Lighten */
    --waring-l-100: var(--waring-h) calc(var(--waring-s)) calc(var(--waring-l) + (100% - var(--waring-l)) * 0.1);
    --waring-l-200: var(--waring-h) calc(var(--waring-s)) calc(var(--waring-l) + (100% - var(--waring-l)) * 0.2);
    --waring-l-300: var(--waring-h) calc(var(--waring-s)) calc(var(--waring-l) + (100% - var(--waring-l)) * 0.3);
    --waring-l-400: var(--waring-h) calc(var(--waring-s)) calc(var(--waring-l) + (100% - var(--waring-l)) * 0.4);
    --waring-l-500: var(--waring-h) calc(var(--waring-s)) calc(var(--waring-l) + (100% - var(--waring-l)) * 0.5);
  /* waring Darken  */
    --waring-d-100: var(--waring-h) var(--waring-s) calc(var(--waring-l) - var(--waring-l) * 0.1);
    --waring-d-200: var(--waring-h) var(--waring-s) calc(var(--waring-l) - var(--waring-l) * 0.2);
    --waring-d-300: var(--waring-h) var(--waring-s) calc(var(--waring-l) - var(--waring-l) * 0.3);
    --waring-d-400: var(--waring-h) var(--waring-s) calc(var(--waring-l) - var(--waring-l) * 0.4);
    --waring-d-500: var(--waring-h) var(--waring-s) calc(var(--waring-l) - var(--waring-l) * 0.5);
  /* ========================= Warning Color ============================= */
  /* ========================= Danger Color ============================= */
    --danger-h: 0;
    --danger-s: 79%;
    --danger-l: 63%;
    --danger: var(--danger-h) var(--danger-s) var(--danger-l);
  /* danger Lighten */
    --danger-l-100: var(--danger-h) calc(var(--danger-s)) calc(var(--danger-l) + (100% - var(--danger-l)) * 0.1);
    --danger-l-200: var(--danger-h) calc(var(--danger-s)) calc(var(--danger-l) + (100% - var(--danger-l)) * 0.2);
    --danger-l-300: var(--danger-h) calc(var(--danger-s)) calc(var(--danger-l) + (100% - var(--danger-l)) * 0.3);
    --danger-l-400: var(--danger-h) calc(var(--danger-s)) calc(var(--danger-l) + (100% - var(--danger-l)) * 0.4);
    --danger-l-500: var(--danger-h) calc(var(--danger-s)) calc(var(--danger-l) + (100% - var(--danger-l)) * 0.5);
  /* danger Darken  */
    --danger-d-100: var(--danger-h) var(--danger-s) calc(var(--danger-l) - var(--danger-l) * 0.1);
    --danger-d-200: var(--danger-h) var(--danger-s) calc(var(--danger-l) - var(--danger-l) * 0.2);
    --danger-d-300: var(--danger-h) var(--danger-s) calc(var(--danger-l) - var(--danger-l) * 0.3);
    --danger-d-400: var(--danger-h) var(--danger-s) calc(var(--danger-l) - var(--danger-l) * 0.4);
    --danger-d-500: var(--danger-h) var(--danger-s) calc(var(--danger-l) - var(--danger-l) * 0.5);
  /* ========================= Danger Color ============================= */
}

.dark-version {
    display: none !important;
}

[data-theme=light] {
  /* Home one Start */
  /* Home one End */
  /* Home Two Start */
  /* Home Two End */
  /* All product start */
  /* All product start */
  /* Profile start */
  /* Profile End */
  /* Cart End */
  /* Profile End */
  /* product details Start */
  /* product details End */
  /* Cart  Start */
  /* Cart  End */
  /* Dashboard  Start */
  /* Dashboard  End */
  /* Blog Details  Start */
  /* Blog Details  End */
  /* Brand & Footer Css Star */
  /* Brand & Footer Css ENd */
}

[data-theme=light] .sale-offer {
    background: var(--dark-black-one) !important;
}

[data-theme=light] .sale-offer .btn-white {
    background-color: hsl(var(--main)) !important;
    border-color: hsl(var(--main)) !important;
    color: hsl(var(--static-white)) !important;
}

[data-theme=light] .header {
    background-color: var(--dark-black-three);
}

[data-theme=light] .header.fixed-header {
    background-color: var(--dark-black-three) !important;
}

[data-theme=light] .nav-submenu {
    background-color: var(--dark-black-three);
}

@media (max-width: 991px) {
    [data-theme=light] .nav-submenu {
        background-color: var(--dark-black-two);
    }
}

[data-theme=light] .select:focus {
    color: hsl(var(--static-white)) !important;
}

[data-theme=light] .white-version {
    display: none !important;
}

[data-theme=light] .dark-version {
    display: block !important;
}

[data-theme=light] .search-box input {
    background-color: var(--dark-black-three) !important;
    color: hsl(var(--static-white));
    border: 1px solid hsl(var(--static-white)/0.12);
}

[data-theme=light] .product-category-list__item {
    background-color: var(--dark-black-three);
}

[data-theme=light] .statistics {
    border: 1px solid hsl(var(--gray-seven)/0.6);
    box-shadow: -10px 20px 40px 0px rgba(94, 53, 242, 0.2);
}

[data-theme=light] .product-item {
    background-color: var(--dark-black-three);
}

[data-theme=light] .product-item:hover {
    box-shadow: 0px 20px 30px 0px var(--black);
}

[data-theme=light] .product-item__wishlist.active {
    background-color: hsl(var(--white));
    color: hsl(var(--black));
}

[data-theme=light] .popular-item {
    background: var(--dark-black-two);
}

[data-theme=light] .popular-item::before {
    background-color: var(--dark-black-three);
}

[data-theme=light] .slick-arrow {
    background-color: var(--dark-black-two);
    box-shadow: none;
    border: 1px solid hsl(var(--border-color));
}

[data-theme=light] .slick-arrow:hover {
    color: hsl(var(--static-white));
}

[data-theme=light] .slick-dots li button {
    border-color: hsl(var(--black)/0.4);
}

[data-theme=light] .selling-product::before {
    background-color: var(--dark-black-two);
}

[data-theme=light] .author-info__thumb {
    background-color: var(--dark-black-three);
}

[data-theme=light] .product-item.box-shadow {
    box-shadow: none !important;
}

[data-theme=light] .top-performance::before {
    display: none;
}

[data-theme=light] .post-item {
    background-color: var(--dark-black-three);
}

[data-theme=light] .post-item__tag {
    background-color: var(--dark-black-five);
}

[data-theme=light] .footer-section {
    background-image: url(../images/shapes/footer-bg-dark.png);
    background-color: var(--dark-black-one);
}

[data-theme=light] .bottom-footer {
    background-color: var(--dark-black-one);
}

[data-theme=light] .progress-wrap {
    background-color: var(--dark-black-three);
}

[data-theme=light] .progress-wrap::after {
    color: hsl(var(--static-white)) !important;
}

[data-theme=light] .progress-wrap svg.progress-circle path {
    stroke: hsl(var(--static-white)) !important;
}

[data-theme=light] .loader-mask {
    background-color: var(--dark-black-two);
}

[data-theme=light] .sales-offer-bg-two {
    background: var(--dark-black-three) !important;
}

[data-theme=light] .sale-offer.sales-offer-bg-two + .header {
    background: var(--dark-black-one) !important;
}

[data-theme=light] .banner-two {
    background-color: var(--dark-black-two);
}

[data-theme=light] .statistics {
    background-color: var(--dark-black-two) !important;
    border-color: var(--dark-black-two) !important;
}

[data-theme=light] .statistics.bg-main {
    background: hsl(var(--main)) !important;
    border-color: hsl(var(--static-white)) !important;
}

[data-theme=light] .common-tab.style-icon .nav-item .nav-link .product-category-list__item {
    box-shadow: none;
}

[data-theme=light] .common-tab.style-icon .nav-item .nav-link.active .product-category-list__item {
    background-color: var(--dark-black-two);
    box-shadow: none;
}

[data-theme=light] .popular-item-card {
    background-color: var(--dark-black-two);
    box-shadow: none;
}

[data-theme=light] .popular-item-card-section::before {
    background: none;
}

[data-theme=light] .contributor-item {
    background-color: var(--dark-black-two);
}

[data-theme=light] .featured-contributor::before {
    background: none;
}

[data-theme=light] .service {
    background-color: var(--dark-black-three);
}

[data-theme=light] .service-item {
    background-color: var(--dark-black-two);
}

[data-theme=light] .testimonial-item {
    background-color: var(--dark-black-three);
}

[data-theme=light] .pricing-item {
    background-color: var(--dark-black-two);
}

[data-theme=light] .seller-two {
    background-image: url(../images/shapes/wave-shape-dark.png);
    background-color: var(--dark-black-one);
}

[data-theme=light] .download-icon:hover .icon .dark-version {
    display: none !important;
}

[data-theme=light] .download-icon:hover .icon .white-version {
    display: block !important;
}

[data-theme=light] .filter-sidebar {
    background-color: hsl(var(--section-bg)) !important;
}

[data-theme=light] .btn-white {
    background-color: var(--dark-black-three) !important;
}

[data-theme=light] .product-review, [data-theme=light] .user-comment {
    background-color: var(--dark-black-two);
}

[data-theme=light] .breadcrumb-three-content::before {
    background-color: var(--dark-black-two);
}

[data-theme=light] .breadcrumb-three-content.border-bottom {
    border-bottom: 1px solid hsl(var(--gray-five)) !important;
}

[data-theme=light] .process-list {
    border: 1px solid hsl(var(--static-white)/0.15);
}

[data-theme=light] .process-list__link {
    background-color: var(--dark-black-three);
}

[data-theme=light] .table.style-two {
    background-color: var(--dark-black-two);
}

[data-theme=light] .table.style-two thead tr th {
    background-color: var(--dark-black-two);
}

[data-theme=light] .table .product-item__wishlist {
    background-color: var(--dark-black-five);
    color: hsl(var(--static-white));
}

[data-theme=light] .table .product-item__wishlist.active {
    background-color: hsl(var(--static-white));
    color: hsl(var(--static-black));
}

[data-theme=light] .common-card, [data-theme=light] .common-card .card-header {
    background-color: var(--dark-black-two);
}

[data-theme=light] .social-share__icons, [data-theme=light] .social-share__icons::before {
    background-color: var(--dark-black-three);
}

[data-theme=light] .cart-item__count {
    border: 1px solid hsl(var(--static-white)/0.2);
}

[data-theme=light] .cart-payment-card::before {
    background-color: var(--dark-black-three);
}

[data-theme=light] .common-input--bg {
    background-color: var(--dark-black-two) !important;
    border-color: hsl(var(--static-white)/0.15) !important;
}

[data-theme=light] .total-bill {
    background-color: var(--dark-black-two);
}

[data-theme=light] .cart-thank__box {
    background-color: var(--dark-black-two);
    box-shadow: none;
}

[data-theme=light] .thank-card::before {
    background: var(--dark-black-three);
}

[data-theme=light] .dashboard {
    background-color: var(--dark-black-one);
}

[data-theme=light] .dashboard-widget::before, [data-theme=light] .dashboard-sidebar, [data-theme=light] .dashboard-nav, [data-theme=light] .dashboard-card, [data-theme=light] .user-profile .user-profile-dropdown, [data-theme=light] .user-profile .user-profile-dropdown::before, [data-theme=light] .dashboard-footer, [data-theme=light] .profile-info, [data-theme=light] select option, [data-theme=light] .license-dropdown, [data-theme=light] .license-dropdown::before, [data-theme=light] .mobile-menu {
    background: var(--dark-black-two) !important;
}

[data-theme=light] .sidebar-list__item.activePage .sidebar-list__link, [data-theme=light] .sidebar-list__item:hover .sidebar-list__link {
    background-color: var(--dark-black-one);
}

[data-theme=light] .dashboard-widget:hover {
    box-shadow: none;
}

[data-theme=light] .icon-btn.bar-icon {
    background-color: var(--dark-black-three) !important;
}

[data-theme=light] .profile-info-list__item {
    border-bottom: 1px dashed hsl(var(--static-white)/0.15);
}

[data-theme=light] .profile-info-list__item:last-child {
    border-bottom: 0;
}

[data-theme=light] .setting-sidebar {
    background-color: var(--dark-black-three);
}

[data-theme=light] .earning-card {
    box-shadow: none;
}

[data-theme=light] .download-wrapper {
    background-color: var(--dark-black-two) !important;
}

[data-theme=light] .tag-list__link {
    background-color: var(--dark-black-three);
}

[data-theme=light] .common-tab .nav-item .nav-link:hover {
    background-color: var(--dark-black-two);
}

[data-theme=light] .contributor-info__thumb {
    background-color: var(--dark-black-three);
}

[data-theme=light] .pricing-item__icon {
    background-color: var(--dark-black-three);
}

[data-theme=light] .author-details__thumb {
    background-color: var(--dark-black-three);
}

[data-theme=light] .profile-sidebar__item .social-icon-list__link.border-white {
    background: var(--dark-black-two) !important;
    border-color: hsl(var(--static-white)/0.2) !important;
}

[data-theme=light] .bg-white.rounded:has(.star-rating) {
    background-color: var(--dark-black-three) !important;
}

[data-theme=light] .brand.active {
    margin-bottom: 0;
    padding: 30px 0;
    margin-top: -10px;
}

[data-theme=light] .footer-section.active {
    padding-top: 120px;
}

[data-theme=light] .account__left::before {
    background: none;
}

[data-theme=light] .badge-list__item {
    background-image: url(../images/shapes/polygon-shape-white.png);
}

/* Dashboard Widget Css End */
/* Dashboard Card Css Start */
.dashboard-card {
    background-color: hsl(var(--white));
    border-radius: 16px;
    border: 1px solid hsl(var(--gray-five));
    height: 100%;
}

.dashboard-card__header {
    padding: 24px;
    border-bottom: 1px solid hsl(var(--gray-five));
}

.dashboard-card .select-has-icon::before {
    right: 12px;
}

.dashboard-card .select-sm {
    background-color: hsl(var(--gray-seven)) !important;
    border-color: hsl(var(--gray-five));
    padding: 6px 12px;
    width: auto;
}


/* ============================ Dark Version Css End =============================== */
/*# sourceMappingURL=main.css.map */

/* Dashboard Widget Css Start */
.dashboard-widget {
    border: 2px solid #f5f5f5;
    padding: 16px 24px;
    border-radius: 8px;
    background-color: transparent;
    position: relative;
    z-index: 1;
    transition: 0.2s linear;
}

@media screen and (max-width: 1399px) {
    .dashboard-widget {
        padding: 16px;
    }
}

.dashboard-widget:hover {
    box-shadow: 0px 20px 30px 0px rgba(197, 196, 201, 0.25);
    background: var(--main-gradient);
}

.dashboard-widget:hover .dashboard-widget__shape.one {
    visibility: hidden;
    opacity: 0;
}

.dashboard-widget:hover .dashboard-widget__shape.two {
    visibility: visible;
    opacity: 1;
}

.dashboard-widget::before {
    position: absolute;
    content: "";
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: hsl(var(--white));
    left: 1px;
    top: 1px;
    border-radius: inherit;
    z-index: -1;
    transition: 0.2s linear;
}

.dashboard-widget__shape {
    position: absolute;
    right: 0;
    top: 16px;
    transition: 0.2s linear;
}

.dashboard-widget__shape.two {
    visibility: hidden;
    opacity: 0;
}

.dashboard-widget__icon {
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: hsl(var(--gray-seven));
}

@media (min-width: 992px) and (max-width: 1399px) {
    .dashboard-widget__icon {
        width: 60px;
        height: 60px;
    }
}

@media (min-width: 992px) and (max-width: 1399px) {
    .dashboard-widget__number {
        font-size: 22px;
    }
}
/* Dashboard Widget Css End */

.table {
    color: hsl(var(--white));
    margin-bottom: 0;
    min-width: max-content;
    border-collapse: separate;
    border-spacing: 0 24px;
    &>:not(caption)>*>* {
        border-bottom: 0;
    }
    tr {
        th {
            padding-left: 0;
            padding: 20px 16px;
            color: hsl(var(--heading-color));
            background-color: hsl(var(--section-bg));
            &:not(:last-child) {
                border-radius: 0;
            }
            &:not(:first-child) {
                border-radius: 0;
            }
            &:first-child {
                border-radius: 8px 0 0 8px;
            }
            &:last-child {
                border-radius: 0 8px 8px 0;
            }
        }
        th, td {
            text-align: center;
            vertical-align: middle;
            &:first-child {
                text-align: left;
            }
            &:last-child {
                text-align: right;
            }
        }
    }
    thead {
        tr {
            border-bottom: 1px solid hsl(var(--white)/.2);
            th {
                font-size: clampCal(16, 18);
                font-weight: 500;
            }
        }
    }
    
    tbody {
        tr {
            border-bottom: 1px solid hsl(var(--white)/.2);
            &:last-child {
                border-bottom: 0;
            }
            td {
                font-size: clampCal(14, 16);
                font-weight: 400;
                padding: 16px;
                border: 1px solid hsl(var(--gray-five));
                &:not(:last-child) {
                    border-right: 0;
                }
                &:not(:first-child) {
                    border-left: 0;
                }
                &:first-child {
                    border-radius: 8px 0 0 8px;
                }
                &:last-child {
                    border-radius: 0 8px 8px 0;
                }
            }
        }
    }

    /* Style Two */
    &.style-two {
        color: hsl(var(--body-color));
        border-spacing: 0px;
        background-color: hsl(var(--white));
        border: 1px solid hsl(var(--gray-five));
        border-radius: 16px;
        overflow: hidden;
        padding-right: 3rem;


        thead {
            tr {
                border: 0;
                th {
                    border-bottom: 1px solid hsl(var(--gray-five));
                    border-radius: 0;
                    padding: 24px;
                    font-weight: 700;
                    font-family: var(--heading-font);
                    background-color: hsl(var(--white));
                }
            }
        }
        tbody {
            tr {
                &:last-child {
                    td {
                        border-bottom: 0;
                    }
                }
                td {
                    border-radius: 0 !important;
                    border-top: 0;
                    border-left: 0;
                    border-right: 0;
                    border-style: dashed;
                }
            }
        }
    }
}

/* ================================= Form Css Start =========================== */
/* input Start */
.common-input {
    border-radius: 5px;
    font-weight: 400;
    outline: none;
    width: 100%;
    padding: 17px 16px;
    background-color: transparent !important; 
    border: 1px solid hsl(var(--border-color));
    color: hsl(var(--black)); 
    line-height: 1;
    @include font-17; 
    @include md-screen {
        padding: 10px 16px;
    }
    &::placeholder {
        color: hsl(var(--black-three));
        @include font-14; 
        transition: .25s linear;
        font-weight: 400;
    }
    &--md {
        padding: 13px 16px;
        @include font-15; 
    }
    &--lg {
        padding: 25px 24px;
        @include sm-screen {
            padding: 18px 24px;
        }
    } 
    &:focus {
        border-color: hsl(var(--main)); 
        box-shadow: none;
        &::placeholder {
            visibility: hidden;
            opacity: 0;
        }
    }
    &:disabled, &[readonly] {
        background-color: hsl(var(--black)/.2); 
        opacity: 1;
        border: 0;
    }
    &[type="password"] {
        color: hsl(var(--black)/.5);
        &:focus {
            color: hsl(var(--black)); 
        }
    }
}
.common-input {
    &--withIcon {
        padding-right: 50px !important;
    }
    &--withLeftIcon {
        padding-left: 50px !important;
    }
    &--bg {
        background-color: hsl(var(--gray-seven)) !important;
        border-color: hsl(var(--gray-seven)) !important;
        &::placeholder {
            color: hsl(var(--black-three));
        }
    }
}
/* input End */

/* input icon */
.input-icon {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    color: hsl(var(--heading-color));
    @include font-14; 
    &--left {
        left: 20px;
        right: auto;
    }
}
textarea+.input-icon {
    top: 15px;
    transform: translateY(0);
}
/* input icon */

/* Label */
.form-label {
    margin-bottom: 6px;
    @include font-14; 
    color: hsl(var(--heading-color));
    font-weight: 500;
    
}

/* Form Select */  
select option {
    background-color: hsl(var(--white));
}
.select-has-icon {
    position: relative;
    &::before {
        position: absolute;
        content: "\f107";
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        @include font-12; 
        color: hsl(var(--main)); 
        transition: 0.2s linear;
        pointer-events: none;
        color: hsl(var(--body-color)) !important;
    }
    &.icon-black::before {
        -webkit-text-fill-color: hsl(var(--black)); 
    }
    select {
        background-image: none;
        -webkit-appearance: none;
        padding: 19px 24px;
        @include font-16; 
        @include md-screen {
            padding: 12px 24px;
        }
    }
    .common-input {
        padding-right: 30px !important;
    }
} 
.select {
    color: hsl(var(--black) / .6) !important;
    padding: 16px 24px;
    background-color: transparent;
    @include md-screen {
        padding: 11px 24px;
    }
    @include sm-screen {
        padding: 9px 24px;
        @include font-15; 
    }
    &:focus {
        border-color: hsl(var(--main));
        color: hsl(var(--black)) !important;
        outline: none;
    }
    option {
        background-color: hsl(var(--white));
        color: hsl(var(--heading-color));
    }
}
/* Form Select End */

// Message Field Css
textarea {
    &.common-input {
        height: 140px;
        @include sm-screen {
            height: 110px;
        }
    }
}
/* Autofill Css */
input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active, 
textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, textarea:-webkit-autofill:active {
    -webkit-transition: background-color 5000s ease-in-out 0s;
    transition: background-color 5000s ease-in-out 0s;
}
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill, textarea:-webkit-autofill, textarea:-webkit-autofill, textarea:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    -webkit-text-fill-color: hsl(var(--heading-color)) !important;
    caret-color: hsl(var(--heading-color));
}
/* Autofill Css End */

/* Show Hide Password */
input#your-password, input#confirm-password {
    padding-right: 50px;
}
.password-show-hide {
    position: absolute;
    right: 20px;
    z-index: 5;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    color: hsl(var(--black)/.4);
}

/* Number Arrow None */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type=number]{
    -moz-appearance: textfield;
}

/* Custom Checkbox & Radio Css Start */
.common-check {
    @extend .flx-align; 
    margin-bottom: 16px;
    &:last-child {
        margin-bottom: 0;
    }
    a {
        display: inline;
    }

    &.common-radio {
        .form-check-input {
            border-radius: 50%;
            &:checked { 
                background-color: transparent !important;
                &::after {
                    visibility: visible;
                    opacity: 1;
                    -webkit-transform: translate(-50%, -50%) scale(1);
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        }
    }

    .form-check-input {
        transition: .2s linear;
        box-shadow: none;
        background-color: transparent;
        box-shadow: none !important;
        border: 0;
        position: relative;
        border-radius: 3px;
        width: 18px;
        height: 18px;
        border: 1px solid hsl(var(--black) / .4);
        cursor: pointer;
        transition: .2s linear;
        margin-top: 0;
        &::before {
            position: absolute;
            content: "\f00c";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            color: hsl(var(--static-white)); 
            @include font-11; 
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: .2s linear;
            visibility: hidden;
            opacity: 0;
        }
        &::after {
            position: absolute;
            content: "";
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%) scale(.2);
            transform: translate(-50%, -50%) scale(.2);
            width: 10px;
            height: 10px;
            background-color: hsl(var(--main));
            border-radius: 50%;
            transition: .2s linear;
            z-index: 1;
            visibility: hidden;
            opacity: 0;
        }
        &:checked {
            background-color: hsl(var(--main)) !important;
            border-color: hsl(var(--main)) !important;
            box-shadow: none;
            &[type=checkbox] {
                background-image:none;
            }
            &::before {
                visibility: visible;
                opacity: 1;
            }
        }
    }
    .form-check-label {
        font-weight: 500;
        width: calc(100% - 18px);
        padding-left: 12px;
        cursor: pointer;
        @include font-14; 
        color: hsl(var(--heading-color)); 
        font-family: var(--poppins-font)
    }
    label {
        @include xsm-screen {
            @include font-15; 
        }
    }
    a {
        @include xsm-screen {
            @include font-15; 
        }
    }
}

`
