import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@react-native-material/core";

export default function Ir(vai: any) {

    return (
        <View
            style={styles.rota}>
            <Text
                style={styles.lbl}>
                Rota UTFPR
            </Text>
            <Button
                title={"IR"}
                color={"#8D28FF"}
                style={styles.butn}
                onPress={() => { vai.navigate("rota-1"); }}
            />

            <Text
                style={styles.lbl}>
                Rota Entre Bairros 1
            </Text>
            <Button
                title={"IR"}
                color={"#8D28FF"}
                style={styles.butn}
                onPress={() => { vai.navigate("rota-2"); }}
            />

            <Text
                style={styles.lbl}>
                Rota Entre Bairros 2
            </Text>
            <Button
                title={"IR"}
                color={"#8D28FF"}
                style={styles.butn}
                onPress={() => { vai.navigate("rota-3"); }}
            />
        </View>
    );


}

const styles = StyleSheet.create({
    rota: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#000",
        padding: 10,
    },
    lbl: {
        color: "#B7B7B7",
        padding: 10,
    },
    butn: {
        width: "8%",
        padding: 10,
    }
});