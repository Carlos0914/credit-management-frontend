import LoansList from "./LoansList";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function AdminView() {
  return (
    <ThemedView>
      <LoansList />
    </ThemedView>
  );
}
