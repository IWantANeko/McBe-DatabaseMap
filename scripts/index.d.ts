/**
 * A persistent key-value store backed by Minecraft's Dynamic Properties.
 * Automatically syncs data between memory and persistent world state.
 */
export default class DatabaseMap<T extends any> {
    #private;
    /** Unique identifier of this map instance. */
    readonly id: string;
    /**
     * Creates a new persistent DatabaseMap with a unique ID.
     * @param id A unique string to namespace keys in Minecraft's dynamic properties.
     */
    constructor(id: string);
    /** Returns the number of entries in the map. */
    get size(): number;
    /**
     * Retrieves a value by key.
     * @param key The key to look up.
     * @returns The value or `undefined` if the key doesn't exist.
     */
    get(key: string): T | undefined;
    /**
     * Sets a value for a given key, and saves it to persistent storage.
     * @param key The key to store the value under.
     * @param value The value to store.
     */
    set(key: string, value: T): void;
    /**
     * Deletes a value from the map and persistent storage.
     * @param key The key to remove.
     */
    delete(key: string): void;
    /**
     * Checks if a given key exists.
     * @param key The key to check.
     * @returns `true` if the key exists, otherwise `false`.
     */
    has(key: string): boolean;
    /** Allows iteration over all key-value pairs using `for...of`. */
    [Symbol.iterator](): IterableIterator<[string, T]>;
    /**
     * Executes a callback for each entry in the map.
     * @param callbackfn Function to execute for each entry.
     * @param thisArg Optional `this` context for the callback.
     */
    forEach(callbackfn: (value: T, key: string, map: Map<string, T>) => void, thisArg?: any): void;
    /** Returns an iterator over all keys. */
    keys(): IterableIterator<string>;
    /** Returns an iterator over all values. */
    values(): IterableIterator<T>;
    /** Returns an iterator over all entries. */
    entries(): IterableIterator<[string, T]>;
    /**
     * Clears the entire map and removes all related dynamic properties.
     */
    clear(): void;
    /**
     * Syncs all memory values to persistent storage.
     * Only updates entries that have changed.
     */
    update(): void;
}
