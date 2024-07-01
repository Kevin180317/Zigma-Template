/* eslint-disable react/prop-types */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// import imagen1 from "/1.jpg";
// import imagen2 from "/2.jpg";
// import imagen3 from "/3.jpg";

// const imagenesDefinir = [imagen1, imagen2, imagen3];
// const imagenesMedida = [imagen1, imagen2, imagen3];
// const imagenesAnalizar = [imagen1, imagen2, imagen3];
// const imagenesMejorar = [imagen1, imagen2, imagen3];
// const imagenesControlar = [imagen1, imagen2, imagen3];

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  sectionpage1: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignItems: "center", // Centra los elementos horizontalmente
    justifyContent: "center", // Centra los elementos verticalmente
    marginBottom: 24,
  },
  sectionpage2: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    margin: 10,
    width: 250,
    height: 250,
  },
});

// function seleccionarImagenAleatoriaDefinir() {
//   const indiceAleatorio = Math.floor(Math.random() * imagenesDefinir.length);
//   return imagenesDefinir[indiceAleatorio];
// }

// function seleccionarImagenAleatoriaMedida() {
//   const indiceAleatorio = Math.floor(Math.random() * imagenesMedida.length);
//   return imagenesMedida[indiceAleatorio];
// }

// function seleccionarImagenAleatoriaAnalizar() {
//   const indiceAleatorio = Math.floor(Math.random() * imagenesAnalizar.length);
//   return imagenesAnalizar[indiceAleatorio];
// }

// function seleccionarImagenAleatoriaMejorar() {
//   const indiceAleatorio = Math.floor(Math.random() * imagenesMejorar.length);
//   return imagenesMejorar[indiceAleatorio];
// }

// function seleccionarImagenAleatoriaControlar() {
//   const indiceAleatorio = Math.floor(Math.random() * imagenesControlar.length);
//   return imagenesControlar[indiceAleatorio];
// }

// Crear documento
const MyDocument = ({ proyecto }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage1}>
        <Image
          style={styles.image}
          src={`data:image/jpeg;base64,${proyecto.imagen}`}
        />
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Nombre del proyecto: {proyecto.nombre}
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Ubicación: {proyecto.ubicacion}
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Autor del proyecto: {proyecto.profesional}
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Fecha de inicio del proyecto: {proyecto.descripcion}
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Año: {new Date().getFullYear()}
        </Text>{" "}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
          }}
        >
          Índice
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Definir
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Medida
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Analizar
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Mejorar
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Controlar
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Recomendaciones
        </Text>
        <Text
          style={{
            paddingBottom: 24,
          }}
        >
          Anexos
        </Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Definir (ver anexo 1)
        </Text>{" "}
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Objetivos
        </Text>
        <Text>{proyecto.objetivos}</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 20,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Productos finales para los clientes (internos y externos)
        </Text>
        <Text>{proyecto.enumere}</Text>
        {/* {proyecto.definircompletado === "Si" && (
          <Image
            style={styles.image}
            src={seleccionarImagenAleatoriaDefinir()}
          />
        )}{" "} */}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Medida (ver anexo 2){" "}
        </Text>
        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          {" "}
          Plan de recopilación de datos
        </Text> */}
        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Rendimiento actual del proceso
        </Text> */}

        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Planteamiento del problema
        </Text>
        <Text>{proyecto.planteamientoProblema}</Text>
        {/* {proyecto.medidacompletado === "Si" && (
          <Image
            style={styles.image}
            src={seleccionarImagenAleatoriaMedida()}
          />
        )} */}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Analizar (ver anexo 3)
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Objetivos del rendimiento
        </Text>
        <Text>{proyecto.objetivosanalizar}</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Proceso con valor/sin valor añadido
        </Text>
        <Text>{proyecto.enumereanalizar}</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Fuentes de variación
        </Text>
        <Text>{proyecto.fuentesvariacion}</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Entradas vitales en relación con el producto
        </Text>
        <Text>{proyecto.entradasvitales}</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Causa raíz del problema
        </Text>
        <Text>{proyecto.causaproblema}</Text>
        {/* {proyecto.analizarcompletado === "Si" && (
          <Image
            style={styles.image}
            src={seleccionarImagenAleatoriaAnalizar()}
          />
        )} */}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Mejorar (ver anexo 4)
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Posibles soluciones
        </Text>
        <Text>{proyecto.posiblesSoluciones}</Text>

        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Tolerancias operativas
        </Text> */}

        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Experimentos de diseño
        </Text> */}

        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Posibles mejoras
        </Text> */}

        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Evaluaron y reevaluaron las posibles soluciones
        </Text> */}
        {/* {proyecto.mejorarcompletado === "Si" && (
          <Image
            style={styles.image}
            src={seleccionarImagenAleatoriaMejorar()}
          />
        )} */}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Controlar (ver anexo 5)
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Sistema de seguimiento y control
        </Text>
        <Text>{proyecto.sistemaSeguimiento}</Text>
        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Control estadístico de los procesos
        </Text> */}

        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Plan de transferencia
        </Text>
        <Text>{proyecto.planTransferencia}</Text>
        {/* <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Costes y el crecimiento de las ganancias
        </Text> */}
        {/* {proyecto.controlarcompletado === "Si" && (
          <Image
            style={styles.image}
            src={seleccionarImagenAleatoriaControlar()}
          />
        )} */}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Recomendaciones
        </Text>
        <Text>{proyecto.recomendaciones}</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Anexos
        </Text>
        <Text>Definir</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Anexo 1
        </Text>
        <Text>{proyecto.opcion}</Text>
        <Image
          style={styles.image}
          src={`data:image/jpeg;base64,${proyecto.imagen2}`}
        />
        <Text>Medida</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Anexo 2
        </Text>
        <Text>{proyecto.opcion2}</Text>
        <Image
          style={styles.image}
          src={`data:image/jpeg;base64,${proyecto.imagen3}`}
        />
        <Text>Analizar</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Anexo 3
        </Text>
        <Text>{proyecto.opcion3}</Text>
        <Image
          style={styles.image}
          src={`data:image/jpeg;base64,${proyecto.imagen4}`}
        />
        <Text>Mejorar</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Anexo 4
        </Text>
        <Text>{proyecto.opcion4}</Text>
        <Image
          style={styles.image}
          src={`data:image/jpeg;base64,${proyecto.imagen5}`}
        />
        <Text>Controlar</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Anexo 5
        </Text>
        <Text>{proyecto.opcion5}</Text>
        <Image
          style={styles.image}
          src={`data:image/jpeg;base64,${proyecto.imagen6}`}
        />
      </View>
    </Page>
  </Document>
);
export default MyDocument;
