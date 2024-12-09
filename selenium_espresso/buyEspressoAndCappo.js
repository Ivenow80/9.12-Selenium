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
    
    // Cappuccino hinzu (CSS-Selektor für Cappuccino)
    const cappuccinoButton = await driver.wait(
      until.elementLocated(By.css('div[data-test="Cappuccino"]')),
      5000
    );

    await cappuccinoButton.click();
    console.log("Cappuccino hinzugefügt.");
    // Aufgabe 3:
    //Verifiziere, dass der Warenkorb-Button den Text "Cart (2)" anzeigt.
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
    // KONTROLLE :ist der Text des Warenkorbs "Cart (2)"
    if (cartText === "cart (2)") {
      //TEXT KORREKT:, zeige ERFOLGSNACHRICHT
      console.log("Test bestanden: Warenkorb zeigt 'cart (2)'.");
    } else {
      // TEXT FALSCH:, zeige FEHLERMELDUNG
      console.error(
        `Test fehlgeschlagen: Erwartet 'cart (2)', erhalten '${cartText}'.`
      );
    }
    // WARENKORB TEXT ÜBERPRÜFEN:
    //  (Espresso)wurde  hinzugefügt, warten auf den Warenkorb-Button /Text auslesen
    // "Cart (2)" sollte erscheinen,Produkt wurde hinzugefügt
    // "Cart (2)" wird korrekt angezeigt dann ist der Test bestanden.
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
