import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, TextInput, Button } from 'react-native-paper';

export default function EditarAlumnoModal({
  visible,
  alumno,
  onDismiss,
  onSave,
  primaryColor = '#16a34a',
  secondaryColor = '#ec4899'
}) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (!visible) return;
    const nombreCompleto = `${alumno?.apellidos || ''} ${alumno?.nombre || ''}`.trim();
    setNombre(nombreCompleto);
  }, [visible, alumno]);

  const matricula = (alumno?.matricula || '').trim();
  const isFormValid = matricula.length > 0 && nombre.trim().length > 0;

  const handleCancel = () => {
    setNombre('');
    onDismiss?.();
  };

  const handleSave = () => {
    if (!isFormValid) return;

    onSave?.({ matricula, nombre: nombre.trim() });
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
          Editar Alumno
        </Text>

        <TextInput
          mode="outlined"
          label="Matrícula"
          value={matricula}
          editable={false}
          style={styles.input}
          outlineColor="#d1fae5"
          textColor="#64748b"
        />

        <TextInput
          mode="outlined"
          label="Nombre completo"
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
            onPress={handleSave}
            disabled={!isFormValid}
            buttonColor={primaryColor}
            textColor="#ffffff"
            style={styles.button}
          >
            Guardar
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
