Kalle Hallert:
Byggt navigering och klockan:
Toppmenyn i fullsk�rm �r byggt med vanlig html och css, i mindre sk�rmar (767 px) blir den till en mobilmeny som �r byggt med hj�lp av jQuery, html och css.

Klockan �r byggt i javascript, d�r jag l�nat kod fr�n n�tet och sedan skrivit om s� att det finns:
Dels 3 klockor ist�llet f�r en som visar tiden i Stockholm, Tokyo och New York.
Lagt till sekundvisare, dagvisare och ut�kat antal cirklar.
Lagt till antal dagar till ny�rsafton.
Anpassat till olika sk�rmstorlekar, liggandes bredvid varandra i storlekar st�rre �n 1451px, tv� klockor bredvid varandra och en under i sk�rmstorlekar mellan 768px-1450px.
Alla klockor p� rad under varandra i sk�rmstorlekar mindre �n 767px.

Oscar Romin:
Jag har gjort Datatablet p� hemsidan. Den �r byggd med hj�lp av en plugin till angular som heter Angular Tables.
D�r tillkommer funktionalitet som l�ter anv�ndaren bl�ddra bland sidor i tablet. �ven sortering efter ett visst v�rde implementeras d�rifr�n. 
Datan laddas in genom ett ajax-anrop till en sida med JSON-information p�. 
Funktionaliteten som ger anv�ndaren makt �ver hur mycket som visas per sida har jag gjort sj�lv. 
Det g�r �ven att s�ka i listan efter saker i vilken kolumn som helst, n�got som jag implementerade sj�lv. 

Marcus L�velius:
Jag gjorde en simpel v�derapp som f�r in mer information �n vad som visas. Jag av�nde mig av angular som en bas eftersom att vi anv�nder det i resterande bitar.
F�r att f� relevant information s� anv�nde jag mig av openweathermap.org och deras Web API, anledningen f�r att jag anv�nde mig av detta ist�llet f�r det som vi fick som f�rslag �r att jag ville kunna h�mta data 1/sek om det skulle beh�vas.
F�r att h�mta informationen fr�n API:et s� anv�nde jag mig av Ajax och den f�rs�ker att uppdatera informationen som visas var tionde minut.

Arlen Rios:
Byggt inloggning/registrering Med hj�lp av node.js och wamp. node.js �r ett programsystem designat f�r att skapa skalbara webbapplikationer, i synnerhet webbservrar. F�rdelen att anv�nda Node.js �r att allt kod k�rs asynkront detta blandat
med den dynamiska ramverk som �r Angular g�r en suver�nt kombo, Webb applikationen blir snabbare och mer dynamiskt vilket �r uppskatad av anv�ndarna.
Jag anv�nde wamp som server, wampServer inneh�ller bland annat programvarorna webbservern Apache, skriptspr�ket PHP och databaserna MySQL och SQLite. Wamp �r opensource och g�r bra att kombinera med alla webbapplicationer vilket jag
tyckte det var intressant att prova. Det skapade mig problem eftersom det �r ett nytt teknik f�r mig, men allt gick bra till slutet.