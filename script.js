textheading = document.createElement('h1');
textheading.className = 'text-center';
textheading.textContent = 'Ice and Fire API';

container = document.createElement('div');
container.className = 'container';

row = document.createElement('div');
row.className = 'row';

container.append(row);
document.body.append(textheading, container);


function passData(book, d) {

	if (book) {

		rowdiv = document.querySelector('.row');

		coldiv = document.createElement('div');
		coldiv.className = "col";

		carddiv = document.createElement('div');
		carddiv.className = "card";
		carddiv.setAttribute("style", "width: 18rem;");

		cardbody = document.createElement('div');
		cardbody.className = "card-body";

		cardtitle = document.createElement('h5');
		cardtitle.className = "card-title";
		cardtitle.textContent = `Book Name: ${book.name}`;

		let text = ``;
		for (let i = 0; i < 5; i++) {
			text += `<li> ${d[i]} </li>`;
		}

		cardtext = document.createElement('div');
		cardtext.className = "card-text";
		cardtext.innerHTML = `
                                    <p>ISBN: ${book.isbn}</p>
                                    <p>Pages: ${book.numberOfPages}</p>
                                    <p>Authors: ${book.authors[0]}</p>
                                    <p>Publisher: ${book.publisher}</p>
                                    <p>Released Date: ${book.released}</p>
                                    <p>Character Name:</p>
                                    <div class="names"  <ul>${text}</ul></div>
                                    `;

		cardbody.append(cardtitle, cardtext);
		carddiv.append(cardbody);
		coldiv.append(carddiv);

		rowdiv.append(coldiv);
	}

}


const iceFireAPI = async() => {
	try {
		let getResponse = await fetch('https://www.anapioficeandfire.com/api/books');
		let getData = await getResponse.json();
		getData.forEach(async(data) => {
			let index = 0;
			let d = [];
			while (d.length <= 5) {
				let charName = await fetch(data.characters[index]);
				let getName = await charName.json();
				if (getName.name !== '') {
					d.push(getName.name);
				}
				index++;
			}
			passData(data, d);
		})

	} catch (err) {
		console.log('Sorry Error ', err);
	}
};

iceFireAPI();

console.log('There are total 10 Books');