document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('be-agent-btn').addEventListener('click', function () {
        document.getElementById('agent-form').classList.toggle('hidden');
    });

    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const age = parseInt(document.getElementById('age').value, 10);
        const pseudo = document.getElementById('pseudo').value.trim();
        const userId = document.getElementById('user-id').value.trim();
        const discordProfile = "https://discord.com/users/" + userId

        if (!name || !surname || age < 0 || !pseudo || !userId || !discordProfile) {
            showResponse('Veuillez remplir tous les champs correctement.', true);
            return;
        }

        const data = {
            content: `Nom : ${name}\nPrénom : ${surname}\nÂge : ${age}\nPseudo : ${pseudo}\nID : ${userId}\nProfil Discord : ${discordProfile}`
        };

        fetch('https://discord.com/api/webhooks/1347488457425158154/DprGQ9_rHZfZhtt-N-BzdlTVoaRSrK4IuxSlgoGXqB5Y7TMN8calFQM0-6TJT9y8Jwxd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur avec le webhook. Code de réponse: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            showResponse(`Merci ${name} ${surname}, votre demande a été envoyée!`, false);
            document.getElementById('form').reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
            showResponse('Thank you ! If an error as occured, Dryz3R prevent you.', true);
        });
    });

    function showResponse(message, isError) {
        const responseElement = document.getElementById('response');
        responseElement.innerHTML = message;
        responseElement.classList.remove('hidden');
        if (isError) {
            responseElement.classList.add('error');
        } else {
            responseElement.classList.remove('error');
        }
    }
})