import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import apiClient from "@/scripts/apiClient";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function LoanDetails() {
  const route = useRoute();
  const { id } = route.params || ({} as any);
  const [loan, setLoan] = useState({} as any);
  const [paymentStatus, setPaymentStatus] = useState(
    "due" as "due" | "overdue" | "paid"
  );

  useEffect(() => {
    console.log("LoanDetails Screen Mounted with id:", id);
    apiClient(`admin/get-loan/${id}`).then((data) => {
      console.log("Loan Details Data:", data);
      setLoan(data);
    });
  }, [id]);

  useEffect(() => {
    if (loan.next_payment_date) {
      const nextPaymentDate = new Date(loan.next_payment_date);
      const currentDate = new Date();
      const timeDifference =
        new Date(nextPaymentDate.toDateString()).getTime() -
        new Date(currentDate.toDateString()).getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference > 3) {
        setPaymentStatus("paid");
      } else if (daysDifference >= 0 && daysDifference <= 3) {
        setPaymentStatus("due");
      } else {
        setPaymentStatus("overdue");
      }
    }
  }, [loan.next_payment_date]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView
        style={{
          backgroundColor:
            paymentStatus === "paid"
              ? "green"
              : paymentStatus === "due"
              ? "darkorange"
              : "darkred",
          padding: 16,
        }}
      >
        <ThemedText style={{ color: "white", textAlign: "center" }}>
          Detalles del préstamo #{loan.loan_id} -{" "}
          {paymentStatus === "paid"
            ? "Al corriente"
            : paymentStatus === "due"
            ? "Próximo a vencer"
            : "Vencido"}
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Nombre del Cliente
            </ThemedText>
            <ThemedText>{loan.user_name}</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Monto del préstamo
            </ThemedText>
            <ThemedText>${loan.principal_amount}</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Saldo Restante
            </ThemedText>
            <ThemedText>${loan.remaining_principal}</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Tasa de Interés
            </ThemedText>
            <ThemedText>{loan.interest_rate}%</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>Tipo:</ThemedText>
            <ThemedText>
              {loan.type === "Monthly"
                ? "Mensual"
                : loan.type === "Twice a month"
                ? "Quincenal"
                : loan.type === "Weekly"
                ? "Semanal"
                : loan.type}
            </ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Total de periodos
            </ThemedText>
            <ThemedText>{loan.periods}</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Periodo Actual
            </ThemedText>
            <ThemedText>{loan.current_period}</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Fecha del Próximo Pago
            </ThemedText>
            <ThemedText>
              {new Date(loan.next_payment_date).toLocaleDateString()}
            </ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Monto del Pago
            </ThemedText>
            <ThemedText>${loan.payment_amount}</ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Fecha de apertura
            </ThemedText>
            <ThemedText>
              {new Date(loan.created_at).toLocaleDateString()}
            </ThemedText>
          </View>
          <View style={{ width: "50%", padding: 8 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Ultima modificación
            </ThemedText>
            <ThemedText>
              {new Date(loan.updated_at).toLocaleDateString()}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
