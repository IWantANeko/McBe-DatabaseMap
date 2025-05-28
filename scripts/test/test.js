import DatabaseMap from "../index.js";

// Create a new database instance
const db = new DatabaseMap<string>("test");

// Set values
db.set("player1", "Steve");
db.set("player2", "Alex");

// Get a value by key
console.log("Player 1:", db.get("player1")); // → "Steve"

// Check if a key exists
console.log("Has player2?", db.has("player2")); // → true
console.log("Has player3?", db.has("player3")); // → false

// Delete a key
db.delete("player2");
console.log("Has player2 after delete?", db.has("player2")); // → false

// List all keys
console.log("All keys:");
for (const key of db.keys()) {
    console.log("-", key);
}

// Get the total number of entries
console.log("Number of stored players:", db.size);

// Iterate over entries
console.log("All entries:");
for (const [key, value] of db) {
    console.log(`${key}: ${value}`);
}

// Use forEach to loop through all entries
db.forEach((value, key) => {
    console.log(`forEach → ${key}: ${value}`);
});

// Manually sync all values to persistent storage
db.update();

// Clear the entire database (uncomment to use)
// db.clear();
