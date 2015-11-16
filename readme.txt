Kalle Hallert:
Byggt navigering och klockan:
Toppmenyn i fullskärm är byggt med vanlig html och css, i mindre skärmar (767 px) blir den till en mobilmeny som är byggt med hjälp av jQuery, html och css.

Klockan är byggt i javascript, där jag lånat kod från nätet och sedan skrivit om så att det finns:
Dels 3 klockor istället för en som visar tiden i Stockholm, Tokyo och New York.
Lagt till sekundvisare, dagvisare och utökat antal cirklar.
Lagt till antal dagar till nyårsafton.
Anpassat till olika skärmstorlekar, liggandes bredvid varandra i storlekar större än 1451px, två klockor bredvid varandra och en under i skärmstorlekar mellan 768px-1450px.
Alla klockor på rad under varandra i skärmstorlekar mindre än 767px.

Oscar Romin:
Jag har gjort Datatablet på hemsidan. Den är byggd med hjälp av en plugin till angular som heter Angular Tables.
Där tillkommer funktionalitet som låter användaren bläddra bland sidor i tablet. Även sortering efter ett visst värde implementeras därifrån. 
Datan laddas in genom ett ajax-anrop till en sida med JSON-information på. 
Funktionaliteten som ger användaren makt över hur mycket som visas per sida har jag gjort själv. 
Det går även att söka i listan efter saker i vilken kolumn som helst, något som jag implementerade själv. 

Marcus Lövelius:
Jag gjorde en simpel väderapp som får in mer information än vad som visas. Jag avände mig av angular som en bas eftersom att vi använder det i resterande bitar.
Får att få relevant information så använde jag mig av openweathermap.org och deras Web API, anledningen för att jag använde mig av detta istället för det som vi fick som förslag är att jag ville kunna hämta data 1/sek om det skulle behövas.
För att hämta informationen från API:et så använde jag mig av Ajax och den försöker att uppdatera informationen som visas var tionde minut.

Arlen Rios:
Byggt inloggning/registrering Med hjälp av node.js och wamp. node.js är ett programsystem designat för att skapa skalbara webbapplikationer, i synnerhet webbservrar. Fördelen att använda Node.js är att allt kod körs asynkront detta blandat
med den dynamiska ramverk som är Angular gör en suveränt kombo, Webb applikationen blir snabbare och mer dynamiskt vilket är uppskatad av användarna.
Jag använde wamp som server, wampServer innehåller bland annat programvarorna webbservern Apache, skriptspråket PHP och databaserna MySQL och SQLite. Wamp är opensource och går bra att kombinera med alla webbapplicationer vilket jag
tyckte det var intressant att prova. Det skapade mig problem eftersom det är ett nytt teknik för mig, men allt gick bra till slutet.