# Oppgavebeskrivelse
I denne oppgaven skal du lage en visning av leilighetsannonser alla finn.no/hybel.no. Du står fritt til å implementere ditt eget desgin, men du kan også ta utgangspunkt i løsningsforslaget hvis du ønsker det. Løsningsforslaget har valgt å fokusere på tittel, pris, kvadratmeter og adresse i tillegg til en bildekarusell som det viktigste å presentere.

## Annonser
Under mappen annonser finner du 8 forskjellige annonser hvor hver annonse inneholder et sett med bilder og en details.json-fil. jsonfilen beskriver nøkkelinformasjon til hver annonse. Se eksempelet under:
```javascript
    {
      "omradetittel": "Grunerløkka",
      "tittel": "Rustikk og påkostet 2-roms med klassisk sjarm midt på Løkka! Sydvendt balkong. Peis. Fredelige omgivelser.",
      "pris": "3 000 000",
      "kvm": "51",
      "adresse": "Helgesens gate 5a, 0563 Oslo"
    }
```

## Løsningsforslaget
I denne oppgaven står du helt fritt til å lage det designet du vil. Forslag til løsning ligger under solutions. For å se løsningforslaget - følg stegene under "For å starte opp serveren" og i stedet for å åpne localhost:6001 åpner du localhost:6002

## Oppgave uten javascript
Hvis du ønsker kan denne oppgaven løses helt uten javascript, dog må man skrive mye mer html-kode selv.

* ta utgangspunt i home.html-filen under client-mappen
* bygg opp annonseelementene med html - ta med den informasjonen du mener er viktigst å ha med i en annonse. For å vise første bilde i den første annonsen kan du legge til denne html-en:
     ```html
    <img src="../../annonser/annonse1/1.jpg" />
    ```
    Siden annonser ligger høyere oppe i mappestrukturen enn home.html (som er utgangspunktet vårt),  må vi skrive ../ foran for å finne riktig fil. Første ../ vil gå ett steg opp i mappestrukturen. Da vil man kunne aksessere mappen client, server osv. Derfor må vi skrive ../-to ganger får å komme til mappen annonser. Deretter kan vi traversere oss ned til det første bildet.
* html-elementer som kan være nyttig er -
    ```html
        <section>, <img>, <main>, <h1>, <h2>, <h3>, <a>, <div>, <p>
    ```
* legg på klassenavn du føler gir mening - tenk på gjenbrukbarhet
* style innholdet ditt slik du ønsker det i styling.css-filen
* gjør nødvendige endringer så det ser bra ut på forskjellige skjermstørrelser
```css
    @media (min-width: 48rem) {
        //styling her
    }
```
* se under for stylingstips

## Oppgave med javascript
Ta utgangspunkt i index.html-filen som inkluderer script.js og styling.css for henholdsvis javascript og styling. Overordnet går oppgaven ut på at man gjør et kall mot en server (fetch som vi brukte i forrige gang til å hente ut bilder) for å hente ut alle annonsebilder med tilhørende verdier. Deretter må man ta utgangspunkt i dataen man har fått fra serveren og lage en html-presentasjon av annonsene som deretter blir satt inn i html-siden vår slik at vi kan se annonsen.

### For å starte opp serveren:
Naviger til mappen assignment og skriv inn følgende kommandoer (som i del2)
```sh
    $ npm install
    $ npm start
```
Gå deretter til http://localhost:6001 i nettleseren din. Da skal alt være klart til å starte på oppgaven.

### Oppgave 1 - hent data
1. Lag en funksjon getAnnonser() som returnerer resultatet fra en request mot /annonser når siden blir lastet
2. Når dataen er hentet logg ut resultatet i consollet

Tips: fra del2 gjorde vi requester ved å bruke fetch:
```javascript
    fetch('/sok?tag=bekk').then(function(response) {
        return response.json();
    })
```
Forventet resultat er en liste med annonser hvor hver annonse inneholder en ny liste (url) med urler til annonsebildene, og et objekt (details) som inneholder infromasjon om annonsen. Denne informasjonen skal brukes i neste oppgave til å vise annonsene på siden.

### Oppgave 2 - vis bildene
1. I script.js lager du en ny funksjon som heter lagAnnonser(annonser) som tar inn alle annonsene. Denne funksjonen skal returnere html-markup. Forelløpig skal den kun vise første bilde for hver annonse.
2. Lag en for-løkke som for hver annonse lager en `<div>` med en `<img>` inni.
3. src-attributtet til img-elementet skal settes til den første url-en i annonsen.
4. I index-html lag et `<main>`-element
5. Sett html-en som lagAnnonser() returnerer som innhold i main-elementet

tips:
Fra tidligere har vi brukt:
```sh
Vi kan hente ut elementer vha queryselector. # foran betyr man henter med id, . henter med klasse og ingenting er rett på element-type.
var el1 = document.querySelector('main'); // matcher <main>
var el2 = document.querySelector('#name'); // matcher <input id="name">
var el3 = document.querySelector('.klasse'); // matcher <div class=".klasse">
```
```sh
var html = `
    <figure>
        <img src="${img.url}" />
        <figcaption>${img.title}</figcaption>
    </figure>
        `;
 ```

 ### Oppgave 3 - utvid annonsene
 1. Utvid lagAnnonser-funksjonen til å returnere markup for all informasjon som kommer med en annonse:
```sh
 {
  "omradetittel": "Grunerløkka",
  "tittel": "Rustikk og påkostet 2-roms med klassisk sjarm midt på Løkka! Sydvendt balkong. Peis. Fredelige omgivelser.",
  "pris": "3 000 000",
  "kvm": "51",
  "adresse": "Helgesens gate 5a, 0563 Oslo"
}
```
tips: her er det lurt å tenke litt på overskriftshiearki (h1,h2,h3) - hvilken informasjon du mener er viktigst osv.

