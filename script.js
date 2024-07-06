document.addEventListener('DOMContentLoaded', (event) => {
    // Task management
    const newtaskbtn = document.querySelector("#newtaskbutton");
    const newtaskInput = document.getElementById("newtask");
    const taskList = document.querySelector(".task-box");

    // Function to add a new task
    function addTask(taskText) {
        const item = document.createElement("li");
        item.className = "list-group-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";

        const taskSpan = document.createElement("span");
        taskSpan.className = "task-text";
        taskSpan.innerText = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn btn btn-danger ms-2";
        deleteBtn.innerText = "Delete";
        deleteBtn.disabled = true;

        // Event listener for checkbox change
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskSpan.classList.add("checked");
                deleteBtn.disabled = false;
            } else {
                taskSpan.classList.remove("checked");
                deleteBtn.disabled = true;
            }
        });

        // Event listener for delete button
        deleteBtn.onclick = () => {
            item.remove();
        };

        // Append elements to task item
        item.appendChild(checkbox);
        item.appendChild(taskSpan);
        item.appendChild(deleteBtn);

        taskList.appendChild(item);

        newtaskInput.value = "";
        newtaskInput.placeholder = "enter next task...";
    }

    // Add task on button click
    newtaskbtn.onclick = () => {
        const newTaskText = newtaskInput.value.trim();
        if (newTaskText !== "") {
            addTask(newTaskText);
        }
    };

    // Add task on Enter key press
    newtaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newTaskText = newtaskInput.value.trim();
            if (newTaskText !== "") {
                addTask(newTaskText);
            }
        }
    });

    // Tab switching
    document.getElementById("tasks").addEventListener("click", () => {
        document.getElementById("tasksect").classList.add("active");
        document.getElementById("tasksect").classList.remove("d-none");
        document.getElementById("timersect").classList.remove("active");
        document.getElementById("timersect").classList.add("d-none");
    });

    document.getElementById("timer").addEventListener("click", () => {
        document.getElementById("tasksect").classList.remove("active");
        document.getElementById("tasksect").classList.add("d-none");
        document.getElementById("timersect").classList.add("active");
        document.getElementById("timersect").classList.remove("d-none");
    });

    // Timer management (if needed, you can add your existing timer code here)
});
