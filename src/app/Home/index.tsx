import {styles} from "./styles";
import {Item} from "@/components/Item";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {Filter} from "@/components/Filter";
import {FilterStatus} from "@/types/FilterStatus";
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

const FILTER_STATUS: FilterStatus[] = [
    FilterStatus.PENDING,
    FilterStatus.DONE
]
const ITEMS = [
    {id: "1", status: FilterStatus.DONE, description: "Café Pilão"},
    {id: "2", status: FilterStatus.PENDING, description: "Café Três corações"},
    {id: "3", status: FilterStatus.PENDING, description: "Café Especial"},
    {id: "4", status: FilterStatus.DONE, description: "Macarrão Santa Amalia"},
];

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
             source={require('@/assets/logo.png')}/>
        <View style={styles.form}>
            <Input placeholder="O que você precisa comprar?"/>
            <Button title="Entrar"/>
        </View>
        <View style={styles.content}>
            <View style={styles.header}>
                {FILTER_STATUS.map((status) => (
                    <Filter isActive
                            key={status}
                            status={status}/>
                ))}
                <TouchableOpacity style={styles.clearButton}>
                    <Text style={styles.clearText}>Limpar</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={ITEMS}
                      ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui</Text>}
                      contentContainerStyle={styles.listContent}
                      ItemSeparatorComponent={() => <View style={styles.separator}/>}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                        <Item data={item}
                              onStatus={console.log}
                              onRemove={console.log}/>
                      )}/>
        </View>
    </View>
  );
}
