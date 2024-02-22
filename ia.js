const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const chatHistory = [
    { role: 'system', content: 'Você está conversando com o CALC G IA, um assistente virtual.' }
];

async function respondToUser(apiKey) {
    let botResponse = "";

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: chatHistory
        })
    });

    const responseData = await response.json();

    if (responseData.choices && responseData.choices.length > 0) {
        botResponse = responseData.choices[0].message.content;
    } else {
        botResponse = "Desculpe, não consegui entender sua pergunta.";
    }

    return botResponse;
}

function containsProgrammingKeywords(message) {
    const programmingKeywords = ['programação', 'codigo', 'coding', 'programar', 'javascript', 'python', 'java', 'c++', 'php', 'html', 'css', 'ruby', 'typescript', 'framework', 'API', 'debug', 'IDE', 'git', 'sql', 'dev', 'backend', 'frontend', 'full stack', 'web development', 'coding bootcamp', 'machine learning', 'data science', 'chatgpt', '👨‍💻', '👩‍💻', 'código'];
    return programmingKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

function displayMessage(sender, message) {
    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${sender}:</strong> ${sanitizeHTML(message)}`;
    chatBox.appendChild(msgElement);
}

function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        if (!containsProgrammingKeywords(userMessage)) {
            displayMessage("Você", userMessage);
            chatHistory.push({ role: 'user', content: userMessage });

            // Chame a função respondToUser passando a chave da API
            const apiKey = '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';
            const botResponse = await respondToUser(apiKey);

            displayMessage("CALC G IA", botResponse);
            userInput.value = "";
        } else {
            displayMessage("CALC G IA", "Desculpe, não posso ajudar com programação.");
        }
    }
}