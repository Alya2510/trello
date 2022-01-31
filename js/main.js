const board = document.querySelector(".board");
const formForAdd = document.querySelector(".add-column .add-form");
const buttonAddColumn = document.querySelector(".add-column .add-button");
const formInput = document.querySelector(".add-form input");
const buttonCancelAdd = document.querySelector(".add-form .cancelAdd");
const list = document.querySelectorAll(".list");
const columns = document.querySelector(".columns");

const showFormAddColumn = () => {
  formForAdd.style.display = "block";
  buttonAddColumn.style.display = "none";
  formInput.focus();
};

const hideFormAddColumn = () => {
  formForAdd.style.display = "none";
  buttonAddColumn.style.display = "block";
};

formInput.addEventListener("blur", function (event) {
  if (!event.relatedTarget) {
    formForAdd.style.display = "none";
    buttonAddColumn.style.display = "block";
    formInput.value = "";
  }
});

const addColumn = () => {
  if (!formInput.value) {
    formInput.focus();
    return;
  }

  const column = `<div class="column">
    <span class="column-name" contenteditable="true">${formInput.value}</span>
    <div class="column-options-button">...</div>
    <div class="options-popup hidden">
      <div class="close-option-button">
        <i class="fas fa-times"></i>
      </div>
      <div class="options-title">Изменить цвет</div>
      <div class="options-colors">
        <div
          class="options-color"
          style="background-color: #ef8997"
        ></div>
        <div
          class="options-color"
          style="background-color: #89ebab"
        ></div>
        <div
          class="options-color"
          style="background-color: #ebc666"
        ></div>
        <div
          class="options-color"
          style="background-color: #9bd3f4"
        ></div>
      </div>
      <div class="options-delete-button">Удалить колонку</div>
    </div>
    <div class="list"></div>
    <div class="add-card">+ Добавить карточку</div>

    <div class="form-add-card">
      <textarea name="" id="" cols="30" rows="10"></textarea>

      <div class="card-buttons">
        <div class="primary-button form-add-card-button">
          Добавить карточку
        </div>

        <div class="form-cancel-card-button">X</div>
      </div>
    </div>
  </div>`;

  columns.innerHTML += column;
  formInput.value = "";

  checkOptionsColor();
  deleteColumn();
  checkCardButtons();
  checkOptionsButton();
  draggDrop();
  checkCloseButtons();
};

function checkCardButtons() {
  const addCards = document.querySelectorAll(".add-card");
  const formAddCards = document.querySelectorAll(".form-add-card");
  const cancelAddCards = document.querySelectorAll(".form-cancel-card-button");

  addCards.forEach((button) => {
    button.addEventListener("click", ({ target }) => {
      const parent = target.closest(".column");
      const formAddCard = parent.querySelector(".form-add-card");
      const areaCard = parent.querySelector(".form-add-card textarea");

      formAddCard.style.display = "block";
      target.style.display = "none";
      areaCard.focus();
    });
  });

  cancelAddCards.forEach((button) => {
    button.addEventListener("click", ({ target }) => {
      const parent = target.closest(".column");
      const formAddCard = parent.querySelector(".form-add-card");
      const addCard = parent.querySelector(".add-card");

      formAddCard.style.display = "none";
      addCard.style.display = "block";
    });
  });

  formAddCards.forEach((form) => {
    form.addEventListener("click", ({ target }) => {
      const parent = target.closest(".column");
      const areaCard = parent.querySelector(".form-add-card textarea");
      const card = document.createElement("div");
      const list = parent.querySelector(".list");
      card.classList.add("column-card");
      card.draggable = true;
      if (!areaCard.value) return;
      card.innerHTML = areaCard.value;

      list.appendChild(card);
      areaCard.value = "";
      areaCard.focus();

      draggDrop();
    });
  });
}

function checkOptionsButton() {
  const allOptions = document.querySelectorAll(".column-options-button");

  allOptions.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parent = event.target.closest(".column");
      const popupOptions = parent.querySelector(".options-popup");

      popupOptions.classList.toggle("hidden");
    });
  });
}

function checkCloseButtons() {
  const closeButtons = document.querySelectorAll(".close-option-button");

  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parent = event.target.closest(".column");
      const popupOptions = parent.querySelector(".options-popup");

      popupOptions.classList.toggle("hidden");
    });
  });
}

function checkOptionsColor() {
  const allOptionsColor = document.querySelectorAll(".options-color");

  allOptionsColor.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parent = event.target.closest(".column");
      const backgroundColor = event.target.style.backgroundColor;
      parent.style.backgroundColor = backgroundColor;
    });
  });
}

function deleteColumn() {
  const deleteColumnButtons = document.querySelectorAll(
    ".options-delete-button"
  );

  deleteColumnButtons.forEach((button) => {
    button.addEventListener("click", ({ target }) => {
      const parent = target.closest(".column");
      parent.remove();
    });
  });
}

let dragItem = null;

const draggDrop = () => {
  const listCards = document.querySelectorAll(".column-card");
  const lists = document.querySelectorAll(".list");

  listCards.forEach((card) => {
    card.addEventListener("dragstart", () => {
      dragItem = card;
      setTimeout(() => {
        card.style.display = "none";
      }, 0);
    });

    card.addEventListener("dragend", () => {
      setTimeout(() => {
        card.style.display = "block";
        dragItem = null;
      });
    });

    lists.forEach((list) => {
      list.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,.3)";
        this.style.border = "1px dashed pink";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,0)";
        this.style.border = "none";
      });

      list.addEventListener("drop", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,0)";
        this.style.border = "none";

        this.appendChild(dragItem);
      });
    });
  });
};

deleteColumn();
checkCardButtons();
checkOptionsColor();
checkOptionsButton();
draggDrop();
checkCloseButtons();
