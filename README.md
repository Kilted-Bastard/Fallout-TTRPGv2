# Fallout TTRPG Character Sheet

This project is a web-based character sheet for a Fallout tabletop role-playing game (TTRPG). It allows players to input and manage their character information, including character details, attributes, skills, inventory, and more.

## Project Structure

Fallout-TTRPGv2/
├── index.html # Main HTML file for the character sheet
├── main.js # JavaScript file for interactive functionality
├── styles.css # Optional: CSS file for styling
├── DATA/ # Directory containing JSON data files
│ ├── Ammo.json
│ ├── Armor.json
│ ├── BackgroundsRaces.json
│ ├── Mods.json
│ ├── PerksTraits.json
│ ├── WeaponProperties.json
│ └── Weapons.json
└── README.md # Project documentation


## How to Use

1. **Clone the Repository:**
git clone https://github.com/yourusername/Fallout-TTRPGv2.git
cd Fallout-TTRPGv2

2. **Open `index.html` in a Web Browser:**
Open the `index.html` file in your preferred web browser to view and interact with the character sheet.

3. **Edit Character Information:**
- Use the input fields to enter character details such as name, age, gender, race, and subrace.
- Use the buttons to toggle dark mode, save/load data, download the character sheet, and reset the form.

4. **Manage Karma Caps:**
- Click on the red penny-sized circular buttons to toggle their state (red/grey).
- Use the "Add Karma Cap" button to add a new karma cap.
- Use the "Remove Karma Cap" button to remove the last added karma cap.

## File Descriptions

### HTML and JavaScript Files

- `index.html`: Contains the structure of the character sheet.
- `main.js`: Contains the JavaScript code for interactive functionality such as toggling dark mode and managing karma caps.

### Data Files (JSON)

- `Ammo.json`: Contains data about different types of ammunition.
- `Armor.json`: Contains data about various types of armor and their properties.
- `BackgroundsRaces.json`: Contains data about character backgrounds and races.
- `Mods.json`: Contains data about mods and upgrades.
- `PerksTraits.json`: Contains data about character perks and traits.
- `WeaponProperties.json`: Contains data about weapon properties and attributes.
- `Weapons.json`: Contains data about different types of weapons.

## Adding/Editing Data

To add or edit data for races, backgrounds, weapons, etc., modify the respective JSON files in the `DATA` directory. Ensure the structure of the JSON files is maintained to avoid errors.

## Future Enhancements

- Implement race selection menu functionality.
- Add save/load functionality for character data.
- Improve styling and user interface.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
