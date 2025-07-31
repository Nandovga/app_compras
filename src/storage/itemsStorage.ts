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

export const itemsStorage = { get, add, getByStatus }