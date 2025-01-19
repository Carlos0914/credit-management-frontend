import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import client from "../scripts/apiClient";
import { ThemedView } from "./ThemedView";
import { useIsFocused } from "@react-navigation/native";
import { Button, Text, useColorScheme, View } from "react-native";
import {
  BaseButton,
  PureNativeButton,
  RawButton,
  RectButton,
  TextInput,
} from "react-native-gesture-handler";

export default function LoansList() {
  const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    isFocused &&
      (async () => {
        const fetchedData = await client("admin/list-loans");
        setData(fetchedData);
        setFilteredData(fetchedData);
      })();
  }, [isFocused]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (search) {
        setFilteredData(
          data.filter((loan: any) =>
            loan.user_name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setFilteredData(data);
      }
    }, 1000);

    return () => clearTimeout(debounceSearch);
  }, [search, data]);

  return (
    <ThemedView>
      <TextInput
        style={{
          height: 40,
          borderColor: colorScheme === "dark" ? "#888888" : "black",
          borderWidth: 1,
          paddingLeft: 10,
          color: colorScheme === "dark" ? "white" : "black",
          position: "sticky",
          top: 0,
        }}
        placeholder="Buscar por nombre"
        placeholderTextColor={colorScheme === "dark" ? "white" : "gray"}
        value={search}
        onChangeText={(text: string) => setSearch(text)}
      />
      {filteredData.map((loan: any) => (
        <ThemedView key={loan.loan_id}>
          <ThemedView
            style={{
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
              marginTop: 10,
              borderWidth: 1,
              alignItems: "center",
              borderColor: colorScheme === "dark" ? "white" : "black",
            }}
          >
            <ThemedText
              style={{
                fontWeight: "bold",
                fontSize: 18,
                padding: 8,
                width: "100%",
                marginLeft: 10,
                marginRight: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginBottom: 6,
                borderBottomWidth: 0,
                textAlign: "center",
                backgroundColor: "green",
                borderColor: colorScheme === "dark" ? "white" : "black",
                borderWidth: 0,
                color: "white",
              }}
            >
              {loan.user_name}
            </ThemedText>
            <ThemedText style={{ fontWeight: "bold", fontSize: 18 }}>
              Pago: #{loan.current_period} / {loan.periods}
            </ThemedText>
            <ThemedText style={{ textAlign: "center", flex: 1 }}>
              Monto a pagar: ${loan.payment_amount}
            </ThemedText>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 10,
              }}
            >
              <ThemedText style={{ textAlign: "center", flex: 1 }}>
                Apertura: {new Date(loan.created_at).toLocaleDateString()}
              </ThemedText>
              <ThemedText style={{ textAlign: "center", flex: 1 }}>
                Próximo Pago:{" "}
                {new Date(loan.next_payment_date).toLocaleDateString()}
              </ThemedText>
              <ThemedText style={{ textAlign: "center", flex: 1 }}>
                {/* TODO: get settlement amount from calculator */}
                Liquida Ahora: ${loan.remaining_principal}
              </ThemedText>
            </ThemedView>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <RectButton
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "orange",
                  borderBottomLeftRadius: 10,
                  borderRightWidth: 1,
                  borderRightColor: "white",
                }}
              >
                <ThemedText lightColor="white">Detalles</ThemedText>
              </RectButton>
              <RectButton
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "darkorange",
                  borderBottomRightRadius: 10,
                  borderLeftWidth: 1,
                  borderLeftColor: "white",
                }}
              >
                <ThemedText lightColor="white">Registrar Pago</ThemedText>
              </RectButton>
            </View>
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
}
