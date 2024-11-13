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


async function writeQuestionInTheSpeechBubble() {
    const question = document.getElementById("question").value;
    if (!question) return; 

    const answer = await askOpenAI(question);
    console.log(answer);
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

    // Add a small delay to ensure elements are rendered before scrolling
    setTimeout(scrollToBottom, 200);

    document.getElementById("question").value = "";
}



function resetDropdown() {
document.getElementById("hints").selectedIndex = 0;
}

async function askOpenAI(question) {
   try {
       const response = await fetch("https://api.openai.com/v1/chat/completions", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer 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"
           },
           body: JSON.stringify({
               model: "gpt-3.5-turbo", // Das korrekte Modell für den Chat-Endpunkt
               messages: [{ role: "user", content: question }], // Verwenden Sie das 'messages'-Format für Chat-Modelle
               max_tokens: 50,
               temperature: 0.5,
           })
       });

       if (!response.ok) {
           const errorDetails = await response.json();
           console.log("Fehlerdetails:", errorDetails);
           throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
       }

       const data = await response.json();
       if (!data.choices || !data.choices[0]) {
           console.log("Unerwartete Antwortstruktur:", data);
           throw new Error("Die Antwort enthält keine 'choices'-Daten.");
       }

       return data.choices[0].message.content.trim();
   } catch (error) {
       console.error("Fehler:", error.message);
       return "Es gab ein Problem mit der Anfrage.";
   }
}

function PressEnter() {
   const questionInput = document.getElementById("question");
   questionInput.addEventListener("keypress", function(event) {
       if (event.key === "Enter") { // Check if the Enter key is pressed
           event.preventDefault();   // Prevent default form submission behavior
           writeQuestionInTheSpeechBubble(); // Call function to handle the question
       }
   });
}

PressEnter();

window.onload = function(){
   loadConversation();
}

function scrollToBottom() {
    const questionContainer = document.getElementById("questionContainer");
    const lastBubble = questionContainer.lastElementChild;
    if (lastBubble) {
        lastBubble.scrollIntoView({ behavior: "smooth", block: "end" });
    }
}
