import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';

export default function EliminarAlumnoModal({
  visible,
  alumno,
  onDismiss,
  onConfirm,
  primaryColor = '#16a34a',
  secondaryColor = '#ec4899'
}) {
  const nombreCompleto = `${alumno?.apellidos || ''} ${alumno?.nombre || ''}`.trim() || 'alumno seleccionado';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Text variant="titleLarge" style={[styles.title, { color: primaryColor }]}>Eliminar Alumno</Text>
        <Text style={styles.message}>
          ¿Seguro que deseas eliminar a {nombreCompleto}?
        </Text>

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onDismiss}
            textColor={secondaryColor}
            style={[styles.button, styles.cancelButton]}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            onPress={onConfirm}
            buttonColor={secondaryColor}
            textColor="#ffffff"
            style={styles.button}
          >
            Eliminar
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
    borderColor: '#fbcfe8'
  },
  title: {
    fontWeight: '700',
    marginBottom: 8
  },
  message: {
    color: '#334155',
    marginBottom: 10
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
