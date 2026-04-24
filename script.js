
// 🌐 PAGE READY

window.onload = function () {

 
    // Load Saved Goal
    let savedGoal = localStorage.getItem("goal");
    if (savedGoal && document.getElementById("goalText")) {
        document.getElementById("goalText").innerText = savedGoal;
    }

    // Chart
    const ctx = document.getElementById("chart");

    if (ctx) {
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: [{
                    label: "Study Hours",
                    data: [2, 3, 4, 3, 5, 2],
                    backgroundColor: [
                        "red", "blue", "green",
                        "orange", "purple", "cyan"
                    ]
                }]
            }
        });
    }

};


// 🔄 LOGIN / REGISTER

function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

function login() {
    window.location = "index.html";
}

function register() {
    document.getElementById("msg").innerText = "Registered Successfully!";
}


// 📜 SCROLL

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}


// 🎥 VIDEO SECTION

function playVideo(mood) {

    let v = document.getElementById("video");

    let links = {
        tired: "2OEL4P1Rz04",
        motivated: "rfscVS0vtbw",
        stress: "inpok4MKVLM",
        focus: "ZXsQAXx_ao0",
        lazy: "xFvU8lq6nJU"
    };

    v.innerHTML =
        `<iframe width="300" height="200"
        src="https://www.youtube.com/embed/${links[mood]}"
        allowfullscreen></iframe>`;
}


async function detectMood() {

let camera = document.getElementById("camera");
let text = document.getElementById("aiText");
let loader = document.getElementById("loader");
let yt = document.getElementById("ytVideo");
let box = document.getElementById("aiRecommend");

loader.style.display = "block";
text.innerText = "🤖 Loading AI Models...";

try {

await faceapi.nets.tinyFaceDetector.loadFromUri("models");
await faceapi.nets.faceExpressionNet.loadFromUri("models");

const stream = await navigator.mediaDevices.getUserMedia({
video:true
});

camera.srcObject = stream;

camera.onloadedmetadata = function(){

camera.play();

text.innerText = "📷 Camera Started...";

setTimeout(async()=>{

text.innerText = "🧠 Analyzing Mood...";

const result = await faceapi
.detectSingleFace(
camera,
new faceapi.TinyFaceDetectorOptions()
)
.withFaceExpressions();

loader.style.display = "none";

if(result){

let exp = result.expressions;
let mood = "";

// =====================
// MOOD DETECTION
// =====================

if(exp.happy > 0.60){

mood = "MOTIVATED 😎";
yt.src =
"//www.youtube.com/embed/Tq1r6FiBfrE?autoplay=1&mute=1";

}

else if(exp.sad > 0.55){

mood = "TIRED 😴";
yt.src =
"//www.youtube.com/embed/2OEL4P1Rz04?autoplay=1&mute=1";

}

else if(exp.angry > 0.45 || exp.fearful > 0.45){

mood = "STRESS 😣";
yt.src =
"//www.youtube.com/embed/ZToicYcHIOU?autoplay=1&mute=1";

}

else if(exp.neutral > 0.80){

mood = "FOCUS 🎯";
yt.src =
"https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1";

}

else if(exp.sad > 0.25 && exp.neutral > 0.40){

mood = "LAZY 🥱";
yt.src =
"//www.youtube.com/embed/ZXsQAXx_ao0?autoplay=1&mute=1";

}

else{

mood = "NATURAL 🙂";
yt.src =
"//www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1";

}

text.innerText = "Detected Mood: " + mood;

// =====================
// AI RECOMMENDATION
// =====================

if(mood.includes("STRESS")){

box.innerHTML =
"🧘 <b>You seem stressed</b><br><br>" +
"• Take a 5 minute break<br>" +
"• Listen calm background music<br>" +
"• Drink water and relax<br>" +
"• Resume with small tasks";

}

else if(mood.includes("TIRED")){

box.innerHTML =
"😴 <b>You look tired</b><br><br>" +
"• Have coffee or tea<br>" +
"• Do light stretching<br>" +
"• Refresh your face<br>" +
"• Start with easy topic";

}

else if(mood.includes("FOCUS")){

box.innerHTML =
"🎯 <b>Excellent focus detected</b><br><br>" +
"• Start deep study session<br>" +
"• Solve difficult problems now<br>" +
"• Avoid notifications<br>" +
"• Use Pomodoro method";

}

else if(mood.includes("MOTIVATED")){

box.innerHTML =
"🔥 <b>Highly motivated mood</b><br><br>" +
"• Complete pending tasks now<br>" +
"• Practice mock tests<br>" +
"• Study high priority topics<br>" +
"• Keep momentum strong";

}

else if(mood.includes("LAZY")){

box.innerHTML =
"😴 <b>Low energy detected</b><br><br>" +
"• Start with only 10 minutes<br>" +
"• Keep mobile away<br>" +
"• Sit properly at desk<br>" +
"• Action creates motivation";

}

else{

box.innerHTML =
"🙂 <b>Balanced normal mood</b><br><br>" +
"• Continue regular study plan<br>" +
"• Revise important concepts<br>" +
"• Maintain consistency<br>" +
"• Stay positive and productive";

}

}else{

text.innerText = "❌ No Face Detected";

box.innerHTML =
"🙂 Please face the camera properly and try again.";

}

stream.getTracks().forEach(track=>track.stop());

},3000);

};

}catch(error){

loader.style.display = "none";
text.innerText = "❌ Error Loading";
console.log(error);

}
}



