document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('select-race-button').addEventListener('click', function() {
    // Logic to open race selection menu
    // Update character-race and character-subrace spans after selection
});

document.getElementById('add-karma-cap-button').addEventListener('click', function() {
    var capContainer = document.getElementById('karma-cap-container');
    var newCap = document.createElement('div');
    newCap.className = 'karma-cap';
    newCap.onclick = function() { toggleKarmaCap(this) };
    capContainer.appendChild(newCap);
});

document.getElementById('remove-karma-cap-button').addEventListener('click', function() {
    var capContainer = document.getElementById('karma-cap-container');
    if (capContainer.children.length > 0) {
        capContainer.removeChild(capContainer.lastChild);
    }
});

function toggleKarmaCap(cap) {
    cap.classList.toggle('grey');
}

document.getElementById('save-button').addEventListener('click', function() {
    const characterName = prompt("Enter a name for this character sheet:");
    if (characterName) {
        const characterData = {
            characterName: document.getElementById('character-name').value,
            playerName: document.getElementById('player-name').value,
            characterAge: document.getElementById('character-age').value,
            characterGender: document.getElementById('character-gender').value,
            characterRace: document.getElementById('character-race').innerText,
            characterSubrace: document.getElementById('character-subrace').innerText,
            karmaCaps: Array.from(document.getElementsByClassName('karma-cap')).map(cap => cap.classList.contains('grey')),
            specialStats: {
                str: parseInt(document.getElementById('str-value').innerText),
                per: parseInt(document.getElementById('per-value').innerText),
                end: parseInt(document.getElementById('end-value').innerText),
                cha: parseInt(document.getElementById('cha-value').innerText),
                int: parseInt(document.getElementById('int-value').innerText),
                agi: parseInt(document.getElementById('agi-value').innerText),
                luck: parseInt(document.getElementById('luck-value').innerText),
            }
        };
        localStorage.setItem(characterName, JSON.stringify(characterData));
        alert(`Character data for '${characterName}' saved!`);
    }
});

document.getElementById('load-button').addEventListener('click', function() {
    const characterName = prompt("Enter the name of the character sheet to load:");
    const characterData = JSON.parse(localStorage.getItem(characterName));
    if (characterData) {
        document.getElementById('character-name').value = characterData.characterName;
        document.getElementById('player-name').value = characterData.playerName;
        document.getElementById('character-age').value = characterData.characterAge;
        document.getElementById('character-gender').value = characterData.characterGender;
        document.getElementById('character-race').innerText = characterData.characterRace;
        document.getElementById('character-subrace').innerText = characterData.characterSubrace;

        const capContainer = document.getElementById('karma-cap-container');
        capContainer.innerHTML = '';
        characterData.karmaCaps.forEach(isGrey => {
            const newCap = document.createElement('div');
            newCap.className = 'karma-cap';
            if (isGrey) {
                newCap.classList.add('grey');
            }
            newCap.onclick = function() { toggleKarmaCap(this) };
            capContainer.appendChild(newCap);
        });

        document.getElementById('str-value').innerText = characterData.specialStats.str;
        document.getElementById('per-value').innerText = characterData.specialStats.per;
        document.getElementById('end-value').innerText = characterData.specialStats.end;
        document.getElementById('cha-value').innerText = characterData.specialStats.cha;
        document.getElementById('int-value').innerText = characterData.specialStats.int;
        document.getElementById('agi-value').innerText = characterData.specialStats.agi;
        document.getElementById('luck-value').innerText = characterData.specialStats.luck;
        updateModifiers();

        alert(`Character data for '${characterName}' loaded!`);
    } else {
        alert(`No saved character data found for '${characterName}'.`);
    }
});

document.getElementById('reset-button').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the character sheet?')) {
        document.getElementById('character-name').value = '';
        document.getElementById('player-name').value = '';
        document.getElementById('character-age').value = '';
        document.getElementById('character-gender').value = '';
        document.getElementById('character-race').innerText = 'N/A';
        document.getElementById('character-subrace').innerText = 'Base';

        const capContainer = document.getElementById('karma-cap-container');
        capContainer.innerHTML = '';
        const initialCap = document.createElement('div');
        initialCap.className = 'karma-cap';
        initialCap.onclick = function() { toggleKarmaCap(this) };
        capContainer.appendChild(initialCap);

        document.getElementById('str-value').innerText = '5';
        document.getElementById('per-value').innerText = '5';
        document.getElementById('end-value').innerText = '5';
        document.getElementById('cha-value').innerText = '5';
        document.getElementById('int-value').innerText = '5';
        document.getElementById('agi-value').innerText = '5';
        document.getElementById('luck-value').innerText = '5';
        updateModifiers();
    }
});

