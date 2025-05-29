import {styles} from "./styles";
import {Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container}
                          activeOpacity={0.8}
                          {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}