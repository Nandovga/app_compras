import { styles } from "./styles";
import { Item } from "@/components/Item";
import { Input } from "@/components/Input";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { ItemsStorage, itemsStorage } from "@/storage/itemsStorage"
import { FlatList, Image, Text, TouchableOpacity, View, Alert } from 'react-native';

const FILTER_STATUS: FilterStatus[] = [
    FilterStatus.PENDING,
    FilterStatus.DONE
]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemsStorage[]>([]);

  async function itensByStatus() {
        try {
            const response = await itemsStorage.getByStatus(filter);
            setItems(response);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os itens.')
        }
    }

  async function handleAdd() {
      if (!description.trim()) {
          return Alert.alert('Adicionar', 'Informe a descrição para adicionar.')
      }
      const newItem = {
          id: Math.random().toString(36).substring(2),
          description,
          status: FilterStatus.PENDING
      }

      await itemsStorage.add(newItem);
      await itensByStatus();

      setFilter(FilterStatus.PENDING)
      setDescription("")
  }

  async function handleRemove(id: string) {
      try {
          await itemsStorage.remove(id);
          await itensByStatus();
      } catch (error) {
          Alert.alert('Erro', 'Não foi possível remover o item.')
      }
  }

  async function handleClear() {
      try {
          Alert.alert('Limpar', 'Tem certeza que deseja limpar todos os itens?', [
              {text: "Não", style: "cancel"},
              {text: "Sim", onPress: () => {
                itemsStorage.clear();
                setItems([]);
              }}
          ])
      } catch (error) {
          Alert.alert('Erro', 'Não foi possível limpar.')
      }
  }

  async function handleToogleStatus(id: string) {
      try {
        await itemsStorage.toogleStatus(id);
        await itensByStatus();
      } catch (error) {
          Alert.alert('Erro', 'Não foi possível alterar o status.')
      }
  }

  useEffect(() => {
    itensByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image style={styles.logo}
             source={require('@/assets/logo.png')}/>
        <View style={styles.form}>
            <Input placeholder="O que você precisa comprar?"
                   value={description}
                   onChangeText={setDescription}/>
            <Button title="Adicionar"
                    onPress={handleAdd}/>
        </View>
        <View style={styles.content}>
            <View style={styles.header}>
                {FILTER_STATUS.map((status) => (
                    <Filter isActive={status === filter}
                            key={status}
                            status={status}
                            onPress={() => setFilter(status)}/>
                ))}
                <TouchableOpacity style={styles.clearButton}
                                  onPress={handleClear}>
                    <Text style={styles.clearText}>Limpar</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={items}
                      ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui</Text>}
                      contentContainerStyle={styles.listContent}
                      ItemSeparatorComponent={() => <View style={styles.separator}/>}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                        <Item data={item}
                              onStatus={() => handleToogleStatus(item.id)}
                              onRemove={() => handleRemove(item.id)}/>
                      )}/>
        </View>
    </View>
  );
}
