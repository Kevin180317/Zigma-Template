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
    width: 300,
    height: 300,
  },
});

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
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text>Medida (ver anexo 2) </Text>
        <Text
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
        </Text>
        <Text>
          {proyecto.planRecopilacion === "si"
            ? "Hemos desarrollado un plan integral de recopilación de datos para cuantificar el problema. Este plan detallado nos permitirá cuantificar el problema de manera precisa y proporcionar una base sólida para la toma de decisiones informadas."
            : "Actualmente, estamos en el proceso de desarrollar un plan de recopilación de datos para cuantificar el problema. Esperamos completar este plan pronto para avanzar en la cuantificación precisa del problema."}
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
          Rendimiento actual del proceso
        </Text>
        <Text>
          {proyecto.rendimientoProceso === "si"
            ? "Determinamos el rendimiento actual del proceso a través de la evaluación comparativa. Este enfoque sistémico nos permite entender cómo se compara nuestro rendimiento con el de otros, identificar oportunidades de mejora y asegurar que estamos utilizando las mejores prácticas para optimizar nuestros procesos."
            : "Actualmente estamos en el proceso de implementar la evaluación comparativa para determinar el rendimiento actual de nuestro proceso. Este proceso nos permitirá comprender cómo se compara nuestro rendimiento con el de otros, identificar oportunidades de mejora y asegurar que estamos utilizando las mejores prácticas para optimizar nuestros procesos."}
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
          Planteamiento del problema
        </Text>
        <Text>{proyecto.planteamientoProblema}</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text>Analizar (ver anexo 3)</Text>
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
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text>Mejorar (ver anexo 4)</Text>
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

        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Tolerancias operativas
        </Text>
        <Text>
          {proyecto.toleranciasOperativas === "si"
            ? "Las tolerancias operativas del sistema están bien definidas. Hemos establecido claramente los límites y parámetros dentro de los cuales el sistema debe operar de manera efectiva. Estas medidas nos permiten asegurar que el sistema opere de manera eficiente y segura, minimizando el riesgo de fallos y optimizando el rendimiento general."
            : "Actualmente estamos en el proceso de definir las tolerancias operativas del sistema. Esperamos completar este proceso pronto para asegurar que el sistema opere de manera eficiente y segura, minimizando el riesgo de fallos y optimizando el rendimiento general."}
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
          Experimentos de diseño
        </Text>
        <Text>
          {proyecto.experimentosDiseno === "si"
            ? "hemos realizado experimentos de diseño para evaluar y optimizar el sistema. Estos experimentos de diseño nos han permitido identificar las mejores configuraciones y ajustes para el sistema, asegurando que funcione de manera eficiente y eficaz."
            : "Actualmente estamos en el proceso de planificar y ejecutar experimentos de diseño para evaluar y optimizar el sistema. Esperamos completar estos experimentos pronto para identificar las mejores configuraciones y ajustes para el sistema, asegurando que funcione de manera eficiente y eficaz."}
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
          Posibles mejoras
        </Text>
        <Text>
          {proyecto.estudiosPiloto === "si"
            ? "Hemos validado las posibles mejoras a través de estudios piloto. Estos estudios piloto nos han permitido validar la efectividad de las mejoras antes de su implementación a gran escala, minimizando riesgos y asegurando resultados positivos."
            : "Actualmente estamos en el proceso de planificar y ejecutar estudios piloto para validar las posibles mejoras. Esperamos completar estos estudios piloto pronto para validar la efectividad de las mejoras antes de su implementación a gran escala, minimizando riesgos y asegurando resultados positivos."}
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
          Evaluaron y reevaluaron las posibles soluciones
        </Text>
        <Text>
          {proyecto.evaluacionSoluciones === "si"
            ? " hemos evaluado y reevaluado las posibles soluciones de manera exhaustiva. Este enfoque meticuloso de evaluación y reevaluación nos permitió identificar la solución más efectiva y viable para abordar el problema, asegurando que la implementación sea exitosa y genere los resultados esperados."
            : "Actualmente estamos en el proceso de evaluar y reevaluar las posibles soluciones. Esperamos completar este proceso pronto para identificar y poner en práctica la solución más efectiva y viable para abordar el problema."}
        </Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionpage2}>
        <Text>Controlar (ver anexo 5)</Text>
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
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Control estadístico de los procesos
        </Text>
        <Text>
          {proyecto.controlEstadistico === "si"
            ? "Hemos implementado el control estadístico de los procesos (SPC) para garantizar la calidad y consistencia de nuestras operaciones. La implementación del control estadístico de los procesos nos ha permitido mantener altos niveles de calidad y eficiencia, minimizando la variabilidad y asegurando la consistencia en nuestras operaciones."
            : "Actualmente estamos en el proceso de implementar el control estadístico de los procesos (SPC) para garantizar la calidad y consistencia de nuestras operaciones. Esperamos completar este proceso pronto para mantener altos niveles de calidad y eficiencia, minimizando la variabilidad y asegurando la consistencia en nuestras operaciones."}
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
          Plan de transferencia
        </Text>
        <Text>{proyecto.planTransferencia}</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            fontSize: 24,
            paddingBottom: 24,
            paddingTop: 24,
          }}
        >
          Costes y el crecimiento de las ganancias
        </Text>
        <Text>
          {proyecto.verificacionBeneficios === "si"
            ? "Hemos verificado los beneficios, ahorros, la evasión de costes y el crecimiento de las ganancias. Este proceso nos ha permitido confirmar que nuestras iniciativas han generado beneficios significativos, ahorros sustanciales, han evitado costes innecesarios y han contribuido al crecimiento de las ganancias de manera efectiva."
            : "Actualmente estamos en el proceso de verificar los beneficios, ahorros, la evasión de costes y el crecimiento de las ganancias. Esperamos completar este proceso pronto para confirmar que nuestras iniciativas han generado beneficios significativos, ahorros sustanciales, han evitado costes innecesarios y han contribuido al crecimiento de las ganancias de manera efectiva."}
        </Text>
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
