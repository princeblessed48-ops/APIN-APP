import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const roleCards = [
  { role: 'Super Admin', summary: 'System configuration, users and audit review.' },
  { role: 'Receptionist', summary: 'Patient intake and request submission workflow.' },
  { role: 'Scientist', summary: 'Worksheet review and approval queue.' },
  { role: 'Storekeeper', summary: 'Inventory, receipts, issues and low-stock alerts.' },
  { role: 'Quality Manager', summary: 'Controlled documents and quality actions.' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.kicker}>APIN–JUTH</Text>
        <Text style={styles.title}>Laboratory Operations</Text>
        <Text style={styles.subtitle}>Role-aware dashboard shell for secure operations.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {roleCards.map((item) => (
          <View key={item.role} style={styles.card}>
            <Text style={styles.cardRole}>{item.role}</Text>
            <Text style={styles.cardSummary}>{item.summary}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f7fb',
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#0d3b66',
  },
  kicker: {
    color: '#dfeaf5',
    fontWeight: '600',
    letterSpacing: 1,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    color: '#dfeaf5',
    fontSize: 14,
  },
  content: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dfe9f3',
    padding: 16,
    shadowColor: '#001f3f',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  cardRole: {
    color: '#0d3b66',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSummary: {
    color: '#44576a',
    fontSize: 14,
    lineHeight: 20,
  },
});
