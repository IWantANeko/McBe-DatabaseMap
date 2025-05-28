# Example Usage

```js
const db = new DatabaseMap<string>("myDatabase");

// Set values
db.set("player1", "Steve");
db.set("player2", "Alex");

// Retrieve values
console.log(db.get("player1")); // "Steve"

// Check existence
console.log(db.has("player2")); // true

// Delete values
db.delete("player2");

// Iterate entries
for (const [key, value] of db) {
  console.log(`${key}: ${value}`);
}

// Sync changes to Minecraft's dynamic properties
db.update();
```