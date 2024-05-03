/**
 * Frage ChatGPT nach Mitarbeiterzahl
 * @customfunction
 */

function GPT(prompt = "") {
    const url = 'https://api.openai.com/v1/chat/completions';
    const payload = {
        model: 'gpt-3.5-turbo-16k',
        messages: [{"role": "user", "content": prompt}
        ],
        max_tokens: 150 // Adjust max_tokens as needed
    };

    const options = {
        method: 'post',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + OPENAI_API_KEY
        },
        payload: JSON.stringify(payload)
    };

    try {
        const response = UrlFetchApp.fetch(url, options);
        const data = JSON.parse(response.getContentText());
        const answer = data.choices[0].message.content;
        return answer;
    } catch (error) {
        console.error('An error occurred in askScrapeGPT:', error);
        return '';
    }
}