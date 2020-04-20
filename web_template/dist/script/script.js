window.onload = function () {
    let overflow = document.createElement('div');

    //вызов фомы по клику
    $('#btnFooter').click(function () {
        overflow.className = 'overflow';
        document.body.appendChild(overflow);
        overflow.innerHTML = formHTML;

        $('#formBtnModal').click(function (event) {
            if (validateForm(event.target.closest('#formModal'))) {
                sendFormAjax('result', 'formModal');
                overflow.innerHTML = popupHTML;
            }
            return false;
        })

        stopProp();
    });

    //удаляет оверфлоу
    overflow.onclick = function () {
        overflow.remove();
    }


    $('#formBtn').click(function (event) {
        if (validateForm(event.target.closest('#form'))) {
            sendFormAjax('result', 'form');
        }
        return false;
    })

}


// вставка формы
const formHTML = `
<div class="form form__modal">
    <div class="form-container form-modal-container">
        <h3 class="form__name">Send us message</h3>
        <form action="" method="post" class="contactForm contactFormModal" id="formModal">
            <div class="form__item">
                <label for="feedback-name" class="form__item-label">Full name</label>
                <input type="text" name="name" class="form__item-input form__item-input-name" placeholder="Your name">
            </div>
            <div class="form__item">
                <label for="feedback-email" class="form__item-label">Email</label>
                <input type="email" name="email" class="form__item-input" placeholder="Your email">
            </div>
            <div class="form__item">
                <label for="feedback-message" class="form__item-label">Message</label>
                <textarea class="form__item-input form__item-message" name="message" 
                                      placeholder="Your message"></textarea>
            </div>
            <div class="form__button">
                            <button type="submit" class="form__button-btn btn" id="formBtnModal">Submit</button>
            </div>
        </form>
    </div>
</div>`


const popupHTML = `<div class="popup">
                        <div class="popup-container">
                            <p class="popup__text">Request sent successfully!</p>
                            <span class="popup__text">Thank you!</span>
                        </div>
                    </div>`


// снимает кликубирающий оверлэй с формы
let stopProp = () => {
    let modal = document.querySelector('.form__modal');
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}


// Валидация формы
// form = форма по которой кликнули
function validateForm(form) {
    let name = form.querySelector('[name="name"]'),
        email = form.querySelector('[name="email"]'),
        message = form.querySelector('[name="message"]');

    if (!name.value.match(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u)) {
        alert('Please enter your name');
        return false
    }

    if (!email.value.match(/.+@.+\..+/i)) {
        alert('Please enter your email');
        return false
    }

    if (message.value.length <= 5) {
        alert('Please enter your message');
        return false
    } else {
        return true;
    }
}


//отправка формы
function sendFormAjax(result, form) {
    const url = 'action.php';
    $.ajax({
        url: url,
        type: "POST",
        data: $("#" + form).serialize()
    });
}
