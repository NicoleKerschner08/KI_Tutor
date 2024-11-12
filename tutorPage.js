

function loadConversation() {
     const conversation = JSON.parse(localStorage.getItem("conversation")) || [];

     const questionContainer = document.getElementById("questionContainer");
     conversation.forEach(entry => {
         const questionDiv = document.createElement("div");
         questionDiv.textContent = entry.question;
         questionDiv.className = "question-bubble";

         const answerDiv = document.createElement("div");
         answerDiv.textContent = entry.answer;
         answerDiv.className = "answer-bubble";

         questionContainer.appendChild(questionDiv);
         questionContainer.appendChild(answerDiv);
     });
 }

 function saveConversation(question, answer) {
     const conversation = JSON.parse(localStorage.getItem("conversation")) || [];
     conversation.push({ question, answer });
     localStorage.setItem("conversation", JSON.stringify(conversation));
 }

 function deleteOldConversation(){
     localStorage.clear();
     const questionContainer = document.getElementById("questionContainer");
     questionContainer.innerHTML = "";    
 }


 function writeQuestionInTheSpeechBubble() {
     const question = document.getElementById("question").value;
     if (!question) return; 

     const answer = "This is an answer."; 
     const questionContainer = document.getElementById("questionContainer");

     const questionDiv = document.createElement("div");
     questionDiv.textContent = question;
     questionDiv.className = "question-bubble";

     const answerDiv = document.createElement("div");
     answerDiv.textContent = answer;
     answerDiv.className = "answer-bubble";

     questionContainer.appendChild(questionDiv);
     questionContainer.appendChild(answerDiv);


     saveConversation(question, answer);


     document.getElementById("question").value = "";
 }

 window.onload = loadConversation;

function resetDropdown() {
 document.getElementById("hints").selectedIndex = 0;
}