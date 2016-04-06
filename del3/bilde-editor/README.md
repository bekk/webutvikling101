# Bilde Editor

I denne oppgaven skal vi utforske de ulike funksjonene for grafisk manipulasjon
som finnes i CSS. Vi skal se litt på hvordan vi kan fikle med bildene i
bildegalleriet vi lagde i del2.

## Introduksjon

### Hvem passer denne oppgaven for?

Denne oppgaven passer godt for de som ønsker å utforske de mer kreative og
visuelle bitene av CSS. De som liker å leke med grafikk og komposisjon.

Oppgaven er ganske åpen. Hvis du vil eksperimentere kan du sitte lenge og fikle
med tall og skru på parametere. Hvis du bare vil se noen kule demoer kan du
komme deg gjennom ganske kjapt.

### Hva kommer du til å lære?

Du vil lære om noe av det CSS kan gjøre for deg i form av grafisk manipulasjon i
nettleseren.

### Starter filer

Du kan bruke din egen løsning på del2, eller bruke de filene som ligger i
assignment-mappa (som er en kopi av løsningsforslaget til del2).

### Løsningsforslag

Det er ikke noe løsningsforslag til denne oppgaven, bare følg innstruksjonene i
oppgaveteksten - dette er en oppgave om utforskning og eksperimentering.

## Oppgaven

Denne oppgaven handler om å utforske litt av det CSS har å tilby innen grafikk
og bildebehandling. Derfor kommer du stort sett til å skrive CSS. Det kan du
gjøre i din foretrukne editor eller i DeveloperTools i nettleseren. Oppsettet er
det samme som i del2, så hvis du vil skrive CSS i en editor kan du benytte deg
av `styles.css`-fila, som du finner i `/client`-mappa (som i del2).

