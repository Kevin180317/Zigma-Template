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
    width: 150,
    height: 150,
  },
});

// Crear documento
const MyDocument = ({ proyecto }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{proyecto.nombre}</Text>
      </View>
      <Image
        style={styles.image}
        src={`data:image/jpeg;base64,${proyecto.imagen}`}
      />
      <View style={styles.section}>
        <Text>{proyecto.opcion}</Text>
      </View>
    </Page>
  </Document>
);
export default MyDocument;
