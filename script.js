document.addEventListener('DOMContentLoaded', function () {
    // Gestion du bouton pour afficher/masquer le formulaire
    document.getElementById('be-agent-btn').addEventListener('click', function () {
        document.getElementById('agent-form').classList.toggle('hidden');
    });

    // Gestion de l'envoi du formulaire
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const age = parseInt(document.getElementById('age').value, 10);
        const pseudo = document.getElementById('pseudo').value.trim();
        const userId = document.getElementById('user-id').value.trim();
        const discordProfile = "https://discord.com/users/" + userId

        // Validation des données
        if (!name || !surname || age < 0 || !pseudo || !userId || !discordProfile) {
            showResponse('Veuillez remplir tous les champs correctement.', true);
            return;
        }

        // Préparer les données à envoyer au webhook
        const data = {
            content: `Nom : ${name}\nPrénom : ${surname}\nÂge : ${age}\nPseudo : ${pseudo}\nID : ${userId}\nProfil Discord : ${discordProfile}`
        };

        // Envoi des données au webhook
        fetch('https://discord.com/api/webhooks/1346786936202727526/UCqqwakiL3DiVyiPFNzZ6fLRCzTM7lHhnxcaahtRfBKv7vnZV46LwatHkRLcDEneVfH6', {
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
            document.getElementById('form').reset(); // Réinitialiser le formulaire
        })
        .catch(error => {
            console.error('Erreur:', error);
            showResponse('Une erreur est survenue. Veuillez réessayer.', true);
        });
    });

    // Fonction pour afficher les messages de réponse
    function showResponse(message, isError) {
        const responseElement = document.getElementById('response');
        responseElement.innerHTML = message;
        responseElement.classList.remove('hidden');
        if (isError) {
            responseElement.classList.add('error'); // Ajouter une classe pour les messages d'erreur si nécessaire
        } else {
            responseElement.classList.remove('error');
        }
    }

    // Fonction pour déplacer les GIFs (facultatif)
    // function moveGifs() { ... }
    // setInterval(moveGifs, 4000);
});