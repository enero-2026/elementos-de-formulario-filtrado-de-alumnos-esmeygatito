import { FlatList, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { List, TextInput, Text, Avatar, TouchableRipple, Button } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AgregarAlumnoModal from '../components/AgregarAlumnoModal';

// Function to separate names
export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [query, setQuery] = useState('');
  const [showAgregarModal, setShowAgregarModal] = useState(false);

  // separa nombre completo en { apellidos, nombre }
  const separateNames = (initialAlumnos) => {
    const alumnosSeparados = initialAlumnos.map(alumno => {
      const partes = (alumno.nombre || '').split(' ').filter(Boolean);
      // Asumimos que los primeros dos elementos son apellidos
      const apellidos = partes.slice(0, 2).join(' ');
      const nombres = partes.slice(2).join(' ');
      return {
        matricula: alumno.matricula,
        apellidos: apellidos,
        nombre: nombres
      };
    });
    return alumnosSeparados;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const initialAlumnos = [
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
      ];

      setAlumnos(separateNames(initialAlumnos));
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
        const apellidos = (a.apellidos || '').toLowerCase();
        const matricula = (a.matricula || '').toLowerCase();
        const full = (apellidos + ' ' + nombre).trim();
        return full.includes(q) || nombre.includes(q) || apellidos.includes(q) || matricula.includes(q);
      })
    );
  }, [query, alumnos]);

  // sort by nombre then apellidos A-Z
  const sortByNombreApellidoAZ = (arr) => {
    const s = [...arr];
    s.sort((a, b) => {
      const na = ((a.nombre || '') + ' ' + (a.apellidos || '')).trim().toLowerCase();
      const nb = ((b.nombre || '') + ' ' + (b.apellidos || '')).trim().toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      return 0;
    });
    return s;
  }

  if (!alumnos) return null;
  const PRIMARY = '#16a34a'; // green
  const SECONDARY = '#ec4899'; // pink
  const ACCENT = PRIMARY;
  const [selectedSort, setSelectedSort] = useState('nombre_asc');

  const applySort = (option) => {
    setSelectedSort(option);
    const source = alumnosFiltrados.length ? alumnosFiltrados : alumnos;
    let result = [...source];
    switch (option) {
      case 'nombre_asc':
        result = sortByNombreApellidoAZ(source);
        break;
      case 'nombre_desc':
        result = sortByNombreApellidoAZ(source).reverse();
        break;
      case 'apellidos_asc':
        result.sort((a, b) => {
          const A = (a.apellidos || '').toLowerCase();
          const B = (b.apellidos || '').toLowerCase();
          if (A < B) return -1;
          if (A > B) return 1;
          return 0;
        });
        break;
      case 'apellidos_desc':
        result.sort((a, b) => {
          const A = (a.apellidos || '').toLowerCase();
          const B = (b.apellidos || '').toLowerCase();
          if (A < B) return 1;
          if (A > B) return -1;
          return 0;
        });
        break;
    }
    setAlumnosFiltrados(result);
  }

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const handleVisualAdd = () => {
    // Placeholder visual; en el siguiente paso aquí conectamos la lógica de inmutabilidad.
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="account-plus"
        onPress={() => setShowAgregarModal(true)}
        buttonColor={PRIMARY}
        textColor="#ffffff"
        style={styles.openModalButton}
        contentStyle={styles.openModalButtonContent}
      >
        Nuevo Alumno
      </Button>

      <AgregarAlumnoModal
        visible={showAgregarModal}
        onDismiss={() => setShowAgregarModal(false)}
        onAdd={handleVisualAdd}
        primaryColor={PRIMARY}
        secondaryColor={SECONDARY}
      />

      <List.Accordion title="Opciones de orden" titleStyle={{ color: PRIMARY }} left={props => <List.Icon {...props} icon="sort" color={PRIMARY} />}>
        <List.Item
          title="Nombre A → Z"
          description="Ordena por nombre, ascendente"
          titleStyle={{ color: '#064e3b' }}
          descriptionStyle={{ color: SECONDARY }}
          left={props => <List.Icon {...props} icon="sort-ascending" color={PRIMARY} />}
          right={props => selectedSort === 'nombre_asc' ? <List.Icon {...props} icon="check" color={SECONDARY} /> : null}
          onPress={() => applySort('nombre_asc')}
        />

        <List.Item
          title="Nombre Z → A"
          description="Ordena por nombre, descendente"
          titleStyle={{ color: '#064e3b' }}
          descriptionStyle={{ color: SECONDARY }}
          left={props => <List.Icon {...props} icon="sort-descending" color={PRIMARY} />}
          right={props => selectedSort === 'nombre_desc' ? <List.Icon {...props} icon="check" color={SECONDARY} /> : null}
          onPress={() => applySort('nombre_desc')}
        />

        <List.Item
          title="Apellidos A → Z"
          description="Ordena por apellidos, ascendente"
          titleStyle={{ color: '#064e3b' }}
          descriptionStyle={{ color: SECONDARY }}
          left={props => <List.Icon {...props} icon="account" color={PRIMARY} />}
          right={props => selectedSort === 'apellidos_asc' ? <List.Icon {...props} icon="check" color={SECONDARY} /> : null}
          onPress={() => applySort('apellidos_asc')}
        />

        <List.Item
          title="Apellidos Z → A"
          description="Ordena por apellidos, descendente"
          titleStyle={{ color: '#064e3b' }}
          descriptionStyle={{ color: SECONDARY }}
          left={props => <List.Icon {...props} icon="account-arrow-right" color={PRIMARY} />}
          right={props => selectedSort === 'apellidos_desc' ? <List.Icon {...props} icon="check" color={SECONDARY} /> : null}
          onPress={() => applySort('apellidos_desc')}
        />
      </List.Accordion>

      <TextInput
        mode="outlined"
        label="Buscar por nombre o matrícula"
        value={query}
        onChangeText={setQuery}
        left={<TextInput.Icon icon="magnify" color={PRIMARY} />}
        right={query ? <TextInput.Icon icon="close" color={SECONDARY} onPress={() => setQuery('')} /> : null}
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
                  <Avatar.Text size={44} label={getInitials((item.apellidos || '') + ' ' + (item.nombre || ''))} style={{ backgroundColor: ACCENT }} />
                </View>
                <View style={styles.info}>
                  <Text variant="titleMedium" style={styles.name}>{`${item.apellidos} ${item.nombre}`.trim()}</Text>
                  <Text variant="bodySmall" style={styles.matricula}>{item.matricula}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={PRIMARY} />
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
    backgroundColor: '#f0fdf4'
  },
  search: {
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#d1fae5'
  },
  openModalButton: {
    marginBottom: 10,
    borderRadius: 10
  },
  openModalButtonContent: {
    paddingVertical: 6
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
    borderColor: '#d1fae5',
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
    color: '#064e3b'
  },
  matricula: {
    color: '#ec4899'
  }
});