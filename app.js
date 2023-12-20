const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show Error Message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show seccess message
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Email validation
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, 'Email is not Valid');
    }
}

// First Solution
// form.addEventListener('submit', function(e){
//     e.preventDefault();

//     if(username.value === ''){
//         showError(username, 'Username is required');
//     }else{
//         showSuccess(username);
//     }

//     if(email.value === ''){
//         showError(email, 'email is required');
//     }else if(!isValidEmail(email.value)){
//         showError(email, 'Email is not valid');
//     }else{
//         showSuccess(email);
//     }

//     if(password.value === ''){
//         showError(password, 'password is required');
//     }else{
//         showSuccess(password);
//     }

//     if(password2.value === ''){
//         showError(password2, 'Confirmed password is required');
//     }else{
//         showSuccess(password2);
//     }
// });



// 2nd Solution
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        }
    });
}
form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});


// Get Field Name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Password Match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match');
    }else if(input1.value == input2.value && input1.value > 1){
        showSuccess(input2);
    }
}

// Check Length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }
}