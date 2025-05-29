import {styles} from "./styles";
import {TextInput, TextInputProps} from "react-native";

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            style={styles.container}
            placeholderTextColor="#74798b"
            {...rest}/>
    )
}