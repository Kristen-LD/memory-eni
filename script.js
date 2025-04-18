
/* UTILISATEUR */
const nomUtilisateur = document.getElementById("prenom");
nomUtilisateur.addEventListener("input", function () {
  if (nomUtilisateur.value.length < 3) {
    document.getElementById("phraseCachée").style.display = "block";
    document.getElementById("error").style.display = "block";
    document.getElementById("valid").style.display = "none";
  } else {
    document.getElementById("phraseCachée").style.display = "none";
    document.getElementById("valid").style.display = "block";
    document.getElementById("error").style.display = "none";
  }
});

/* MAIL */
const emailUtilisateur = document.getElementById("email");
emailUtilisateur.addEventListener("input", function () {
  if (!emailUtilisateur.validity.valid) {
    document.getElementById("phraseCachée2").style.display = "block";
    document.getElementById("error2").style.display = "block";
    document.getElementById("valid2").style.display = "none";
  } else {
    document.getElementById("phraseCachée2").style.display = "none";
    document.getElementById("valid2").style.display = "block";
    document.getElementById("error2").style.display = "none";
  }
});

/* PASSWORD */

const passwordUtilisateur = document.getElementById("password");
passwordUtilisateur.addEventListener("input", function () {
  // Affiche la valeur entrée pour comprendre ce que l'utilisateur a saisi
  console.log("Mot de passe saisi : ", passwordUtilisateur.value);

  // Vérification avec l'attribut pattern (même regex que celle dans l'HTML)
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const isValidPassword = regex.test(passwordUtilisateur.value);

  // Affiche la validation de l'input HTML et la validation de la regex
  console.log(
    "Validité du mot de passe selon pattern HTML : ",
    passwordUtilisateur.validity.valid
  );
  console.log("Validité du mot de passe selon regex : ", isValidPassword);

  if (!isValidPassword) {
    // Affichage dynamique des messages d'erreur
    console.log("Le mot de passe n'est pas valide selon la regex.");

    document.getElementById("phraseCachée3").style.display = "block";
    document.getElementById("error3").style.display = "block";
    document.getElementById("valid3").style.display = "none";
  } else {
    console.log("Le mot de passe est valide.");

    document.getElementById("phraseCachée3").style.display = "none";
    document.getElementById("valid3").style.display = "block";
    document.getElementById("error3").style.display = "none";
  }
});

/* Force du mot de passe */
const diff1 = document.querySelector("#diff1");
const diff2 = document.querySelector("#diff2");
const diff3 = document.querySelector("#diff3");

passwordUtilisateur.addEventListener("input", function () {
  const pwd = passwordUtilisateur.value;

  // Réinitialiser l'affichage
  diff1.style.display = "none";
  diff2.style.display = "none";
  diff3.style.display = "none";

  if (pwd.length < 1) {
    return; // Vide
  }
  if (pwd.length <= 6) {
    diff1.style.display = "block"; // Faible
  }
  if (pwd.length > 6) {
    diff1.style.display = "block"; // Faible
  }

  //Les expressions régulières s’utilisent avec .test()\\

  if (pwd.length > 5 && (/\d/.test(pwd) || /[^A-Za-z0-9]/.test(pwd))) {
    diff1.style.display = "block";
    diff2.style.display = "block"; // Moyen
  }
  if (pwd.length > 8 && /\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
    diff1.style.display = "block"; // Faible
    diff2.style.display = "block"; // Moyen
    diff3.style.display = "block"; // Fort
  }
});

/*CONFIRM_PASSWORD */
const VerifPasswordUtilisateur = document.getElementById("vmdp");

VerifPasswordUtilisateur.addEventListener("input", function () {
  if (VerifPasswordUtilisateur.value !== passwordUtilisateur.value) {
    document.getElementById("phraseCachée4").style.display = "block";
    document.getElementById("error4").style.display = "block";
    document.getElementById("valid4").style.display = "none";
  } else {
    document.getElementById("phraseCachée4").style.display = "none";
    document.getElementById("valid4").style.display = "block";
    document.getElementById("error4").style.display = "none";
  }
});

//////*STORAGE_FORMULAIRE*//////

// Sélectionne le formulaire
const form = document.getElementById("userForm");

