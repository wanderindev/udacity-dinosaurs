/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    (() => {
        const xmlhttp = new XMLHttpRequest();
        const dinos = [];
        const formName = document.getElementById('name');
        const formFeet = document.getElementById('feet');
        const formInches = document.getElementById('inches');
        const formWeight = document.getElementById('weight');
        const formDiet = document.getElementById('diet');
        const formSubmit = document.getElementById('btn');

        // Creates the Dino constructor
        function Dino(species, weight, height, diet, where, when, fact) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where.toLowerCase();
            this.when = when.toLowerCase();
            this.fact = fact;
            this.facts = [];
            this.image = './images/' + species.toLowerCase() + '.png';

            // Sets six facts about the dinosaur
            this.setFacts = (human) => {
                this.facts.push(fact);
                this.facts.push(`The ${this.species} lived in ${this.where}`);
                this.facts.push(`The ${this.species} lived in ${this.when} period`);
                this.facts.push(...this.compareToHuman(human));
            };

            // Compares the height, weight, and diet of the dinosaur with that of the human
            this.compareToHuman = (human) => {
                const heightDiff = this.height - human.height;
                const heightComp = heightDiff >= 0 ? 'taller' : 'shorter';
                const heightFact = `A ${this.species} is ${Math.abs(heightDiff)} inches ${heightComp} than ${human.name}`;

                const weightDiff = this.weight - human.weight;
                const weightComp = weightDiff >= 0 ? 'heavier' : 'lighter';
                const weightFact = `A ${this.species} is ${Math.abs(weightDiff)} pounds ${weightComp} than ${human.name}`;

                const dietComp = this.diet === human.diet ? `just like ${human.name}` : `while ${human.name} is a ${human.diet}`;
                const dietFact = `A ${this.species} is a ${this.diet} ${dietComp}`;

                return [heightFact, weightFact, dietFact];
            };
        }

        // Parses the JSON file and creates Dino objects
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // noinspection JSUnresolvedVariable
                const dinoData = JSON.parse(this.responseText).Dinos;
                dinoData.forEach((dino) => {
                    dinos.push(
                        new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact)
                    );
                });
            }
        };
        xmlhttp.open("GET", "./dino.json", true);
        xmlhttp.send();


        // Creates the Human constructor
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

        // Listens to clicks in the form button
        formSubmit.addEventListener('click', () => {
            // Gets all the values from the form inputs
            const name = formName.value;
            const feet = parseFloat(formFeet.value);
            const inches = parseFloat(formInches.value);
            const height = feet * 12 + inches;
            const weight = parseFloat(formWeight.value);
            const diet = formDiet.value.toLowerCase();

            // Creates a human object
            const human = new Human(name, weight, height, diet);

            dinos.forEach((dino) => {
                dino.setFacts(human);
                console.log(dino.facts);
            });

        });
    })();
});