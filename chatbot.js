const chatbotResponses = {
    "quando arriva l'autobus": "L'autobus arriverà tra 5 minuti!",
    "dove comprare il biglietto": "Puoi acquistare il biglietto online qui",
    "ciao": "Ciao! Come posso aiutarti?",
    "grazie": "Di niente! 😊"
};
// Aggiungi questa funzione per creare il div custom
function createCustomDiv() {
    const customDiv = document.createElement("div");
    customDiv.classList.add("message", "botTicket"); // ✅ Corretto - due classi separate
    customDiv.innerHTML = `
        
            <h3>LINE 500</h3>
            <img src="/img/busNow3d.png" alt="">
            <p>Coming in 5 min</p>
            <button class="btnAiTicket">Buy Ticket for <br> 5.00€ </button>
        
    `;
    // Aggiungi comportamento al bottone
  const button = customDiv.querySelector('.btnAiTicket');
  button.addEventListener('click', () => {
    window.open("https://buy.stripe.com/test_8wMdSHfwLaL00G4eUU");
  });
    return customDiv;
}
function addMessage(text, sender) {
    const messagesContainer = document.querySelector('.messagesContainer')
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Aggiungi il div custom se la risposta contiene "biglietto"
    if (sender === "bot" && text.toLowerCase().includes("biglietto")) {
        setTimeout(() => {
            messagesContainer.appendChild(createCustomDiv());
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 700); // Ritardo per effetto graduale
    }
}

// Funzione per rispondere in modo dinamico in base al contenuto del messaggio
function chatbotResponse(userInput) {
    const message = userInput.toLowerCase().trim();

for (let key in chatbotResponses) {
    // Divide la chiave in parole
    const keywords = key.toLowerCase().split(/\s+/);
    // Verifica se almeno una parola della chiave è presente nel messaggio
    if (keywords.some(keyword => message.includes(keyword))) {
        return chatbotResponses[key];
    }
}

return "Mi dispiace, non ho capito. Puoi riformulare la domanda?";
}

document.getElementById("aiTextArea").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const userMessage = this.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, "user");
        this.value = "";

        const response = chatbotResponse(userMessage);
        setTimeout(() => addMessage(response, "bot"), 500);
    }
});