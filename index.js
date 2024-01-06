const slider = document.querySelector('.slider');
const lengthText = document.querySelector('[data-length]');
const upperCheck = document.querySelector('#uppercase');
const lowerCheck = document.querySelector('#lowercase');
const numberCheck = document.querySelector('#numbers');
const symbolCheck = document.querySelector('#symbols');
const allcheck = document.querySelectorAll('input[type="checkbox"]');
const genbtn = document.querySelector('#btn');
const copybtn = document.querySelector('.copy-icon');
let datamsg = document.querySelector('#dataMsg');
let pass = document.querySelector('[displaypass]');
let passwordLength = 10;
let checkcount = 0;
let indicator = document.querySelector('#s-indicator');
handelSlider();
let password = "";
upperCheck.checked=true;
function handelSlider()
{
    slider.value = passwordLength;
    lengthText.innerText = passwordLength;
    const max = slider.max;
    const min = slider.min;
    slider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}
slider.addEventListener("input", () => {
    if(slider.value<checkcount){slider.value=checkcount}
    passwordLength = slider.value;
    handelSlider();
 });

function getranInt(min, max) {
    return Math.floor(Math.random() * (max - min) )+ min;
}
function getranNum() {
    return getranInt(0, 9);
}
function getranUpper() {
    return String.fromCharCode(getranInt(65, 91));
}
function getranLower() {
    return String.fromCharCode(getranInt(97, 123));
}
function getranSym() {
    let sym = "!@#$%^&*()-_+=[]{}|;'\"/<>?:";
    return sym.charAt(getranInt(0, sym.length));
}

allcheck.forEach((element) => {
    element.addEventListener("change", function () {
        checkcount = 0;
        allcheck.forEach((e) => {
            if (e.checked) {
                checkcount++;
            }
        })
        if(slider.value<checkcount){slider.value=checkcount}
        passwordLength = slider.value;
        handelSlider();
    })
})



genbtn.addEventListener("click", () => {
    if (slider.value < checkcount) { slider.value = checkcount }
    handelSlider();
    password = "";
    let funarr = [];
    let n = passwordLength;
    if (upperCheck.checked) {
        funarr.push(getranUpper);
        password += getranUpper();
        n--;
    }
    if (lowerCheck.checked) {
        funarr.push(getranLower);
        password += getranLower();
        n--;
    }
    if (numberCheck.checked) {
        funarr.push(getranNum);
        password += getranNum();
        n--;
    }
    if (symbolCheck.checked) {
        funarr.push(getranSym);
        password += getranSym();
        n--;
    }
    for (let i = 0; i <n; i++){
        password += funarr[getranInt(0, funarr.length)]();
    }
    password=shuffle(password);
    pass.value = password;
    colorhandel();
   
})

function shuffle(password) {
    var a = password.split("");
    for (let i = 0; i < password.length; i++){
        let j = getranInt(0, password.length);
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a.join('');
}


copybtn.addEventListener('click', () => {

    if (pass.value.length >= 1) {
        navigator.clipboard.writeText(pass.value);
        datamsg.innerText = 'Copied';
        datamsg.classList.add('dta');
        setTimeout(() => {
            datamsg.classList.remove('dta');
            datamsg.innerText = '';
        }, 2000);
    }
})

function colorhandel() {
    if ((passwordLength >= 8 && (upperCheck.checked == true || lowerCheck.checked == true) && (numberCheck.checked == true || symbolCheck.checked == true)) || (passwordLength>=8 && symbolCheck.checked==true)) {
        indicator.style.backgroundColor = 'green';
    }
    else {
        indicator.style.backgroundColor = 'red';
    }
}