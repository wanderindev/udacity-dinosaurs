document.addEventListener('DOMContentLoaded', (e) => {
    console.log(`Document is ready!`);

    (() => {
        // TODO: Create Dino Constructor
        function Dino(species, weight, height, diet, where, when, fact) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where;
            this.when = when;
            this.facts = [fact];
            this.image = './images/' + species.toLowerCase() + '.png';
        }

        // TODO: Create Dino Objects
        let triceratops = new Dino('Triceratops',
            13000,
            114,
            'herbavor',
            'North America',
            'Late Cretaceous',
            'First discovered in 1889 by Othniel Charles Marsh'
        )
        console.log(triceratops);

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