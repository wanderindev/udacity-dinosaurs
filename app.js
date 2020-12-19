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

            // TODO: Create Dino Compare Method 1
            this.compareHeight = (human) => {
                const diff = this.height - human.height;

                if (diff > 0) {
                    return 'You are shorter than a ' + this.species;
                } else if (diff < 0) {
                    return 'You are taller than a ' + this.species;
                } else {
                    return 'You are the same height as a ' + this.species;
                }
            }

            // TODO: Create Dino Compare Method 2
            this.compareWeight = (human) =>  {
                const diff = this.weight - human.weight;

                if (diff > 0) {
                    return 'You are lighter than a ' + this.species;
                } else if (diff < 0) {
                    return 'You are heavier than a ' + this.species;
                } else {
                    return 'You are the same weight as a ' + this.species;
                }
            }

            // TODO: Create Dino Compare Method 3
            this.compareDiet = (human) =>  {
                const diff = this.weight - human.weight;

                if (this.diet === human.diet) {
                    return 'You and a ' + this.species + ' have the same diet';
                } else {
                    return 'You and a ' + this.species + ' have different diets';
                }
            }
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

            dinos.forEach((dino) => {
                console.log(dino.compareHeight(human));
                console.log(dino.compareWeight(human));
                console.log(dino.compareDiet(human));
            });

        });
    })();
});