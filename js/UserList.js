import {
  getUserListByLocalStorage,
  setUserListToLocalStorage,
} from "./LocalStorage.js";

import {
  postUser,
  deleteUser,
  postTodoItem,
  deleteTodoItems,
  deleteTodoItem,
  reviseTodoItem,
  revisePriorityOfTodoItem,
  toggleCompleteOfTodoItem,
} from "./Fetch.js";

import { renderTodoListOfUser } from "./TodoList.js";

export const initUserList = () => {
  const userList = getUserListByLocalStorage();
  const $target = document.querySelector(".user-create-button");

  if (userList) {
    userList.map((user) => {
      addUserBtnToUserList(user, $target);
    });
  }
  const $userCreateBtn = document.querySelector(".user-create-button");
  const $userList = document.getElementById("user-list");
  $userList.addEventListener("click", renderTodoListOfUser);

  $userCreateBtn.addEventListener("click", onUserCreateHandler);
};

const onUserCreateHandler = async ({ target }) => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (!userName || userName.length === 1) {
    alert("2글자 이상의 username을 입력하세요!");
    return;
  }
  const user = await postUser(userName);
  postTodoItem(user._id, "contents 1");
  postTodoItem(user._id, "contents 2");
  postTodoItem(user._id, "contents 3");
  addUserBtnToUserList(user, target);
  setUserListToLocalStorage();
};
function addUserBtnToUserList(user, target) {
  const $userBtn = createUserButton(user);

  $userBtn.setAttribute("id", user._id);
  $userBtn.innerText = user.name;

  const $userList = document.getElementById("user-list");

  $userList.insertBefore($userBtn, target);
}
const createUserButton = (user) => {
  const $button = document.createElement("button");
  $button.classList.add("ripple", "userBtn");
  $button.setAttribute("id", user._id);
  $button.innerText = user.name;
  return $button;
};
