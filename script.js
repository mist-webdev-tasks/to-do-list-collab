document.addEventListener('DOMContentLoaded', (event) => {
    // Task management
    let newtaskbtn = document.querySelector("#newtaskbutton");

    newtaskbtn.onclick = () => {
        var input = document.getElementById("newtask");
        var newTask = input.value.trim();
        if (newTask !== "") {
            var item = document.createElement("li");
            item.className = "list-group-item";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input me-2";

            var taskText = document.createElement("span");
            taskText.className = "task-text";
            taskText.innerText = newTask;

            var deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn btn btn-danger ms-2";
            deleteBtn.innerText = "Delete";
            deleteBtn.disabled = true;

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    taskText.classList.add("checked");
                    deleteBtn.disabled = false;
                } else {
                    taskText.classList.remove("checked");
                    deleteBtn.disabled = true;
                }
            });

            deleteBtn.onclick = () => {
                item.remove();
            };

            item.appendChild(checkbox);
            item.appendChild(taskText);
            item.appendChild(deleteBtn);

            document.querySelector(".task-box").appendChild(item);

            input.value = "";
            input.placeholder = "enter next task...";
        }
    };

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

    // Timer management
    const timerButtons = {
        focus: 25 * 60,
        shortbreak: 5 * 60,
        longbreak: 15 * 60
    };
    let timerInterval;
    let currentTime = timerButtons.focus; // default to focus time
    let originalTime = timerButtons.focus;

    document.getElementById('focus').addEventListener('click', () => setTimer(timerButtons.focus));
    document.getElementById('shortbreak').addEventListener('click', () => setTimer(timerButtons.shortbreak));
    document.getElementById('longbreak').addEventListener('click', () => setTimer(timerButtons.longbreak));
    document.getElementById('start').addEventListener('click', () => startTimer());
    document.getElementById('stop').addEventListener('click', () => stopTimer());
    document.getElementById('restart').addEventListener('click', () => restartTimer());

    function setTimer(duration) {
        currentTime = duration;
        originalTime = duration;
        displayTime();
        stopTimer();
    }

    function startTimer() {
        let timer = currentTime, minutes, seconds;
        timerInterval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            document.getElementById('time-left').textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
            } else {
                currentTime = timer;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function restartTimer() {
        stopTimer();
        currentTime = originalTime;
        displayTime();
        startTimer();
    }

    function displayTime() {
        let minutes = parseInt(currentTime / 60, 10);
        let seconds = parseInt(currentTime % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('time-left').textContent = minutes + ":" + seconds;
    }

    displayTime(); // Initial display of the default time
});
