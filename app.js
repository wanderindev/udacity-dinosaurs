/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    (() => {
        const xmlhttp = new XMLHttpRequest();
        const dinos = [];
        const formSubmit = document.getElementById('btn');

        /**
         * @description Represents an animal.  This conscturctor is used for dinos and humans since both are animals
         * @constructor
         * @param {string} species - The species of the animal
         * @param {float} weight - The weight of the animal
         * @param {float} height - The height of the animal
         * @param {string} diet - The diet of the animal
         * @param {string} where - The geographical area where the animal lived
         * @param {string} when - The ecological period when the animal lived
         * @param {string} fact - An interesting fact about the animal
         */
        function Animal(species, weight, height, diet, where, when, fact) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where ? where.toLowerCase() : '';
            this.when = when ? when.toLowerCase() : '';
            this.fact = fact;
            this.facts = [this.fact];
        }

        /**
         * @description Compares the animal to a human
         * @param {object} human - An animal object
         * @returns {array} Three facts resulting from the comparison
         */
        Animal.prototype.compareToHuman = function(human) {
            return [this.compareHeight(human), this.compareWeight(human), this.compareDiet(human)];
        };

        /**
         * @description Compares the animal's height to a human's height
         * @param {object} human - An animal object
         * @returns {string} A fact resulting from the height comparison
         */
        Animal.prototype.compareHeight = function(human) {
            const heightDiff = this.height - human.height;
            const heightComp = heightDiff >= 0 ? 'taller' : 'shorter';
            return `A ${this.species} is ${Math.abs(heightDiff)} inches ${heightComp} than ${human.name}`;
        };

        /**
         * @description Compares the animal's weight to a human's weight
         * @param {object} human - An animal object
         * @returns {string} A fact resulting from the weight comparison
         */
        Animal.prototype.compareWeight = function(human) {
            const weightDiff = this.weight - human.weight;
            const weightComp = weightDiff >= 0 ? 'heavier' : 'lighter';
            return `A ${this.species} is ${Math.abs(weightDiff)} pounds ${weightComp} than ${human.name}`;
        };

        /**
         * @description Compares the animal's diet to a human's diet
         * @param {object} human - An animal object
         * @returns {string} A fact resulting from the diet comparison
         */
        Animal.prototype.compareDiet = function(human) {
            const dietComp = this.diet === human.diet ? `just like ${human.name}` : `while ${human.name} is a ${human.diet}`;
            return `A ${this.species} is a ${this.diet} ${dietComp}`;
        };

        /**
         * @description Selects a random fact from an array of facts
         * @returns {string} A fact from the facts array
         */
        Animal.prototype.getRandomFact = function() {
            return this.facts[Math.floor(Math.random() * this.facts.length)];
        };

        /**
         * @description Adds five facts to the facts array
         * @param {object} human - An animal object
         */
        Animal.prototype.setFacts = function(human) {
            if (this.species !== 'Pigeon') {
                this.facts.push(`The ${this.species} lived in ${this.where}`);
                this.facts.push(`The ${this.species} lived in ${this.when} period`);
                this.facts.push(...this.compareToHuman(human));
            }
        };

        /**
         * @description Gets the url for the animal's image
         * @returns {string} The url for the animal's image
         */
        Animal.prototype.getImageUrl = function() {
            return './images/' + this.species.toLowerCase().split(' ').join('_') + '.png';
        };

        /**
         * @description Gets the html for the animal's tile
         * @returns {string} The html for the animal's tile
         */
        Animal.prototype.getHtml = function() {
            const tileTitle = this.species === 'human' ? `<h3>${this.name}</h3>` : `<h3>${this.species}</h3>`;
            const tileImg = `<img src="${this.getImageUrl()}" alt="Image rendering of a ${this.species}">`;
            const tileFact = this.species === 'human' ? `` : `<p>${this.getRandomFact()}</p>`;

            return `<div class="grid-item">${tileTitle}${tileImg}${tileFact}</div>`;
        };

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

        /**
         * @description Randomly orders the dinos array, but makes sure that the pigon object
         *              remains last after the reordering and adds the human object to the
         *              middle position
         * @param {array} dinos - An array of animal objects
         * @param {object} human - An animal object
         */
        const randomlyOrderDinos = (dinos, human) => {
            const pigeon = dinos.pop();

            for (let i = dinos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [dinos[i], dinos[j]] = [dinos[j], dinos[i]];
            }

            dinos.push(pigeon);
            dinos.splice(4, 0, human);
        };

        /**
         * @description Hides the form and displays the tiles
         * @param {object} form - Handle to the form element
         * @param {object} grid - Handle to the grid element
         */
        // Hides the form and displays the tiles
        const hideForm = (form, grid) => {
            console.log(form, typeof form);
            form.classList.add = 'hidden';
            grid.classList.add = 'flex';
        };

        // Listens to clicks in the form button
        formSubmit.addEventListener('click', (() => {
            // Gets handles to form and grid
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

            // Randomizes the order of the dinos array
            randomlyOrderDinos(dinos);

            // Creates tiles and adds them to the grid
            dinos.forEach((dino) => {
                dino.setFacts(human);
                html += dino.getHtml();
            });
            grid.innerHTML = html;

            hideForm(form, grid);
        })());
    })();
});