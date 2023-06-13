# Projet client Swapi

Après avoir installé un package (axios par exemple) on peut vérifier dans le fichier ``package.json``. Ce fichier nous donne également la version installée.

Insomnia permet de voir la structure de ce que nous allons recevoir dans la réponse donnée à axios : ici si nous demandons plusieurs données, nous allons les recevoir dans un objet qui aura les propriétés ``count``, ``results``... et non pas un tableau comme nous l'avons vu sur l'API Pokemon.

## Premier composant
- on créé un répertoire ``src/components``
- on créé un fichier `` People.js``
- dans ce fichier on créé une fonction que l'on nomme ``people()`` dans laquelle on fait un ``return`` d'une balise ``<h1>`` avec le texte *Hello world !*.
- dans le fichier ``src/App.js`` on remplace le contenu de l'instruction ``return`` par le nom du nouveau composant créé ``<People />`` et on import ce composant avec la ligne de code :

```js
import People from "./components/People.js";
```

## Utilisation d'axios
Pour utiliser axios (qui est un **client Http**), on va utilise la méthode ``useState`` de ``react``, et ajouter 3 variables ``people``, ``error`` et ``loaded``. ``axios`` permet d'envoyer une requête vers l'API et de récupérer une réponse. Cette réponse a le statut ok ou error. Pour pouvoir traiter ces différents types de réponse on utilisera les variables créées.
- ``people`` stockera la réponse quand tout va bien
- ``error`` stockera la réponse en cas d'erreur

 Nous sommes en mode promesse (js asychrone) : pour éviter que le composant ne se charge avant de recevoir la réponse à la requête envoyée par ``axios``, nous utilisons la variable ``loaded`` qui conditionnera l'affichage du composant : si ``loaded === false`` on affichera que nous sommes *en cours de chargement*, et nous pourrons afficher la réponse à la requête quand ``loaded===true``

 Grâce à des instruction ``console.log`` bien placées, on arrive à identifier les informations qui vont nous intéresser : on ne va garder que ``response.data`` si c'est ok et ``err.response.status`` si on a une erreur.

 Une fois la réponse récupérée et stockée dans la bonne variable on peut changer le statut de ``loaded`` en lui mettant la valeur ``true``.

 L'utilisation d'``axios`` s'arr^te là pour le moment, nous disposons de tout ce dont on a besoin.

 ## Affichage du composant
 L'affichage du composant est conditionné par la variable ``loaded`` :
 - si ``!loaded`` (càd ``loaded === false``) on affichera le message *en cours de chargement*
 - si ``loaded`` (càd on est dans le ``else``) on pourra avoir 2 situations possibles :
    - on récupère une erreur (``error !== null``) : on affiche cette erreur en concaténant le statut récupéré avec le message *vous avez une erreur...*
    - on récupère la réponse désirée : on affiche les propriétés de l'objet qu'on récupère, qui nous intéressent. Par exemple :
    ```js
    <>
        <h1>{people.name}</h1>
        <p>Poids : {people.mass} kg</p>
        <p>Taille : {people.height/100} m</p>
    </>
    ```

# Bonus : utilisation d'un formulaire
On créé le formulaire en JSX :
```js
<form action="" >
    <input type="text" />
    <button>Valider</button>
</form>
```

on va ensuite ajouter un écouteur d'évènement de type ``onSubmit`` qui déclenchera la fonction ``handleSubmit()``. Cette fonction pour le moment, affichera le message *le formulaire a été soumis* dans la console.

On ajoute aussi un autre écouteur d'évènement de type ``onChange`` qui va afficher dans la console la valeur entrée dans le ``<input>`` à chaque fois que cette valeur change. Pour aller plus loin, on créé la variable ``id`` dans le ``state`` qui permettra de stocker chaque changement. On obtient ceci :

```js
<form action="" onSubmit={handleSubmit}>
    <input type="text" onChange={(e) => {
        console.log(e.target.value)
        setId(e.target.value);
        }}/>
    <button>Valider</button>
</form>
```

On va utiliser useEffect et lui dire de recharger le composant à chaque fois que l'``id`` est modifié. La valeur de ``id`` va être modifiée grâce à l'écouteur d'évènement sur le ``<input>``. Ova créer une nouvelle variable ``url`` dans le state qui sera modifiée quand le formulaire sera soumis. Le traitement pour modifier ``url`` sera mis en place dans la fonction ``handleSubmit()``.

Grâce à ``useEffect``, qui se déclenchera à chaque fois que ``url``est modifiée, le composant sera actualisé avec la nouvelle ``url`` donné à axios. Attention à bien préciser ``url`` dans le 2ème argument de la méthode ``useEffect()``

# Le routeur
Pour pouvoir afficher plusieurs pages, on va devoir utiliser un routeur qui associera à une url précise, un composant.
On installe pour cela ``react-router-dom``. Puis on ajoute dans ``src/App.js`` les composant appropriés (et on les importe) ce qui donne :
```js
import './App.css';
import Home from './components/Home'
import People from './components/People';
import Planet from './components/Planet';
import Film from './components/Film';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planet" element={<Planet />}/>
        <Route path="/people" element={<People />}/>
        <Route path="/film" element={<Film />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

Ce code veut dire que le composant ``<Home/>`` s'affichera quand on tapera l'adresse ``localhost:3000/``, et ainsi de suite (``localhost:3000/people`` pour le composant ``<People/>``)... Ces url sont utilisable dans des liens ``href`` des balises ``<a>``(cf composant ``<Home/>``)

# Extra-bonus
Pour ce bonus, il s'agit de récupérer le nom des personnage dans la réponse et de l'utiliser pour renseigner une url du type ``https://starwars.fandom.com/fr/wiki/Prenom_Nom``. La propriété ``name`` nous retourne la valeur ``Prenom Nom``. Si nous parvenons à remplacer " " par "_", le problème sera résolu. Pour cela, il suffit d'utiliser la fonction ``replace()`` sur cette propriété.ce qui donne ``response.data.name.replace(" ","_")``. Nous stockons cette valeur dans une propriété du state que l'on nomme ``href``, grâce à la fonction ``setHref()`` définie grâce à ``useState()``.
```js
setHref(`https://starwars.fandom.com/fr/wiki/${response.data.name.replace(" ", "_")}`)
```

Il suffit alors de placer cette variable dans l'attribut ``href`` due balise ``<a>``.
```js
<a target="_blank" href={href}>Lien vers fandom</a>
```