// 🎯 GOAL SAVE

function saveGoal(){

let goal = document.getElementById("goal").value;

localStorage.setItem("goal",goal);

document.getElementById("goalText").innerText =
"Today's Goal: " + goal;

}


// ⏱ TIMER

// let totalTime = 90;
// let timerInterval;

// function startTimer() {

//     clearInterval(timerInterval);

//     let timer = document.getElementById("timer");

//     timerInterval = setInterval(function () {

//         let min = Math.floor(totalTime / 60);
//         let sec = totalTime % 60;

//         timer.innerText =
//             `${min}:${sec < 10 ? "0" : ""}${sec}`;

//         totalTime--;

//         if (totalTime < 0) {

//             clearInterval(timerInterval);

//             document.getElementById("alarmSound").play();

//             alert("⏰ Time Up!");

//             totalTime = 60;
//         }

//     }, 1000);
// }

// function stopTimer() {
//     clearInterval(timerInterval);
// }


// 🎵 MUSIC

function playMusic() {
    new Audio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    ).play();
}

// 🍔 FOOD SUGGESTION

function suggestFood(mood) {

    let foods = {
        tired: "☕ Coffee + 🍌 Banana",
        stress: "🍫 Dark Chocolate + 🥗 Salad",
        focus: "🥜 Nuts + 🫐 Berries",
        lazy: "🥤 Shake + 🍎 Apple",
        motivated: "🥗 Protein Salad + 🥤 Smoothie",
        confused: "🍵 Green Tea + 🍫 Chocolate",
        sleepy: "☕ Strong Coffee + 🍎 Apple",
        happy: "🍩 Donut + 🧃 Juice"
    };

    document.getElementById("foodMsg").innerText =
        foods[mood];
}


// 📚 OPEN PDF

function openPDF(file) {
    window.open(file, "_blank");
}


// 📈 PROGRESS

let progress = 0;

function updateProgress() {

    progress++;

    document.getElementById("progressText").innerText =
        "Tasks completed: " + progress;
}

// 💡 MOTIVATION

let quotes = [

    "Push yourself, because no one else will.",
    "Success starts with self-discipline.",
    "Small steps daily = big success.",
    "Stay focused and never give up.",
    "Don’t stop until you’re proud.",
    "Dream big, start small, act now.",
    "Focus on your goal, not obstacles.",
    "Consistency beats motivation every time.",
    "Study now, shine later.",
    "Make today awesome."

];

function newQuote() {

    let random =
        quotes[Math.floor(Math.random() * quotes.length)];

    document.getElementById("quote").innerText = random;

    let speech = new SpeechSynthesisUtterance(random);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}


// ℹ ABOUT / CONTACT

function showSection(id) {

    document.getElementById("about")
        .classList.remove("show-section");

    document.getElementById("contact")
        .classList.remove("show-section");

    document.getElementById(id)
        .classList.add("show-section");

    setTimeout(() => {
        document.getElementById(id).scrollIntoView({
            behavior: "smooth"
        });
    }, 100);
}


let totalTime = 1500;   // 90 Minutes Study Time
let timerInterval;