form.addEventListener("submit", function (e) {
  //e = event
  e.preventDefault(); // Empêche l'envoi classique du formulaire
  //  Traiter les données toi-même avec JavaScript.
  // Les stocker dans localStorage, les envoyer avec fetch, etc.
  //Et garder l’utilisateur sur la même page sans rechargement.

  // Récupère les valeurs du formulaire
  const prenom = document.getElementById("prenom").value.trim(); //trim() en JavaScript est utilisée pour supprimer les espaces blancs au début et à la fin d'une chaîne de caractères
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const vmdp = document.getElementById("vmdp").value;

 // On récupère les utilisateurs existants dans le localStorage
const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

  // Vérifier si l'email existe déjà (avec boucle for)//////////////////////////////////////
  let emailExiste = false;

  for (let i = 0; i < utilisateurs.length; i++) {
    let user = utilisateurs[i];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      emailExiste = true;
      break;
    }
  }

  // Si email déjà utilisé, on bloque
  if (emailExiste) {
    alert("Un compte avec cet email existe déjà !");
    return;
  }


  // Vérifie si les champs sont valides
  if (prenom.length >= 3 && email && password === vmdp) {
    // Objet à stocker
    const utilisateur = {
      prenom: prenom,
      email: email,
      password: password,
    };


   // Récupère les utilisateurs déjà stockés, ou un tableau vide si aucun utilisateur n'est trouvé
   let utilisateursStockes = JSON.parse(localStorage.getItem("utilisateurs")) || [];

   // Ajoute le nouvel utilisateur au tableau
   utilisateursStockes.push(utilisateur);

    // Stockage dans localStorage
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateursStockes)); //localStorage est un objet qui permet de stocker des données localement dans le navigateur, sans expiration (contrairement aux cookies).
    //a méthode setItem() permet de sauvegarder une clé et une valeur dans le stockage local du navigateur.
    alert("Vos informations ont été enregistrées !"); //JSON.stringify() est une méthode qui convertit un objet JavaScript en une chaîne de caractères JSON.
    form.reset(); // Réinitialise le formulaire                               //Cela permet de stocker un objet dans localStorage puisque localStorage ne peut stocker que des chaînes de caractères.
  } else {
    alert("Merci de vérifier vos informations avant de valider.");
  }
});

// Afficher les utilisateurs stockés dans la console (optionnel)
const utilisateursStockes = JSON.parse(localStorage.getItem("utilisateurs"));
if (utilisateursStockes) {
  console.table(utilisateursStockes);
}

// Afficher les infos stockées dans une autre page (ex. profil.html)
const utilisateur = JSON.parse(localStorage.getItem("utilisateurs"));
if (utilisateur) {
  // Ici, tu peux afficher des informations supplémentaires sur les utilisateurs, comme dans ton code précédent
  utilisateur.forEach(user => {
    document.getElementById("affichePrenom").textContent = user.prenom;
    document.getElementById("afficheEmail").textContent = user.email;
  });
}




////////////////////////CONNEXION/LOGIN/////////////////////////////


document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value.trim();
  const password = document.getElementById("password").value;

  // Récupérer tous les utilisateurs depuis le localStorage
  const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

  // Vérifier si un utilisateur correspond
  let utilisateurTrouvé = false;

  for (let i = 0; i < utilisateurs.length; i++) {
    let user = utilisateurs[i];
    if (
      user.prenom.toLowerCase() === prenom.toLowerCase() &&
      user.password === password
    ) {
      utilisateurTrouvé = true;
      break;
    }
  }

  const messageDiv = document.getElementById("messageConnexion");

  if (utilisateurTrouvé) {
    messageDiv.textContent = "Connexion réussie ! Bienvenue 👋";
    messageDiv.style.color = "green";

    // Tu peux aussi enregistrer l'utilisateur connecté :
    localStorage.setItem("utilisateurConnecté", prenom);
   // Redirection après une courte pause (optionnel, pour laisser apparaître le message)
    setTimeout(() => {
    window.location.href = "profil.html";
    }, 1500); // Redirige après 1.5 secondes

   
  } else {
    messageDiv.textContent = "Nom ou mot de passe incorrect.";
    messageDiv.style.color = "red";
  }
});