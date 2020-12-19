document.addEventListener('DOMContentLoaded', (e) => {
    (() => {
        const xmlhttp = new XMLHttpRequest();
        const dinos = [];
        const formName = document.getElementById('name');
        const formFeet = document.getElementById('feet');
        const formInches = document.getElementById('inches');
        const formWeight = document.getElementById('weight');
        const formDiet = document.getElementById('diet');
        const formSubmit = document.getElementById('btn');

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


        // TODO: Create Human Constructor
        function Human(name, weight, height, diet) {
            this.name = name;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.image = './images/human.png';
        }

        // TODO: Use IIFE to get human data from form

        // TODO: Create Dino Compare Method 1

        // TODO: Create Dino Compare Method 2

        // TODO: Create Dino Compare Method 3

        // TODO: Generate Tiles for each Dino in Array

        // TODO: Add tiles to DOM

        // TODO: Remove form from screen

        // TODO: On button click, prepare and display infographic
        formSubmit.addEventListener('click', () => {
            // Get all values from the form
            const name = formName.value;
            const feet = parseFloat(formFeet.value);
            const inches = parseFloat(formInches.value);
            const height = feet * 12 + inches;
            const weight = parseFloat(formWeight.value);
            const diet = formDiet.value;

            // TODO: Create a human object
            const human = new Human(name, weight, height, diet);

            console.log(human);

        });
    })();
});