function startTimer() {

    clearInterval(timerInterval);

    let timer = document.getElementById("timer");

    timerInterval = setInterval(function () {

        let min = Math.floor(totalTime / 60);
        let sec = totalTime % 60;

        timer.innerText =
        `${min}:${sec < 10 ? "0" : ""}${sec}`;

        totalTime--;

        // Study Complete
        if (totalTime < 0) {

            clearInterval(timerInterval);

            document.getElementById("alarmSound").play();

            alert("⏰ Study Time Completed!");

            startRestTimer();   // Auto Rest Start
        }

    }, 1000);
}


// 5 MIN REST TIMER
function startRestTimer(){

    let restTime = 5 * 60; // 5 Minutes
    let timer = document.getElementById("timer");

    // Food Section Scroll
    document.getElementById("food").scrollIntoView({
        behavior:"smooth"
    });

    timerInterval = setInterval(function(){

        let min = Math.floor(restTime / 60);
        let sec = restTime % 60;

        timer.innerText =
        `Break ${min}:${sec < 10 ? "0" : ""}${sec}`;

        restTime--;

        if(restTime < 0){

            clearInterval(timerInterval);

            document.getElementById("alarmSound").play();

            alert("🔥 Break Over! Back To Study");

            totalTime = 90 * 60; // Reset 90 Minutes
        }

    },1000);

}


// STOP BUTTON
function stopTimer() {
    clearInterval(timerInterval);
}


window.addEventListener("load", function(){
setTimeout(()=>{
document.getElementById("loader-screen").style.display="none";
},800);
});


window.addEventListener("load", function(){

document.getElementById("loader-screen").style.display="none";

});


// =======================================
// FINAL 90 QUESTIONS MOCK TEST JS
// 9 Subjects × 10 Questions
// =======================================

let time = 600;
let t;