document.getElementById('export-json-button').addEventListener('click', function() {
    const characterData = {
        characterName: document.getElementById('character-name').value,
        playerName: document.getElementById('player-name').value,
        characterAge: document.getElementById('character-age').value,
        characterGender: document.getElementById('character-gender').value,
        characterRace: document.getElementById('character-race').innerText,
        characterSubrace: document.getElementById('character-subrace').innerText,
        karmaCaps: Array.from(document.getElementsByClassName('karma-cap')).map(cap => cap.classList.contains('grey')),
        specialStats: {
            str: parseInt(document.getElementById('str-value').innerText),
            per: parseInt(document.getElementById('per-value').innerText),
            end: parseInt(document.getElementById('end-value').innerText),
            cha: parseInt(document.getElementById('cha-value').innerText),
            int: parseInt(document.getElementById('int-value').innerText),
            agi: parseInt(document.getElementById('agi-value').innerText),
            luck: parseInt(document.getElementById('luck-value').innerText),
        }
    };
    const characterName = document.getElementById('character-name').value || 'character_sheet';
    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('export-pdf-button').addEventListener('click', function() {
    const characterData = {
        characterName: document.getElementById('character-name').value,
        playerName: document.getElementById('player-name').value,
        characterAge: document.getElementById('character-age').value,
        characterGender: document.getElementById('character-gender').value,
        characterRace: document.getElementById('character-race').innerText,
        characterSubrace: document.getElementById('character-subrace').innerText,
        karmaCaps: Array.from(document.getElementsByClassName('karma-cap')).map(cap => cap.classList.contains('grey')),
        specialStats: {
            str: parseInt(document.getElementById('str-value').innerText),
            per: parseInt(document.getElementById('per-value').innerText),
            end: parseInt(document.getElementById('end-value').innerText),
            cha: parseInt(document.getElementById('cha-value').innerText),
            int: parseInt(document.getElementById('int-value').innerText),
            agi: parseInt(document.getElementById('agi-value').innerText),
            luck: parseInt(document.getElementById('luck-value').innerText),
        }
    };
    const doc = new jsPDF();
    doc.text(`Character Name: ${characterData.characterName}`, 10, 10);
    doc.text(`Player Name: ${characterData.playerName}`, 10, 20);
    doc.text(`Character Age: ${characterData.characterAge}`, 10, 30);
    doc.text(`Character Gender: ${characterData.characterGender}`, 10, 40);
    doc.text(`Character Race: ${characterData.characterRace}`, 10, 50);
    doc.text(`Character Subrace: ${characterData.characterSubrace}`, 10, 60);
    doc.text('Karma Caps:', 10, 70);
    characterData.karmaCaps.forEach((isGrey, index) => {
        doc.text(`Karma Cap ${index + 1}: ${isGrey ? 'Grey' : 'Red'}`, 10, 80 + (index * 10));
    });
    doc.text('SPECIAL Stats:', 10, 150);
    doc.text(`Strength (STR): ${characterData.specialStats.str} (Modifier: ${characterData.specialStats.str - 5})`, 10, 160);
    doc.text(`Perception (PER): ${characterData.specialStats.per} (Modifier: ${characterData.specialStats.per - 5})`, 10, 170);
    doc.text(`Endurance (END): ${characterData.specialStats.end} (Modifier: ${characterData.specialStats.end - 5})`, 10, 180);
    doc.text(`Charisma (CHA): ${characterData.specialStats.cha} (Modifier: ${characterData.specialStats.cha - 5})`, 10, 190);
    doc.text(`Intelligence (INT): ${characterData.specialStats.int} (Modifier: ${characterData.specialStats.int - 5})`, 10, 200);
    doc.text(`Agility (AGI): ${characterData.specialStats.agi} (Modifier: ${characterData.specialStats.agi - 5})`, 10, 210);
    doc.text(`Luck (LUCK): ${characterData.specialStats.luck} (Modifier: ${characterData.specialStats.luck - 5})`, 10, 220);
    doc.save(`${characterData.characterName}.pdf`);
});

document.getElementById('export-html-button').addEventListener('click', function() {
    const characterData = {
        characterName: document.getElementById('character-name').value,
        playerName: document.getElementById('player-name').value,
        characterAge: document.getElementById('character-age').value,
        characterGender: document.getElementById('character-gender').value,
        characterRace: document.getElementById('character-race').innerText,
        characterSubrace: document.getElementById('character-subrace').innerText,
        karmaCaps: Array.from(document.getElementsByClassName('karma-cap')).map(cap => cap.classList.contains('grey')),
        specialStats: {
            str: parseInt(document.getElementById('str-value').innerText),
            per: parseInt(document.getElementById('per-value').innerText),
            end: parseInt(document.getElementById('end-value').innerText),
            cha: parseInt(document.getElementById('cha-value').innerText),
            int: parseInt(document.getElementById('int-value').innerText),
            agi: parseInt(document.getElementById('agi-value').innerText),
            luck: parseInt(document.getElementById('luck-value').innerText),
        }
    };
    const characterName = document.getElementById('character-name').value || 'character_sheet';
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${characterData.characterName}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .karma-cap { width: 20px; height: 20px; background-color: red; border-radius: 50%; display: inline-block; margin: 2px; }
                .karma-cap.grey { background-color: grey; }
            </style>
        </head>
        <body>
            <h1>${characterData.characterName}</h1>
            <p><strong>Player Name:</strong> ${characterData.playerName}</p>
            <p><strong>Character Age:</strong> ${characterData.characterAge}</p>
            <p><strong>Character Gender:</strong> ${characterData.characterGender}</p>
            <p><strong>Character Race:</strong> ${characterData.characterRace}</p>
            <p><strong>Character Subrace:</strong> ${characterData.characterSubrace}</p>
            <h2>Karma Caps</h2>
            ${characterData.karmaCaps.map((isGrey, index) => `<div class="karma-cap ${isGrey ? 'grey' : ''}"></div>`).join('')}
            <h2>SPECIAL Stats</h2>
            <p>Strength (STR): ${characterData.specialStats.str} (Modifier: ${characterData.specialStats.str - 5})</p>
            <p>Perception (PER): ${characterData.specialStats.per} (Modifier: ${characterData.specialStats.per - 5})</p>
            <p>Endurance (END): ${characterData.specialStats.end} (Modifier: ${characterData.specialStats.end - 5})</p>
            <p>Charisma (CHA): ${characterData.specialStats.cha} (Modifier: ${characterData.specialStats.cha - 5})</p>
            <p>Intelligence (INT): ${characterData.specialStats.int} (Modifier: ${characterData.specialStats.int - 5})</p>
            <p>Agility (AGI): ${characterData.specialStats.agi} (Modifier: ${characterData.specialStats.agi - 5})</p>
            <p>Luck (LUCK): ${characterData.specialStats.luck} (Modifier: ${characterData.specialStats.luck - 5})</p>
        </body>
        </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('import-button').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const characterData = JSON.parse(e.target.result);
        document.getElementById('character-name').value = characterData.characterName;
        document.getElementById('player-name').value = characterData.playerName;
        document.getElementById('character-age').value = characterData.characterAge;
        document.getElementById('character-gender').value = characterData.characterGender;
        document.getElementById('character-race').innerText = characterData.characterRace;
        document.getElementById('character-subrace').innerText = characterData.characterSubrace;

        const capContainer = document.getElementById('karma-cap-container');
        capContainer.innerHTML = '';
        characterData.karmaCaps.forEach(isGrey => {
            const newCap = document.createElement('div');
            newCap.className = 'karma-cap';
            if (isGrey) {
                newCap.classList.add('grey');
            }
            newCap.onclick = function() { toggleKarmaCap(this) };
            capContainer.appendChild(newCap);
        });

        document.getElementById('str-value').innerText = characterData.specialStats.str;
        document.getElementById('per-value').innerText = characterData.specialStats.per;
        document.getElementById('end-value').innerText = characterData.specialStats.end;
        document.getElementById('cha-value').innerText = characterData.specialStats.cha;
        document.getElementById('int-value').innerText = characterData.specialStats.int;
        document.getElementById('agi-value').innerText = characterData.specialStats.agi;
        document.getElementById('luck-value').innerText = characterData.specialStats.luck;
        updateModifiers();

        alert(`Character data imported successfully!`);
    };
    reader.readAsText(file);
});

function updateModifiers() {
    const stats = ['str', 'per', 'end', 'cha', 'int', 'agi', 'luck'];
    stats.forEach(stat => {
        const value = parseInt(document.getElementById(`${stat}-value`).innerText);
        document.getElementById(`${stat}-mod`).innerText = value - 5;
    });
}

function increaseStat(stat) {
    const valueElement = document.getElementById(`${stat}-value`);
    let value = parseInt(valueElement.innerText);
    value++;
    valueElement.innerText = value;
    updateModifiers();
}

function decreaseStat(stat) {
    const valueElement = document.getElementById(`${stat}-value`);
    let value = parseInt(valueElement.innerText);
    if (value > 1) {
        value--;
        valueElement.innerText = value;
        updateModifiers();
    }
}