### Oppgave 4 - styling
1. Du står helt fritt til å designe annonsene som du selv vil, men det er ingenting i veien for å kopiere løsningsforslaget. I løsningsforslaget så er det brukt css som ikke har blitt brukt tidligere bla hvordan posisjonere elementer absolutt. Se gjerne nedenfor for tips til fremgangsmåte.
2. Gjør nødvendige tilpasninger så det også ser fint ut på mobil

## Bildekarusell
Uavhengig om man har valgt å løse oppgaven med eller uten javascript kan man lage en bildekarusell av annonsene - men dog med javascript ;) Tanken her er at man skal kunne trykke på piler for å se annonsene.

### Oppgave 1 - vise alle bildene
1. Lag en ny funksjon som heter lagBilder(annonse) som tar inn én annonse.
2. Lag en for-løkke som itererer over alle url-ene i annonsen og lager html-markup av bildene (akkurat som du gjorde i lagAnnonser).
3. return markupen som blir laget
4. I stedet for å lage ett bilde i lagAnnonser kaller du heller lagBilder for å få bilde-markupen
5. nå skal alle bildene i hver annonse vises.

### Oppgave 2 - skjule alle bildene utenom det første
1. I lagBilder-funksjonen vil du sette på en klasse "hidden" på alle bilder utenom det første for å skjule bildene
2. I css-filen må du sørge for at hidden-klassen skjuler bildene som har denne klassen
tips: for å skjule elementer kan man sette display:none

### Oppgave 3 - legg til pil-ikoner
1. For at brukeren skal skjønne at det går an å bla i bildene må det finnes noe som vedkommende kan klikke på. Legg til et "bla-fremover"-ikon og "bla-bakover"-ikon. Under img-mappen ligger to pil-ikon som kan brukes.
2. utvid lagAnnonser-funksjonen med de to nye bilde-ikonene.
3. Style de nye ikonene så de plasseres fint for hver annonse
tips: for å ta i bruk bilde-ikonene som ligger i img-mappen setter man src-attributtet til filnavnet -
```html
    <img src="left.png" />.
```
Vil man bruke noen andre ikoner kan disse legges under img-mappen.

### Oppgave 3 - bla fremover og bakover
1. Legg til en eventListener som lytter på click-eventer på main-elementet
2. Sjekk at elementet som ble klikket på er ett av pilikonene
3. Sjekk om elementet som ble klikket på er fremover-ikonet, sett på klassen hidden, finn neste elementent og fjern klassen hidden for at denne skal vises.
4. Sjekk om elementet som ble klikket på er bakover-ikon, sett på klassen hidden, finn forrige element og fjern klassen hidden for at denne skal vises

tips:
1. eventlistenere: main.addEventListener("click", function (event) {...}
2. elementet som blir klikket på kan hentes ut sånn: var element = event.target;
3. klasser kan legges til og fjernes sånn: element.classList.remove("enklasse") og element.classList.add("enklasse")
4. For å sjekke om et element har en klasse: element.classList.contains("enklasse")

Er det mer tid til overs kan du utvide html-siden med f.eks filtervalg, eller klikke på en annonse og åpne denne og vise mer informasjon, eller ta en titt på en av de andre oppgavene.

## Stylingtips

### Absolutt posisjonering
Av og til ønsker man å plassere elementer oppå hverandre eller faste steder på siden. Da kan man bruke en css-egenskap som heter position. Denne kan settes til bla "absolute". Da kan man flytte elementet rundt på siden ved å sette verdier for top, bottom, right, left. F.eks kan jeg plassere annonsenene mine oppe i venstre hjørnet ved å gjøre følgende:
```css
    .annonse {
        position: absolute;
        top: 0;
        left: 0
    }
```
Endrer jeg right til 0 i stedet blir elementet vist på høyresiden. Det viktigste når det gjelder absolutt-posisjonering er å sette hvilket foreldreelement som skal bestemme "koordinatsystemet" - altså hvor topp, bunn, venstre og høyre er. Som oftes vil man unngå å måtte plassere elementer i forhold til hele vinduet man ser i nettleseren men heller innen for foreldrelementet sitt. Da er man sikker på at elementet alltid står riktig selv om foreldreelementet vil endre seg. Ved å sette position:relative på et foreldreelement så vil top:0 ikke lenger være oppe i toppen av siden men toppen av foreldrelementet. Se gjerne https://developer.mozilla.org/en-US/docs/Web/CSS/position for mer informasjon og eksempler.

### Tegne sirkler
Hvis man skal tegne sirkler kan man bruke en css-egenskap som heter border-radius for å få avrundet hjørner (https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius).  Setter man denne til 50% vil hjørnene bli så avrundet at det vil se ut som en sirkel/ellipse. Om den blir seendes ut som en fin sirkel avhengiger av flere egenskaper. For at sirkelen skal være rundt uansett innhold kan følgende triks brukes
```css
    border-radius: 50%; //for å få avrundet hjører
    line-height: 60px; // linjeavstand samme som høyden (gitt at det er tekst i sirkelen)
    height: 60px; //høyde og bredde like stort
    width: 60px;
    text-align: center //for å midtstille evt tekst inne i sirkelen
    background-color: #333333; // bakgrunnsfarge for å skille seg ut fra resten
```
### Rendre bilder
For å ta være på bilde-ration men allikevel sette en bredde eller høyde på bilde-containeren kan man bruke:
```css
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain; //sørger for at ration blir bevart
    }
```
### m<sup>2</sup>
For å få 2-tallet opphøyd kan man bruke html-tagen
 ```html
        <sup>2</sup>
 ```
