/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    (() => {
        const xmlhttp = new XMLHttpRequest();
        const dinos = [];
        const formSubmit = document.getElementById('btn');

        // Creates the Animal constructor
        function Animal(species, weight, height, diet, where, when, fact) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where ? where.toLowerCase() : '';
            this.when = when ? when.toLowerCase() : '';
            this.fact = fact;

            const facts = [this.fact];

            // Compares the height, weight, and diet of the animal with that of the human
            const compareToHuman = (human) => {
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

            // Returns a random fact
            const getRandomFact = () => {
                return facts[Math.floor(Math.random() * facts.length)];
            };

            // Sets six facts about the animal
            this.setFacts = (human) => {
                if (this.species !== 'Pigeon') {
                    facts.push(`The ${this.species} lived in ${this.where}`);
                    facts.push(`The ${this.species} lived in ${this.when} period`);
                    facts.push(...compareToHuman(human));
                }
            };

            // Returns the image url
            this.getImageUrl = () => {
                return './images/' + species.toLowerCase().split(' ').join('_') + '.png';
            };

            // Returns the html for the tile
            this.getHtml = () => {
                const tileTitle = this.species === 'human' ? `<h3>${this.name}</h3>` : `<h3>${this.species}</h3>`;
                const tileImg = `<img src="${this.getImageUrl()}" alt="Image rendering of a ${this.species}">`;
                const tileFact = this.species === 'human' ? `` : `<p>${getRandomFact()}</p>`;

                return `<div class="grid-item">${tileTitle}${tileImg}${tileFact}</div>`;
            };
        }

        // Parses the JSON file and creates dinosaur objects
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // noinspection JSUnresolvedVariable
                const dinoData = JSON.parse(this.responseText).Dinos;
                dinoData.forEach((dino) => {
                    dinos.push(
                        new Animal(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact)
                    );
                });
            }
        };
        xmlhttp.open("GET", "./dino.json", true);
        xmlhttp.send();


        // Creates the human object
        const human = new Animal('human');

        // TODO: Use IIFE to get human data from form

        // Rearranges the dinos array randomly by leaves the Pigeon element at the end
        const shuffleArrayElements = (array) => {
            const pigeon = array.pop();

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            array.push(pigeon);
        };

        // Listens to clicks in the form button
        formSubmit.addEventListener('click', () => {
            // Gets handle to form and grid
            const form = document.getElementById('dino-compare');
            const grid = document.getElementById('grid');

            // Gets all the values from the form inputs
            const name = document.getElementById('name').value;
            const feet = parseFloat(document.getElementById('feet').value);
            const inches = parseFloat(document.getElementById('inches').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const diet = document.getElementById('diet').value.toLowerCase();

            let html = '';

            // Adds property values to human
            human.name = name.charAt(0).toUpperCase() + name.slice(1);
            human.height = feet * 12 + inches;
            human.weight = weight;
            human.diet = diet;

            // Hides the form
            form.className = 'hidden';

            // Randomizes the order of the dinos array
            shuffleArrayElements(dinos);

            // Adds the human to the middle index of the array
            dinos.splice(4, 0, human);

            // Creates tiles and adds them to the grid
            dinos.forEach((dino) => {
                dino.setFacts(human);
                html += dino.getHtml();
            });
            grid.innerHTML = html;
        });
    })();
});