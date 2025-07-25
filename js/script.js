const tasks = [];
let activeFilter = "all";

const addTask = () => {
  const inputTask = document.getElementById("inputTask");
  const inputDate = document.getElementById("inputDate");

  const inputTaskValue = inputTask.value.trim();
  const inputDateValue = inputDate.value;

  if (inputTaskValue && inputDateValue) {
    tasks.push({
      task: inputTaskValue,
      date: inputDateValue,
      completed: false,
    });

    console.log(tasks);

    updateTasksList();

    inputTask.value = "";
    inputDate.value = "";
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = tasks
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => {
      if (activeFilter === "pending") return !task.completed;
      if (activeFilter === "completed") return task.completed;
      return true;
    });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
            <tr>
              <td colspan="4" align="center">No task found</td>
            </tr>
        `;
    return;
  }

  filteredTasks.forEach((item, index) => {
    const newTask = document.createElement("tr");

    newTask.innerHTML = `
            <td class="tssk">${item.task}</td>
            <td class="dueDate">${item.date}</td>
            <td class="status">
                <span class="${item.completed ? "completed" : "pending"}">
                    ${item.completed ? "Completed" : "Pending"}
                </span></td>
            <td class="actions">
                <i class="bx ${
                  item.completed ? "bx-undo" : "bx-check"
                } " onClick="statusTask(${item.originalIndex})"></i>
                <i class="bx bx-edit-alt" onClick="editTask(${
                  item.originalIndex
                })"></i>
                <i class="bx bx-trash" onClick="deleteTask(${
                  item.originalIndex
                })"></i>
            </td>
        `;

    taskList.append(newTask);
  });
};

const deleteAllButton = document.getElementById("deleteAllButton");
deleteAllButton.addEventListener("click", function () {
  tasks.length = 0;
  updateTasksList();
});

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
};

const statusTask = (index) => {
  tasks[index].completed = !tasks[index].completed;

  updateTasksList();
};

const editTask = (index) => {
  const inputTask = document.getElementById("inputTask");
  const inputDate = document.getElementById("inputDate");

  inputTask.value = tasks[index].task;
  inputDate.value = tasks[index].date;

  tasks.splice(index, 1);
  updateTasksList();
};

document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  addTask();
});

updateTasksList();

// FILTER
const filterButton = document.getElementById("filterButton");
const filterMenu = document.getElementById("filterMenu");
const filterItems = Array.from(document.querySelectorAll(".filterItems"));

filterButton.addEventListener("click", function () {
  filterMenu.classList.toggle("open");
});

filterItems.forEach((item) => {
  item.addEventListener("click", function () {
    filterItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    const text = item.textContent.trim().toLowerCase();
    if (text === "pending") {
      activeFilter = "pending";
    } else if (text === "completed") {
      activeFilter = "completed";
    } else {
      activeFilter = "all";
    }

    updateTasksList();
    filterMenu.classList.remove("open");
  });
});

document.addEventListener("click", function (e) {
  if (!filterButton.contains(e.target) && !filterMenu.contains(e.target)) {
    filterMenu.classList.remove("open");
  }
});
