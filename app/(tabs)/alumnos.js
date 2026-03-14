import { FlatList, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { List, TextInput, Text, Avatar, TouchableRipple } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlumnos([
            { matricula: '2114354', nombre: 'CANDELARIA MORA SAMANTHA' },
    { matricula: '2121179', nombre: 'AGUILAR ORTIZ LUIS ROLANDO' },
    { matricula: '2048051', nombre: 'BARRIENTOS GALLEGOS DIEGO' },
    { matricula: '1979822', nombre: 'CANO MONTIEL KELLY YISSETH' },
    { matricula: '2111889', nombre: 'CANTU SILVA JAVIER' },
    { matricula: '2069119', nombre: 'CARMONA LOZANO ANGEL EMILIANO' },
    { matricula: '2132842', nombre: 'CASTILLO ACOSTA JORGE' },
    { matricula: '1994122', nombre: 'DAVILA GONZALEZ ALDO ADRIAN' },
    { matricula: '2018230', nombre: 'DURAN BARRIENTOS FABRIZIO' },
    { matricula: '2104564', nombre: 'FLORES GONZALEZ SEBASTIAN' },
    { matricula: '2066033', nombre: 'FLORES LÓPEZ DIEGO' },
    { matricula: '2132976', nombre: 'FLORES MARTINEZ ERICK ADRIAN' },
    { matricula: '2066114', nombre: 'GARZA AVALOS DIEGO' },
    { matricula: '2031243', nombre: 'GONZALEZ OVALLE CHRISTIAN GABRIEL' },
    { matricula: '2064733', nombre: 'GRANJA PEÑA DIEGO' },
    { matricula: '2094647', nombre: 'IBARRA RODRIGUEZ ALEXIS' },
    { matricula: '2005102', nombre: 'MARTINEZ ELIAS ANGEL SEBASTIAN' },
    { matricula: '2064574', nombre: 'MENDIETA GONZALEZ ESMERALDA GABRIELA' },
    { matricula: '2024783', nombre: 'MIRELES VELAZQUEZ ALEJANDRO' },
    { matricula: '2066077', nombre: 'MONSIVAIS SALAZAR ANDRES' },
    { matricula: '2092151', nombre: 'PARRAZALEZ VALDESPINO MARTHA JULIETA' },
    { matricula: '2103708', nombre: 'PEÑA MUNGARRO LUIS ANGEL' },
    { matricula: '2115192', nombre: 'PUENTE REYNOSO JULIO CESAR' },
    { matricula: '2103765', nombre: 'RAMIREZ LOPEZ BRYAN' },
    { matricula: '2056778', nombre: 'RAMOS AVILA LILIANA VALERIA' },
    { matricula: '2037503', nombre: 'RICO JAUREGUI MAURICIO' },
    { matricula: '2131513', nombre: 'RIVERA LUNA ADRIAN' },
    { matricula: '2013503', nombre: 'RIVERA REYNA JOSE EMILIO' },
    { matricula: '2004613', nombre: 'RODRIGUEZ OLVERA ROSA ISELA' },
    { matricula: '2133022', nombre: 'RODRIGUEZ RODRIGUEZ ANGEL AZAEL' },
    { matricula: '2026061', nombre: 'SANCHEZ GALARZA JUAN CARLOS' },
    { matricula: '2095320', nombre: 'SOLIS ORTIZ ALFREDO' },
    { matricula: '2025350', nombre: 'VELAZQUEZ ABREGO HERWIN DANIEL' },
    { matricula: '2103895', nombre: 'VILLAGRA RODRIGUEZ ANDRES NEHUEL' },
    { matricula: '1857791', nombre: 'ZACATENCO OLIVE RODRIGO' },
    { matricula: '2025218', nombre: 'ZAVALA CANTU TERESA MARGARITA' }
      ]);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setAlumnosFiltrados(alumnos);
  }, [alumnos]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setAlumnosFiltrados(alumnos);
      return;
    }
    setAlumnosFiltrados(
      alumnos.filter(a => {
        const nombre = (a.nombre || '').toLowerCase();
        const matricula = (a.matricula || '').toLowerCase();
        return nombre.includes(q) || matricula.includes(q);
      })
    );
  }, [query, alumnos]);

  if (!alumnos) return null;
  const ACCENT = '#6b7280';

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Buscar por nombre o matrícula"
        value={query}
        onChangeText={setQuery}
        left={<TextInput.Icon icon="magnify" />}
        right={query ? <TextInput.Icon icon="close" onPress={() => setQuery('')} /> : null}
        style={[styles.search, { backgroundColor: '#ffffff' }]}
        underlineColor="transparent"
      />

      {alumnosFiltrados.length === 0 ? (
        <View style={styles.center}>
          <Text>No se encontraron alumnos</Text>
        </View>
      ) : (
        <FlatList
          data={alumnosFiltrados}
          keyExtractor={(item) => item.matricula}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => {}} rippleColor="rgba(0,0,0,0.06)">
              <View style={styles.item}>
                <View style={styles.avatarWrapper}>
                  <Avatar.Text size={44} label={getInitials(item.nombre)} style={{ backgroundColor: ACCENT }} />
                </View>
                <View style={styles.info}>
                  <Text variant="titleMedium" style={styles.name}>{item.nombre}</Text>
                  <Text variant="bodySmall" style={styles.matricula}>{item.matricula}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#6b7280" />
              </View>
            </TouchableRipple>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f3f4f6'
  },
  search: {
    marginBottom: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 0,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    marginBottom: 2,
  },
  matricula: {
    color: '#6b7280'
  }
});