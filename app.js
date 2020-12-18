document.addEventListener('DOMContentLoaded', (e) => {
    console.log(`Document is ready!`);

    (() => {
        const xmlhttp = new XMLHttpRequest();
        const dinos = [];

        // TODO: Create Dino Constructor
        function Dino(species, weight, height, diet, where, when, fact) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where;
            this.when = when;
            this.fact = fact;
            this.facts = [fact];
            this.image = './images/' + species.toLowerCase() + '.png';
        }

        // TODO: Create Dino Objects
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const dinoData = JSON.parse(this.responseText).Dinos;
                dinoData.forEach((dino) => {
                    dinos.push(
                        new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact)
                    );
                });

                console.log(dinos);

            }
        };
        xmlhttp.open("GET", "./dino.json", true);
        xmlhttp.send();


        // TODO: Create Human Object

        // TODO: Use IIFE to get human data from form

        // TODO: Create Dino Compare Method 1

        // TODO: Create Dino Compare Method 2

        // TODO: Create Dino Compare Method 3

        // TODO: Generate Tiles for each Dino in Array

        // TODO: Add tiles to DOM

        // TODO: Remove form from screen

        // TODO: On button click, prepare and display infographic
    })();
});