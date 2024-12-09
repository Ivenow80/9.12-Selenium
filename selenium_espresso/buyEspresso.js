// Importiere die notwendigen Module von 'selenium-webdriver'
// Builder: Erstellen und Starten des WebDriver für den Browser.
// By: Auswahl von HTML-Elementen basierend auf verschiedenen Selektoren.
// until: Warten auf bestimmte Bedingungen, bevor eine Aktion ausgeführt wird.
const { Builder, By, until } = require("selenium-webdriver");

// Helper-Funktion, um den WebDriver für den Chrome-Browser zu starten.
async function setupDriver() {
  // Baut und startet den WebDriver für den Chrome-Browser.
  // Dies gibt den WebDriver zurück, der verwendet wird, um den Browser zu steuern.
  return await new Builder().forBrowser("chrome").build();
}

// HAUPTFUNKTION:
//für die Aufgabe 1
async function task1() {
  // Startet den WebDriver, um den Browser zu steuern.
  let driver = await setupDriver();

  try {
    console.log("Task 1 gestartet: Einzelnes Produkt hinzufügen.");

    // Aufgabe 1:
    //Öffne die Webseite, um das Produkt hinzuzufügen.
    // Verwendet den WebDriver, um die URL https://seleniumbase.io/coffee/ zu öffnen.
    await driver.get("https://seleniumbase.io/coffee/");
    console.log("Webseite geöffnet.");

    //Aufgabe 2:
    // Artikel "Espresso" in den Warenkorb hinzufügen.
    // Suche nach dem Espresso-Button anhand des CSS-Selektors 'div[data-test="Espresso"]'.
    // Warte, bis der Espresso-Button geladen ist (maximal 5 Sekunden).
    const espressoButton = await driver.wait(
      until.elementLocated(By.css('div[data-test="Espresso"]')), // CSS-Selektor für Espresso
      5000 // Warte maximal 5 Sekunden
    );
    // Klicke auf : gefundenen Espresso-Button, Artikel wird zum Warenkorb hinzugefügt.
    await espressoButton.click();
    console.log("Espresso hinzugefügt.");

    // Aufgabe 3:
    //Verifiziere, dass der Warenkorb-Button den Text "Cart (1)" anzeigt.
    // Warten: bis der Warenkorb-Button auftaucht
    const cartButton = await driver.wait(
      // CSS-Selektor für den Warenkorb-Button
      until.elementLocated(By.css('a[aria-label="Cart page"]')),
      5000 // max 5 Sekunden warten
    );
    // Lese den Text des Warenkorb-Buttons aus.
    const cartText = await cartButton.getText();
    // Gibt den Text des Warenkorb-Buttons aus
    console.log(`Warenkorb-Text: ${cartText}`);
    // KONTROLLE :ist der Text des Warenkorbs "Cart (1)"
    if (cartText === "cart (1)") {
      //TEXT KORREKT:, zeige ERFOLGSNACHRICHT
      console.log("Test bestanden: Warenkorb zeigt 'cart (1)'.");
    } else {
      // TEXT FALSCH:, zeige FEHLERMELDUNG
      console.error(
        `Test fehlgeschlagen: Erwartet 'cart (1)', erhalten '${cartText}'.`
      );
    }

    // BONUSAUFGABE.Gesamtsumme berechnen
    console.log("Bonus-Aufgabe gestartet: Gesamtsumme berechnen.");

    // Aufgabe1:
    //Espresso, Mocha und Cappuccino in den Warenkorb hinzufügen
    // Füge Mocha hinzu (CSS-Selektor für Mocha)
    const mochaButton = await driver.wait(
      until.elementLocated(By.css('div[data-test="Mocha"]')),
      5000
    );
    await mochaButton.click();
    console.log("Mocha hinzugefügt.");

    // Cappuccino hinzu (CSS-Selektor für Cappuccino)
    const cappuccinoButton = await driver.wait(
      until.elementLocated(By.css('div[data-test="Cappuccino"]')),
      5000
    );
    await cappuccinoButton.click();
    console.log("Cappuccino hinzugefügt.");

    // 2. Öffne den Warenkorb
    // Warenkorb-Button und klicke darauf,  Warenkorb-Seite öffnet.
    await cartButton.click();
    console.log("Warenkorb geöffnet.");

    // 3.GESAMTSUMME Der Produkte IM WAREBKORB.
    // Hier wird angenommen, dass die Preise der Produkte als Text in einem Element auf der Seite angezeigt werden.
    // Suche nach den Elementen, die die Preise enthalten.
    const espressoPrice = await driver.wait(
      until.elementLocated(By.css('span[class="unit-desc"]')),
      5000
    );
    const mochaPrice = await driver.wait(
      until.elementLocated(By.css('span[class="unit-desc"]')),
      5000
    );
    const cappuccinoPrice = await driver.wait(
      until.elementLocated(By.css('span[class="unit-desc"]')),
      5000
    );

    // Preise der Produkte ausgeben  und als Zahlen umwandeln
    const espressoPriceValue = parseFloat(
      await espressoPrice.getText().replace("$", "")
    );
    const mochaPriceValue = parseFloat(
      await mochaPrice.getText().replace("$", "")
    );
    const cappuccinoPriceValue = parseFloat(
      await cappuccinoPrice.getText().replace("$", "")
    );

    // GESAMTSUMME BERECHNEN
    const totalSum =
      espressoPriceValue + mochaPriceValue + cappuccinoPriceValue;
    console.log(`Berechnete Gesamtsumme: $${totalSum.toFixed(2)}`);

    // Verifiziere,(stelle sicher das der ausgerechnete Preis mit dem System überein stimmt)
    const totalPriceElement = await driver.wait(
      until.elementLocated(By.css('span[data-test="total-price"]')),
      5000
    );
    const totalPriceText = await totalPriceElement.getText();
    const totalPrice = parseFloat(totalPriceText.replace("$", ""));

    if (totalPrice === totalSum) {
      console.log("Test bestanden: Gesamtsumme ist korrekt.");
    } else {
      console.error(
        `Test fehlgeschlagen: Erwartet $${totalSum.toFixed(
          2
        )}, erhalten $${totalPrice}.`
      );
    }

    // WARENKORB TEXT ÜBERPRÜFEN:
    //  (Espresso)wurde  hinzugefügt, warten auf den Warenkorb-Button /Text auslesen
    // "Cart (1)" sollte erscheinen,Produkt wurde hinzugefügt
    // "Cart (1)" wird korrekt angezeigt dann ist der Test bestanden.
  } catch (error) {
    // FEHLERBEHEBUNG:block wird der Fehler wenn wer auftaucht behandelt

    //FEHLERMELDUNG WIRD ANGEZEIGT: Fehler werden detailliert beschrieben.
    console.error("Fehler in Task 1:", error);
  } finally {
    // BROWSWER SCHLIESSEN:
    // egal welches Ergebnis der Browser wird  im FINELYBLOCK geschlossen.
    // Sicherstellung:, keine belegten Resoursen bleiben, Test erfolgreich oder nicht.
    await driver.quit(); // Schließt WebDriver/Browser.
    console.log("Browser geschlossen.");
  }
}

//Task 1 wird ausgeführt, hinzuzufügen und testen.
task1();
