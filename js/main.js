// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Получаем кнопку обратной связи и список тем заявки.
const openDialogButton = document.getElementById('open-order-dialog');
const orderTopicSelect = document.getElementById('order-topic');

// Открываем форму для консультации из блока обратной связи.
openDialogButton.addEventListener('click', () => {
  successMessage.hidden = true;
  selectedProductInput.value = '';
  orderTopicSelect.value = 'consultation';
  orderDialog.showModal();
});

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    successMessage.hidden = true;
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;
    orderTopicSelect.value = 'product';

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Модификатор ошибки соответствует БЭМ-элементу конкретного поля.
function getFieldErrorClass(element) {
  if (element.type === 'checkbox') return 'order-form__checkbox--error';
  if (element.tagName === 'SELECT') return 'order-form__select--error';
  if (element.tagName === 'TEXTAREA') return 'order-form__textarea--error';
  return 'order-form__input--error';
}

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();
  successMessage.hidden = true;

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
      element.classList.remove(getFieldErrorClass(element));
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
        element.classList.add(getFieldErrorClass(element));
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});
