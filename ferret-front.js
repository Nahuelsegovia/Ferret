var scriptTag = document.createElement("script");
scriptTag.setAttribute("src", "https://nahuelsegovia.github.io/js/scrapo.js");
document.body.appendChild(scriptTag);

let linksInternos = document.links;
let guardarLinks = [];
let linkPagina = location.host;
for(let link of linksInternos){
	if(link.href.includes(linkPagina)){
		guardarLinks.push(link);
	}
}

guardarLinks = guardarLinks.join(' , ');
console.log(guardarLinks)

let linkLogin = guardarLinks.match(`https://${linkPagina}/login`);
let linkRegistro = guardarLinks.match(`https://${linkPagina}/registro`);