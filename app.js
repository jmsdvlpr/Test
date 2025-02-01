// app.js

const moodButtons = document.querySelectorAll(".mood-btn");
const moodNoteInput = document.getElementById("mood-note");
const saveMoodButton = document.getElementById("save-mood");
const moodLogContainer = document.getElementById("mood-log");
const moodChartCanvas = document.getElementById("moodChart");

let moodData = [];
let moodCounts = { happy: 0, sad: 0, neutral: 0, angry: 0 };

// Load saved mood data
function loadMoodData() {
    const savedMoodData = JSON.parse(localStorage.getItem("moodData"));
    if (savedMoodData) {
        moodData = savedMoodData;
        updateMoodHistory();
        updateMoodChart();
    }
}

// Save mood data to local storage
function saveMoodData() {
    localStorage.setItem("moodData", JSON.stringify(moodData));
}

// Update mood history section
function updateMoodHistory() {
    moodLogContainer.innerHTML = moodData
        .map(entry => `<p>${entry.date}: ${entry.mood} - ${entry.note}</p>`)
        .join('');
}

// Update mood chart
function updateMoodChart() {
    const moodChart = new Chart(moodChartCanvas, {
        type: "bar",
        data: {
            labels: ["Happy", "Sad", "Neutral", "Angry"],
            datasets: [{
                label: "Mood Frequency",
                data: [
                    moodCounts.happy,
                    moodCounts.sad,
                    moodCounts.neutral,
                    moodCounts.angry,
                ],
                backgroundColor: ["#ffcc00", "#ff4444", "#777", "#ff5733"],
            }],
        },
    });
}

// Handle mood selection
moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        const mood = button.id;
        const note = moodNoteInput.value;

        const moodEntry = {
            date: new Date().toLocaleString(),
            mood: mood,
            note: note,
        };

        moodData.push(moodEntry);
        moodCounts[mood]++;

        saveMoodData();
        updateMoodHistory();
        updateMoodChart();
        moodNoteInput.value = ""; // Clear the note input
    });
});

loadMoodData();
