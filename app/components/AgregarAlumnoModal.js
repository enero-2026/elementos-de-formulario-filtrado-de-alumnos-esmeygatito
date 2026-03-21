import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, TextInput, Button } from 'react-native-paper';

export default function AgregarAlumnoModal({
  visible,
  onDismiss,
  onAdd,
  primaryColor = '#16a34a',
  secondaryColor = '#ec4899'
}) {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');

  const handleCancel = () => {
    setMatricula('');
    setNombre('');
    onDismiss?.();
  };

  const handleAdd = () => {
    // Preparado para conectar la lógica en el siguiente paso.
    onAdd?.({ matricula: matricula.trim(), nombre: nombre.trim() });
    setMatricula('');
    setNombre('');
    onDismiss?.();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={styles.modalContainer}
      >
        <Text variant="titleLarge" style={[styles.title, { color: primaryColor }]}>
          Agregar Alumno
        </Text>

        <TextInput
          mode="outlined"
          label="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          style={styles.input}
          outlineColor="#d1fae5"
          activeOutlineColor={primaryColor}
          textColor="#064e3b"
        />

        <TextInput
          mode="outlined"
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          outlineColor="#d1fae5"
          activeOutlineColor={primaryColor}
          textColor="#064e3b"
        />

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            textColor={secondaryColor}
            style={[styles.button, styles.cancelButton]}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            onPress={handleAdd}
            buttonColor={primaryColor}
            textColor="#ffffff"
            style={styles.button}
          >
            Agregar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1fae5'
  },
  title: {
    fontWeight: '700',
    marginBottom: 12
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#ffffff'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8
  },
  button: {
    borderRadius: 10
  },
  cancelButton: {
    borderColor: '#f9a8d4'
  }
});
