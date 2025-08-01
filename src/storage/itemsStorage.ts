import { FilterStatus } from "@/types/FilterStatus";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ITEMS_STORAGE_KEY = '@comprar:items';

export type ItemsStorage = {
    id: string
    status: FilterStatus
    description: string
}

async function get(): Promise<ItemsStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    } catch (error) {
        throw new Error("ITENS_GET: " + error);
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemsStorage[]> {
    const items = await get();
    return items.filter(item => item.status === status);
}

async function save(items: ItemsStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        throw new Error("ITENS_SAVE: " + error);
    }
}

async function add(newItem: ItemsStorage): Promise<ItemsStorage[]> {
    const items = await get();
    const updateItems = [...items, newItem];
    await save(updateItems);

    return updateItems;
}

async function remove(id: string): Promise<void> {
    const itens = await get();
    const updateItems = itens.filter(item => item.id !== id);
    await save(updateItems);
}

async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
    } catch (error) {
        throw new Error("ITENS_CLEAR: " + error);
    }
}

async function toogleStatus(id: string): Promise<void> {
    const items = await get();
    const updateItems = items.map(item => {
        if (item.id === id) {
            return {...item, status: item.status === FilterStatus.PENDING ? FilterStatus.DONE : FilterStatus.PENDING}
        }
        return item;
    })
    await save(updateItems);
}

export const itemsStorage = { add, remove, clear, toogleStatus, getByStatus }