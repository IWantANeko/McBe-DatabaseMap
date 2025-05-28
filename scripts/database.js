import { world } from "@minecraft/server";

/**
 * A persistent key-value store backed by Minecraft's Dynamic Properties.
 * Automatically syncs data between memory and persistent world state.
 */
export default class DatabaseMap {
    /** Internal memory cache of key-value pairs. */
    #map;
    /** Internal prefix for all dynamic property keys. */
    #keyPrefix;
    /** Unique identifier of this map instance. */
    id;
    /**
     * Creates a new persistent DatabaseMap with a unique ID.
     * @param id A unique string to namespace keys in Minecraft's dynamic properties.
     */
    constructor(id) {
        this.id = id;
        this.#keyPrefix = `database\u0000map\u0000${id}`;
        this.#map = new Map(this.#getAllValues());
    }
    /** Returns the number of entries in the map. */
    get size() {
        return this.#map.size;
    }
    /**
     * Retrieves a value by key.
     * @param key The key to look up.
     * @returns The value or `undefined` if the key doesn't exist.
     */
    get(key) {
        return this.#map.get(key);
    }
    /**
     * Sets a value for a given key, and saves it to persistent storage.
     * @param key The key to store the value under.
     * @param value The value to store.
     */
    set(key, value) {
        this.#map.set(key, value);
        this.#setValue(key, value);
    }
    /**
     * Deletes a value from the map and persistent storage.
     * @param key The key to remove.
     */
    delete(key) {
        this.#map.delete(key);
        this.#setValue(key, undefined);
    }
    /**
     * Checks if a given key exists.
     * @param key The key to check.
     * @returns `true` if the key exists, otherwise `false`.
     */
    has(key) {
        return this.#map.has(key);
    }
    /** Allows iteration over all key-value pairs using `for...of`. */
    [Symbol.iterator]() {
        return this.#map[Symbol.iterator]();
    }
    /**
     * Executes a callback for each entry in the map.
     * @param callbackfn Function to execute for each entry.
     * @param thisArg Optional `this` context for the callback.
     */
    forEach(callbackfn, thisArg) {
        this.#map.forEach(callbackfn, thisArg);
    }
    /** Returns an iterator over all keys. */
    keys() {
        return this.#map.keys();
    }
    /** Returns an iterator over all values. */
    values() {
        return this.#map.values();
    }
    /** Returns an iterator over all entries. */
    entries() {
        return this.#map.entries();
    }
    /**
     * Clears the entire map and removes all related dynamic properties.
     */
    clear() {
        for (const key of this.#map.keys()) {
            this.#setValue(key, undefined);
        }
        this.#map.clear();
    }
    /**
     * Collects all stored key-value pairs from dynamic properties.
     * @returns All entries belonging to this map instance.
     */
    #getAllValues() {
        const entries = [];
        for (const key of world.getDynamicPropertyIds()) {
            if (!key.startsWith(this.#keyPrefix))
                continue;
            entries.push([key, this.#getValue(key)]);
        }
        return entries;
    }
    /**
     * Syncs all memory values to persistent storage.
     * Only updates entries that have changed.
     */
    update() {
        for (const [key, value] of this.#map) {
            if (value === undefined) {
                this.#setValue(key, undefined);
                continue;
            }
            if (this.#getValue(key) === value)
                continue;
            this.#setValue(key, value);
        }
    }
    /**
     * Retrieves a value from persistent storage.
     * @param key The full dynamic property key.
     * @returns The parsed value, or `undefined` on error.
     */
    #getValue(key) {
        try {
            return JSON.parse(world.getDynamicProperty(key));
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * Saves a value to persistent storage.
     * @param key The full dynamic property key.
     * @param value The value to store.
     */
    #setValue(key, value) {
        try {
            world.setDynamicProperty(key, JSON.stringify(value));
        }
        catch (error) {
            console.error(error);
        }
    }
}
