/* eslint-disable react/prop-types */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    margin: 10,
    width: 500,
    height: 500,
  },
});

// Crear documento
const MyDocument = ({ proyecto }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Nombre: {proyecto.nombre}</Text>
      </View>
      <Image
        style={styles.image}
        src={`data:image/jpeg;base64,${proyecto.imagen}`}
      />
      <View style={styles.section}>
        <Text>Ubicación: {proyecto.ubicacion}</Text>
        <Text>Profesional: {proyecto.profesional}</Text>
        <Text>Descripción: {proyecto.descripcion}</Text>
        <Text>Objetivos: {proyecto.objetivos}</Text>
        <Text>Enumere: {proyecto.enumere}</Text>
      </View>
      <Image
        style={styles.image}
        src={`data:image/jpeg;base64,${proyecto.imagen2}`}
      />
      <Image
        style={styles.image}
        src={`data:image/jpeg;base64,${proyecto.imagen3}`}
      />
      <Image
        style={styles.image}
        src={`data:image/jpeg;base64,${proyecto.imagen4}`}
      />
      <Text>Opción: {proyecto.opcion}</Text>
    </Page>
  </Document>
);
export default MyDocument;