function startTest(){

let sub = document.getElementById("subject").value;

if(sub==""){
alert("Please Select Subject");
return;
}

clearInterval(t);
time = 600;

document.getElementById("questions").style.display="block";
document.getElementById("timer").style.display="block";
document.getElementById("result").style.display="none";
document.getElementById("result").innerHTML="";

let q = "";

// ===================================================
// MATHEMATICS
// ===================================================

if(sub=="math"){

q = `
Q1: 2+2=?<br>
<input type="radio" name="q1" value="a">4
<input type="radio" name="q1" value="b">5<br><br>

Q2: Derivative of x² ?<br>
<input type="radio" name="q2" value="a">2x
<input type="radio" name="q2" value="b">x<br><br>

Q3: sin90=?<br>
<input type="radio" name="q3" value="a">1
<input type="radio" name="q3" value="b">0<br><br>

Q4: cos0=?<br>
<input type="radio" name="q4" value="a">1
<input type="radio" name="q4" value="b">0<br><br>

Q5: √16=?<br>
<input type="radio" name="q5" value="a">4
<input type="radio" name="q5" value="b">5<br><br>

Q6: π=?<br>
<input type="radio" name="q6" value="a">3.14
<input type="radio" name="q6" value="b">2.14<br><br>

Q7: tan45=?<br>
<input type="radio" name="q7" value="a">1
<input type="radio" name="q7" value="b">0<br><br>

Q8: 10/2=?<br>
<input type="radio" name="q8" value="a">5
<input type="radio" name="q8" value="b">2<br><br>

Q9: 5²=?<br>
<input type="radio" name="q9" value="a">25
<input type="radio" name="q9" value="b">20<br><br>

Q10: ∫1 dx=?<br>
<input type="radio" name="q10" value="a">x
<input type="radio" name="q10" value="b">1<br><br>
`;
}

// ===================================================
// DSA
// ===================================================

else if(sub=="dsa"){

q = `
Q1: Stack follows?<br><input type="radio" name="q1" value="a">LIFO <input type="radio" name="q1" value="b">FIFO<br><br>
Q2: Queue follows?<br><input type="radio" name="q2" value="a">FIFO <input type="radio" name="q2" value="b">LIFO<br><br>
Q3: Root node in?<br><input type="radio" name="q3" value="a">Tree <input type="radio" name="q3" value="b">Array<br><br>
Q4: Push means?<br><input type="radio" name="q4" value="a">Insert <input type="radio" name="q4" value="b">Delete<br><br>
Q5: Pop means?<br><input type="radio" name="q5" value="a">Delete <input type="radio" name="q5" value="b">Insert<br><br>
Q6: Array starts?<br><input type="radio" name="q6" value="a">0 <input type="radio" name="q6" value="b">1<br><br>
Q7: Binary tree child?<br><input type="radio" name="q7" value="a">2 <input type="radio" name="q7" value="b">3<br><br>
Q8: Queue insert?<br><input type="radio" name="q8" value="a">Enqueue <input type="radio" name="q8" value="b">Push<br><br>
Q9: Queue delete?<br><input type="radio" name="q9" value="a">Dequeue <input type="radio" name="q9" value="b">Pop<br><br>
Q10: Graph has?<br><input type="radio" name="q10" value="a">Vertices <input type="radio" name="q10" value="b">Pages<br><br>
`;
}

// ===================================================
// JAVA
// ===================================================

else if(sub=="java"){

q = `
Q1: Java is?<br><input type="radio" name="q1" value="a">Language <input type="radio" name="q1" value="b">Browser<br><br>
Q2: JVM means?<br><input type="radio" name="q2" value="a">Java Virtual Machine <input type="radio" name="q2" value="b">Java Value Method<br><br>
Q3: Java supports?<br><input type="radio" name="q3" value="a">OOP <input type="radio" name="q3" value="b">DBMS<br><br>
Q4: Java ext?<br><input type="radio" name="q4" value="a">.java <input type="radio" name="q4" value="b">.js<br><br>
Q5: Print command?<br><input type="radio" name="q5" value="a">System.out.println() <input type="radio" name="q5" value="b">printf()<br><br>
Q6: Creator?<br><input type="radio" name="q6" value="a">James Gosling <input type="radio" name="q6" value="b">Ritchie<br><br>
Q7: class is?<br><input type="radio" name="q7" value="a">Keyword <input type="radio" name="q7" value="b">Function<br><br>
Q8: Java is?<br><input type="radio" name="q8" value="a">Platform Independent <input type="radio" name="q8" value="b">Dependent<br><br>
Q9: Package for?<br><input type="radio" name="q9" value="a">Grouping <input type="radio" name="q9" value="b">Delete<br><br>
Q10: Inheritance?<br><input type="radio" name="q10" value="a">Yes <input type="radio" name="q10" value="b">No<br><br>
`;
}

// ===================================================
// DBMS
// ===================================================

else if(sub=="dbms"){

q = `
Q1: DBMS full form?<br><input type="radio" name="q1" value="a">Database Management System <input type="radio" name="q1" value="b">Digital Base System<br><br>
Q2: SQL used for?<br><input type="radio" name="q2" value="a">Database <input type="radio" name="q2" value="b">Game<br><br>
Q3: Primary key is?<br><input type="radio" name="q3" value="a">Unique <input type="radio" name="q3" value="b">Duplicate<br><br>
Q4: Row = ?<br><input type="radio" name="q4" value="a">Tuple <input type="radio" name="q4" value="b">Key<br><br>
Q5: Column = ?<br><input type="radio" name="q5" value="a">Attribute <input type="radio" name="q5" value="b">Tuple<br><br>
Q6: Foreign key links?<br><input type="radio" name="q6" value="a">Tables <input type="radio" name="q6" value="b">HTML<br><br>
Q7: ER model means?<br><input type="radio" name="q7" value="a">Entity Relation <input type="radio" name="q7" value="b">Error Run<br><br>
Q8: SQL command insert?<br><input type="radio" name="q8" value="a">INSERT <input type="radio" name="q8" value="b">PUSH<br><br>
Q9: Delete command?<br><input type="radio" name="q9" value="a">DELETE <input type="radio" name="q9" value="b">REMOVE<br><br>
Q10: DBMS stores?<br><input type="radio" name="q10" value="a">Data <input type="radio" name="q10" value="b">Water<br><br>
`;
}

// ===================================================
// Remaining Subjects concise full 10 questions each
// ===================================================

// ===================================
// REMAINING 5 SUBJECTS CODE
// OS / CN / SE / PYTHON / C
// ===================================

// ================= OS =================
else if(sub=="os"){

q = `
Q1: OS full form?<br>
<input type="radio" name="q1" value="a">Operating System
<input type="radio" name="q1" value="b">Open Software<br><br>

Q2: CPU scheduling belongs to?<br>
<input type="radio" name="q2" value="a">OS
<input type="radio" name="q2" value="b">HTML<br><br>

Q3: RAM is?<br>
<input type="radio" name="q3" value="a">Memory
<input type="radio" name="q3" value="b">Mouse<br><br>

Q4: Deadlock means?<br>
<input type="radio" name="q4" value="a">Resource waiting
<input type="radio" name="q4" value="b">Shutdown<br><br>

Q5: Process means?<br>
<input type="radio" name="q5" value="a">Program in execution
<input type="radio" name="q5" value="b">Keyboard<br><br>

Q6: FCFS means?<br>
<input type="radio" name="q6" value="a">First Come First Serve
<input type="radio" name="q6" value="b">Fast CPU First Start<br><br>

Q7: Paging used for?<br>
<input type="radio" name="q7" value="a">Memory Management
<input type="radio" name="q7" value="b">Typing<br><br>

Q8: Kernel is?<br>
<input type="radio" name="q8" value="a">Core of OS
<input type="radio" name="q8" value="b">Mouse<br><br>

Q9: Thread is?<br>
<input type="radio" name="q9" value="a">Lightweight process
<input type="radio" name="q9" value="b">Cable<br><br>

Q10: Linux is?<br>
<input type="radio" name="q10" value="a">Operating System
<input type="radio" name="q10" value="b">Compiler<br><br>
`;
}

// ================= CN =================
else if(sub=="cn"){

q = `
Q1: LAN means?<br>
<input type="radio" name="q1" value="a">Local Area Network
<input type="radio" name="q1" value="b">Long Area Network<br><br>

Q2: WAN means?<br>
<input type="radio" name="q2" value="a">Wide Area Network
<input type="radio" name="q2" value="b">Wireless Area Node<br><br>

Q3: Router used for?<br>
<input type="radio" name="q3" value="a">Routing
<input type="radio" name="q3" value="b">Printing<br><br>

Q4: IP full form?<br>
<input type="radio" name="q4" value="a">Internet Protocol
<input type="radio" name="q4" value="b">Internal Program<br><br>

Q5: HTTP used for?<br>
<input type="radio" name="q5" value="a">Web Communication
<input type="radio" name="q5" value="b">Gaming<br><br>

Q6: TCP is?<br>
<input type="radio" name="q6" value="a">Protocol
<input type="radio" name="q6" value="b">Cable<br><br>

Q7: Hub works at?<br>
<input type="radio" name="q7" value="a">Physical Layer
<input type="radio" name="q7" value="b">Session Layer<br><br>

Q8: Switch used in?<br>
<input type="radio" name="q8" value="a">Network
<input type="radio" name="q8" value="b">Kitchen<br><br>

Q9: URL means?<br>
<input type="radio" name="q9" value="a">Uniform Resource Locator
<input type="radio" name="q9" value="b">User Run Link<br><br>

Q10: Modem used for?<br>
<input type="radio" name="q10" value="a">Internet
<input type="radio" name="q10" value="b">Typing<br><br>
`;
}

// ================= SE =================
else if(sub=="se"){

q = `
Q1: SE full form?<br>
<input type="radio" name="q1" value="a">Software Engineering
<input type="radio" name="q1" value="b">System Engine<br><br>

Q2: SDLC means?<br>
<input type="radio" name="q2" value="a">Software Development Life Cycle
<input type="radio" name="q2" value="b">System Design Loop Cycle<br><br>

Q3: Testing used for?<br>
<input type="radio" name="q3" value="a">Find Errors
<input type="radio" name="q3" value="b">Cooking<br><br>

Q4: UML means?<br>
<input type="radio" name="q4" value="a">Unified Modeling Language
<input type="radio" name="q4" value="b">User Main Logic<br><br>

Q5: Requirement phase in?<br>
<input type="radio" name="q5" value="a">SDLC
<input type="radio" name="q5" value="b">Hardware<br><br>

Q6: Waterfall is?<br>
<input type="radio" name="q6" value="a">Model
<input type="radio" name="q6" value="b">Browser<br><br>

Q7: Maintenance means?<br>
<input type="radio" name="q7" value="a">Update software
<input type="radio" name="q7" value="b">Delete PC<br><br>

Q8: Bug means?<br>
<input type="radio" name="q8" value="a">Error
<input type="radio" name="q8" value="b">Game<br><br>

Q9: Feasibility means?<br>
<input type="radio" name="q9" value="a">Possible or not
<input type="radio" name="q9" value="b">Typing<br><br>

Q10: Project manager handles?<br>
<input type="radio" name="q10" value="a">Project
<input type="radio" name="q10" value="b">Printer<br><br>
`;
}

// ================= PYTHON =================
else if(sub=="python"){

q = `
Q1: Python is?<br>
<input type="radio" name="q1" value="a">Programming Language
<input type="radio" name="q1" value="b">Browser<br><br>

Q2: print() used for?<br>
<input type="radio" name="q2" value="a">Output
<input type="radio" name="q2" value="b">Input<br><br>

Q3: Python uses indentation?<br>
<input type="radio" name="q3" value="a">Yes
<input type="radio" name="q3" value="b">No<br><br>

Q4: Python creator?<br>
<input type="radio" name="q4" value="a">Guido van Rossum
<input type="radio" name="q4" value="b">James Gosling<br><br>

Q5: File extension?<br>
<input type="radio" name="q5" value="a">.py
<input type="radio" name="q5" value="b">.java<br><br>

Q6: Input function?<br>
<input type="radio" name="q6" value="a">input()
<input type="radio" name="q6" value="b">scan()<br><br>

Q7: List is?<br>
<input type="radio" name="q7" value="a">Collection
<input type="radio" name="q7" value="b">Loop<br><br>

Q8: Python is case sensitive?<br>
<input type="radio" name="q8" value="a">Yes
<input type="radio" name="q8" value="b">No<br><br>

Q9: len() gives?<br>
<input type="radio" name="q9" value="a">Length
<input type="radio" name="q9" value="b">Delete<br><br>

Q10: Python supports OOP?<br>
<input type="radio" name="q10" value="a">Yes
<input type="radio" name="q10" value="b">No<br><br>
`;
}

// ================= C =================
else if(sub=="c"){

q = `
Q1: C developed by?<br>
<input type="radio" name="q1" value="a">Dennis Ritchie
<input type="radio" name="q1" value="b">James Gosling<br><br>

Q2: C is?<br>
<input type="radio" name="q2" value="a">Programming Language
<input type="radio" name="q2" value="b">Browser<br><br>

Q3: printf() used for?<br>
<input type="radio" name="q3" value="a">Output
<input type="radio" name="q3" value="b">Input<br><br>

Q4: scanf() used for?<br>
<input type="radio" name="q4" value="a">Input
<input type="radio" name="q4" value="b">Output<br><br>

Q5: C file extension?<br>
<input type="radio" name="q5" value="a">.c
<input type="radio" name="q5" value="b">.cpp<br><br>

Q6: Header file?<br>
<input type="radio" name="q6" value="a">stdio.h
<input type="radio" name="q6" value="b">python.h<br><br>

Q7: Main function?<br>
<input type="radio" name="q7" value="a">main()
<input type="radio" name="q7" value="b">start()<br><br>

Q8: Loop keyword?<br>
<input type="radio" name="q8" value="a">for
<input type="radio" name="q8" value="b">repeat<br><br>

Q9: %d used for?<br>
<input type="radio" name="q9" value="a">Integer
<input type="radio" name="q9" value="b">String<br><br>

Q10: C supports pointers?<br>
<input type="radio" name="q10" value="a">Yes
<input type="radio" name="q10" value="b">No<br><br>
`;
}

document.getElementById("questions").innerHTML = q;

t = setInterval(()=>{

let m = Math.floor(time/60);
let s = time%60;

document.getElementById("timer").innerHTML =
m + ":" + (s<10?"0":"") + s;

if(time<=0){
clearInterval(t);
submitTest();
return;
}

time--;

},1000);

}

function submitTest(){

clearInterval(t);

let score = 0;

for(let i=1;i<=10;i++){
if(document.querySelector(`input[name="q${i}"]:checked`)?.value=="a"){
score++;
}
}

let percent = (score/10)*100;
let status = percent>=50 ? "PASS ✅" : "FAIL ❌";

document.getElementById("result").style.display="block";

document.getElementById("result").innerHTML =
"Score: "+score+"/10 <br><br>" +
"Percentage: "+percent+"% <br><br>" +
"Result: "+status;

}

// ===============================
// FULL FRESH AI RECOMMENDATION JS
// ===============================

