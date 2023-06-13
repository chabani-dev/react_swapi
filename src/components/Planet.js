import axios from "axios";
import {useState, useEffect} from "react";

export default function Planet() {
    const [planet, setPlanet] = useState(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [id, setId] = useState(2);
    const [url, setUrl] = useState(`https://swapi.dev/api/planets/${id}`)

    useEffect(()=> {
        axios.get(url)
            .then(response=>{
                console.log(response.data);
                setPlanet(response.data);
                setLoaded(true);
            })
            .catch(err=>{
                console.log(err.response.status);
                setError(err.response.status);
                setLoaded(true);
            });
    },[url]);

    function handleSubmit(e){
        e.preventDefault();
        console.log("le formulaire a été soumis");
        setUrl(`https://swapi.dev/api/planets/${id}`);
    }


    if(!loaded){
        return (
            <h1>en cours de chargement...</h1>
        )
    } else if(error){
        return(
            <h1>{`vous avez une erreur ${error}`}</h1>
        )
    } else {
        return(
            <>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => {
                        setId(e.target.value);
                        }}/>
                    <button>Valider</button>
                </form>

                <h1>{planet.name}</h1>
                <p>Rotation : {planet.rotation_period} heures</p>
                <p>Révolution : {planet.orbital_period} jours</p>
            </>
        )
    }
}