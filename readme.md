### To do app
La web app è sviluppata in ReactJS, inizializzata tramite ViteJS.

Per avviare la web app in locale, scaricare il codice, aprire un terminale, entrare nella cartella todoApp, eseguire il comando `npm install` per installare le dipendenze necessarie, dopodiché eseguire il comando `npm run dev`. Di default, la web app dovrebbe essere raggiungibile all'indirizzo http://localhost:5173; in caso la porta 5173 sia già occupata da un altro processo, la web app verrà avviata su una porta differente, verificabile dall'output del terminale.

#### Premessa
Le chiamate al backend sono simulate dalle fake REST API https://jsonplaceholder.typicode.com/todos. Il database consiste in una lista di 200 oggetti che rappresentano dei task di una todo list. Ogni oggetto contiene 4 chiavi:
- id, da 1 a 200, univoco;
- idUser, da 1 a 10, indica l'utente che può vedere/modificare il task;
- title, stringa, indica le istruzioni per completare il task;
- completed, boolean, indica se il task è stato completato o no.

L'utilizzo di questa fake API presenta dei limiti di utilizzo della web app:
- NON È POSSIBILE CREARE PIÙ DI UN NUOVO TASK: infatti, il metodo POST utilizzato per simulare la creazione di un task, restituisce un oggetto con id 201 (seguendo la progressività degli id salvati sul database) ma non aggiunge l'elemento al database. Questo significa che, ad ogni chiamata del metodo POST, il nuovo task avrà sempre id 201, creando un conflitto e problemi nelle funzionalità della web app (i task vengono visualizzato mappando la variabile locale "tasks" utilizzando id come key univoca);
- SI POSSONO EFFETTUARE MODIFICHE (cambiare il testo del task o segnarlo come completato/non completato) SOLO AI TASK GIÀ PRESENTI E NON AL NUOVO TASK CREATO DALL'UTENTE. Infatti, per modificare un task viene fatta una chiamata con metodo PUT all'indirizzo https://jsonplaceholder.typicode.com/todos/:id, dove :id rappresenta l'id del task da modificare. Dal momento che la creazione dei task non aggiunge veramente il task al database, se si prova ad effettuare una modifica al task con id = 201, la chiamata restituisce un errore in quanto https://jsonplaceholder.typicode.com/todos/201 non corrisponde a nessun task.

#### Test
Tenendo conto di quanto detto sopra, possono essere effettuati i seguenti test:
- creazione nuovo task (purtroppo, non potra essere modificato; per tornare alla situazione iniziale, ricaricare la pagina);
- modifica testo di un task già esistente;
- segnare un task già esistente come "completato";
- cancellazione task esistente;
- simulazione errore di collegamento con il backend: è sufficiente cancellare una lettera qualsiasi dalla variabile `apiUrl` in /src/api/api.js;
- simulazione mancata ricezione dei dati: è sufficiente sostituire `setTasks(data)` con `setTasks('')` alla riga 15 di /src/components/TasksList.js;
- simulazione nessun task presente: cancellare tutti i task presenti o sostituire `setTasks(data)` con `setTasks([])` alla riga 15 di /src/components/TasksList.js.

Per simulare l'accesso di un altro utente, cambiare il valore della chiave id nello stato `user` alla riga 6 di /src/App.js.
