var design = anime({
  targets: 'svg #XMLID5',
  keyframes: [
    {translateX: -500},
    {rotateY: 180},
    {translateX: 920},
    {rotateY: 0},
    {translateX: -500},
    {rotateY: 180},
    {translateX: -500},
  ],
  easing: 'easeInOutSine',
  duration: 60000,
});

anime({
  targets: '#dust-paarticle path',
  translateY: [10, -150],
  direction: 'alternate',
  loop: true,
  delay: function(el, i, l) {
    return i * 100;
  },
  endDelay: function(el, i, l) {
    return (l - i) * 100;
  }
});

function LogUp() {
	name = document.querySelector(".name").value;
	email = document.querySelector(".email").value;
	password = document.querySelector(".password").value;
	if (/^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/.test(name)&&
		/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(email)&&
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password))
	{
		// Создание объекта массива
		let data = {
			name : name,
			email: email,
			password : password
		};
		//console.log(data);
		// Создание AJAX запроса
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "input.php", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		// Отправка данных на сервер
		xhr.send(JSON.stringify(data));
		// Обработка ответа от сервера
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					// Действия при успешной отправке данных
					console.log("Данные успешно отправлены на сервер");
					document.querySelector(".name").value = "";
					document.querySelector(".email").value = "";
					document.querySelector(".password").value = "";
					createModal("Успех", `Аккаунт ${email} успешно создан`);
				} else {
					// Действия при ошибке отправки данных
					console.error("Ошибка при отправке данных на сервер");
					createModal("Ошибка", "Невозможно отправить данные на сервер");
				}
			}
		}
	}
	else
	{
		//console.warn("Ошибка заполнения. Поле не заполнено или содержит запрещенные символы.");
		createModal("Ошибка заполнения.", "Поле не заполнено или содержит запрещенные символы.");
		return;
	}
}

function createModal(title, content) {
  // Создание элементов модального окна
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", "modalLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.setAttribute("id", "modalLabel");
  modalTitle.textContent = title;

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.textContent = content;

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const closeModalButton = document.createElement("button");
  closeModalButton.classList.add("btn", "btn-secondary");
  closeModalButton.setAttribute("type", "button");
  closeModalButton.setAttribute("data-bs-dismiss", "modal");
  closeModalButton.textContent = "Закрыть";

  // Добавление элементов в структуру модального окна
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // Добавление модального окна в DOM
  document.body.appendChild(modal);

  // Показать модальное окно
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}