Hvis du vil ha en liten refersher på CSS før vi setter igang kan jeg anbefale å
flippe gjennom slide-settet for
[del1](http://bekk.github.io/webutvikling101/del1/slides). Her finner du syntaks
for selectorer og litt om hvordan du legger til nye regler.

### Filters

Filters er noe du kanskje har vært borti hvis du har brukt feks PhotoShop eller
en eller annen kamera-app på mobiltelefonen din (Instagram, Snapchat). Viste du
at du kan gjøre de samme tingene med CSS?

Hvorfor er filters interessante i CSS? Utover at det er veldig gøy og gir deg
muligheten til å sette en litt personlig touch på det du lager, så har det
praktiske fordeler også. Hvis du feks skal lage en meldemsoversikt for en
forening eller et lag hvor det skal være bilder av alle medlemmene, og alle de
bildene skal være i svarthvitt (eller feks sepia). Da må alle bildene gjennom en
runde med PhotoShop (eller tilsvarende) før de kan brukes, og det må gjentas for
hver gang et nytt medlem blir med. Det er slitsomt i lengden, da passer det
bedre at vi kan gjøre det direkte med CSS!


### Filters i CSS

Hvis du starter med å legge til denne regelen i `styles.css`-fila, så har vi et
utgangspunkt for det vi gjør videre.

```css
figure.fullwidth img {

}
```

Det neste steget er å finne et bilde du liker ved å bruke søke-funksjonen og
trykk på det slik at det vises i fullskjerm. Det er enklere å eksperimentere med
effekter hvis du bare ser ett bilde. Jeg vil også anbefale deg å finne et bilde
som er i farger, ellers vil du ikke få se den fulle effekten av filterne.

### Blur-filter

Nå skal du teste det første filteret, det gjør vi ved å endre CSS-regelen du
lagde til:

```css
figure.fullwidth img {
  -webkit-filter: blur(20px);
  filter: blur(20px);
}
```

Når du laster siden på nytt vil du se at bildet har blitt blurry. Gratulerer, du
har brukt ditt første filter!

Filters er ganske ny funksjonalitet i nettlsere. Derfor må vi bruke to regler
her, en for moderne browsere og en for browsere som er basert på webkit (dette
er en nettlesermotor som blandt annet Opera, Chrome og Safari benytter varianter
av). I fremtiden vil alle browsere støtte vanlig `filter`, men før den tid må vi
bruke to regler.

### Flere filtere på en gang

Du kan også benytte flere filter sammen, det gjør du på denne måten:

```css
figure.fullwidth img {
  -webkit-filter: blur(20px) grayscale(20%);
  filter: blur(20px) grayscale(20%);
}
```

Nå har du både et `blur` og et `grayscale`-filter. Grunnen til at vi bruker
forskjellige enheter på de to filterne, `px` for blur og `%` for grayscale, er
at for `blur`-filteret setter vi omkretsen på blur-effekten (hvor langt ut fra
hver pixel du skal blurre), mens for `grayscale`-filteret gjør vi en operasjon
på fargene.

### Flere filtere

Vi har veldig mange forskjellige filtere å velge mellom. I tillegg til blur og
grayscale, som du har testa ut nå, har du disse:

- brightness
- hue-rotate
- saturate
- invert
- contrast
- opacity
- sepia
- ... og et par til som er litt for eksperimentelle

### Brightness

Brightness er neste kandidat ut. Effekten av dette filteret kan du se hvis du
endrer CSS-regelen til dette:

```css
figure.fullwidth img {
  -webkit-filter: brightness(50%);
  filter: brightness(50%);
}
```

Du vil nå se at bildet blir mye lysere. Det er fordi lightness-komponenten av
fargene i bildet har blitt justert opp.

### HSL

Dette er et godt tidspunkt til å fortelle om HSL. HSL er en annen måte å
definere farger på. Tidligere har vi benyttet oss av RGB, som angir farger
utifra sammensetningen av Rødt, Grønt og Blått. I HSL benytter vi isteden
komponentene Hue, Saturation og Lightness. Basisen for HSL er en fargesirkel:

![fargesirkel](./assets/huecircle.jpg?raw=true)

Når vi bruker HSL til å forklare farger beskriver Hue-komponenten plasseringen
langs omkretsen til sirkelen. Saturation-komponenten beskriver avstanden fra
senteret i sirkelen og Lightness-komponenten beskriver hvor lys fargen er (dette
kommer ikke godt frem av bildet).

### Hue-rotate

Så, tilbake til filters. Neste filter ut er `hue-rotate`. Siden vi nå vet hva
`hue` er, blir dette filteret lettere å forstå. Et `hue-rotate`-filter vil
justere alle fargene i bildet med `x deg` langs omkretsen av fargesirkelen.

```css
figure.fullwidth img {
  -webkit-filter: hue-rotate(90deg);
  filter: hue-rotate(90deg);
}
```

Dette er en av de artigste filter-effektene, så her vil jeg virkelig anbefale
deg å åpne DeveloperTools og skru litt på verdien (du kan klikke på `90deg` og
så bruke pil-opp/ned til å justere verdien) så du kan se effekten real-time.

### Saturation

Nå kan vi også se litt på `saturate`-filteret.

```css
figure.fullwidth img {
  -webkit-filter: saturate(50%);
  filter: saturate(50%);
}
```

Dette justerer alle fargene i bildet 50% lengre inn mot sentrum av fargesirkelen
iforhold til der fargen var. Hvis vi hadde gitt filteret en verdi på `100%`
ville verdien forblitt den samme. Vi kan også angi verdier over `100%`, det vil
flytte fargen lengre vekk fra sentrum i fargesirkelen enn det var.

### Invert

Vi har et annet filter som også gjør artige ting med fargene i bilder. Det er
`invert`. `invert`-filteret vil flippe alle fargene i bildet.

```css
figure.fullwidth img {
  -webkit-filter: invert(100%);
  filter: invert(100%);
}
```

Her vil en verdi på `100%` bety helt invertert, mens `0%` vil bety
orginalfargen.

### Contrast

Neste filter er `contrast`.

```css
figure.fullwidth img {
  -webkit-filter: contrast(100%);
  filter: contrast(100%);
}
```

Her gjelder samme prisnipp som med `saturate`-filteret. `100%` contrast vil
ikke gi noen effekt. Denne effekten er det enklest å få en feel for hvis du
endrer litt på verdien i DeveloperTools.

### Opacity

`opacity`-filteret er litt interessant, siden vi har hatt en egen
`opacity`-regel i CSS ganske lenge. De oppfører seg faktisk helt likt visuellt.
`Opacity`-filteret kan du sette slik:

```css
figure.fullwidth img {
  -webkit-filter: opacity(50%);
  filter: opacity(50%);
}
```

Effekten av `opacity`-filteret er at bildet blir gjennomsiktig. `0%` betyr full
gjennomsiktighet, mens `100%` betyr ingen gjennomsiktighet.

### Sepia

Det siste filteret vi skal se på i dag er `sepia`-filteret. Dette har du sikkert
sett i bilde-applikasjoner på telefonen din. Sepia er en bildeeffekt som
tradisjonelt ble brukt på svart-hvitt bilder i gamle dager for å gi dem en
varmere fargetone. I disse moderne tider er det mest brukt for å få ting til å
se gammelt ut.

Du kan gi bildet ditt en sepia-effekt på denne måten:

```css
figure.fullwidth img {
  -webkit-filter: sepia(100%);
  filter: sepia(100%);
}
```

`100%` betyr full sepia, mens `0%` betyr ingen sepia.

### Videre?

Vi har nå vær gjennom de fleste filterne som CSS-tilbyr oss. Nå er det opp til
deg hva du vil bruke denne kunnskapen til. Du kan leke deg litt med å legge på flere filters på bildet, feks slik:

```css
figure.fullwidth img {
  -webkit-filter: invert(100%) opacity(75%);
  filter: invert(100%) opacity(75%);
}
```

Her er det fantasien som setter grenser!

### For de som vil utforske enda mer

Filters kan faktisk animeres. Feks kan vi gjøre ting som dette:

```css
figure.fullwidth img {
  transition: filter 1s ease-in-out;
  transition: -webkit-filter 1s ease-in-out;
}

figure.fullwidth img:hover {
  -webkit-filter: hue-rotate(90deg);
  filter: hue-rotate(90deg);
}
```

Dette åpner for mange artige effekter.
