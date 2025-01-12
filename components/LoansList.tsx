import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import client from "../scripts/apiClient";
import { ThemedView } from "./ThemedView";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

export default function LoansList() {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  useEffect(() => {
    isFocused &&
      (async () => {
        const fetchedData = await client("admin/list-loans");
        setData(fetchedData);
      })();
  }, [isFocused]);

  return (
    <ThemedView>
      {data.map((loan: any) => (
        <ThemedView
          key={loan.loan_id}
          style={{
            padding: 10,
            margin: 10,
            borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontWeight: "bold", fontSize: 18 }}>
            Saldo a pagar:{" "}
            {!isNaN(parseFloat(loan.remaining_principal))
              ? loan.remaining_principal
              : 0}
          </ThemedText>
          <ThemedText style={{ textAlign: "center", flex: 1 }}>
            {/* TODO: Change this to next payment date */}
            Proximo pago: {new Date(loan.created_at).toLocaleDateString()}
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
              Frecuencia:{" "}
              {loan.type === "Weekly"
                ? "Semanal"
                : loan.type === "Monthly"
                ? "Mensual"
                : loan.type === "Twice a month"
                ? "Quincenal"
                : loan.type}
            </ThemedText>
            <ThemedText style={{ textAlign: "center", flex: 1 }}>
              Apertura: {new Date(loan.created_at).toLocaleDateString()}
            </ThemedText>
            <ThemedText style={{ textAlign: "center", flex: 1 }}>
              Tasa: {(loan.interest_rate * 100).toFixed(2)}%
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
}
