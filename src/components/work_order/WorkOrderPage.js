import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Page,
  Font,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { getClientById } from "../../services/getClientById.js";
import { getEmployeeById } from "../../services/getEmployeeById.js";
import { getWorkOrderById } from "../../services/getWorkOrderById.js";

const method_payment = [ "Efectivo", "Cheque" ];

// Register font
Font.register({ family: 'Rubik', fonts: [
  { src: "fonts/Rubik/Rubik-Light.ttf" }, // font-style: normal, font-weight: normal
  { src: "fonts/Rubik/Rubik-BlackItalic.ttf", fontStyle: 'italic' },
  { src: "fonts/Rubik/Rubik-Medium.ttf", fontWeight: 'medium' },
  { src: "fonts/Rubik/Rubik-Bold.ttf", fontWeight: 'bold' },
 ]});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Rubik",
    paddingVertical: 25,
    paddingRight: 50,
    paddingLeft: 55,
  },
  logo: {
    width: 180,
  },
  idOrder: {
    fontSize: 20,
  },
  groupOrder: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 12,
  },
  textNormal: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textBig: {
    fontSize: 18,
  },
  textWeightBold: {
    fontFamily: "Rubik",
    fontWeight: "bold"
  },
  textWeightMedium: {
    fontFamily: "Rubik",
    fontWeight: 'medium'
  },
  sectionRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  sectionColumn: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  sectionGroup: {
    display: "flex",
    flexDirection: "row",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
  textJustify: {
    textAlign: "justify",
  },
  text_underline: {
    textDecoration: "underline",
  },
  solid_divider: {
    height: 1,
    marginTop: 5,
    borderBottom: "1px solid black",
  },
  dotted_divider: {
    height: 1,
    marginTop: 5,
    borderBottom: "1px dotted black",
  },
  border_dotted: {
    border: "1px dotted black",
  },
  wd_25: {
    width: "25%",
  },
  wd_50: {
    width: "50%",
  },
  wd_75: {
    width: "75%",
  },
  wd_100: {
    width: "100%",
  },
  wd_auto: {
    width: "auto",
  },
  p_5:{
    padding: 5
  },
  m_5: {
    margin: 5,
  },
  mt_2: {
    marginTop: 2,
  },
  mt_5: {
    marginTop: 5,
  },
  mt_10: {
    marginTop: 10,
  },
  mt_20: {
    marginTop: 20,
  },
  mt_30: {
    marginTop: 30,
  },
  mt_40: {
    marginTop: 40,
  },
  mt_50: {
    marginTop: 50,
  },
  ml_5: {
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
  },
  alignRight: {
    display: "flex",
    alignSelf: "flex-end",
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginVertical: 5,
  },
  tableRow: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  tableCell: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
  },
  qrCode: {
    width: "50",
    display: "flex",
  },
});

export const WorkOrderPage = () => {
  const [workOrder, setWorkOrder] = useState();
  const [client, setClient] = useState();
  const [employee, setEmployee] = useState();
  const { id_work_order } = useParams();

  const createQR = () => {
    const codeService = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=N-${workOrder?.id_work_order} G-${workOrder?.group_order}`;
    return codeService;
  };

  const formatDate = (date) => {
    if (date?.length > 0) {
      const currentDate = date?.split("T")[0];
      const [year, month, day] = currentDate?.split("-");
      const newDate = `${day}/${month}/${year}`;
      return newDate;
    }
    return "";
  };

  const getWorkOrder = (id_work_order) => {
    getWorkOrderById(id_work_order)
      .then((res) => {
        setWorkOrder(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClient = (id_client) => {
    getClientById(id_client)
      .then((res) => {
        setClient(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEmployee = (id_employee) => {
    getEmployeeById(id_employee)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWorkOrder(id_work_order);
    getClient(workOrder?.id_client);
    getEmployee(workOrder?.id_employee);
  }, [id_work_order, workOrder?.id_client, workOrder?.id_employee]);

  const MyDoc = () => (
    <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionGroup}>
            <View style={styles.sectionColumn}>
              <Image src={"https://drive.google.com/file/d/1uhQsdi-RYxP8Ec-xUImM5Ozk4DnfAnVl/view?usp=sharing"} style={styles.logo} />
              <Text style={[styles.textLeft, styles.mt_5, styles.textSmall]}>
                Direccion: 4 calle poniente, casa #40
              </Text>
              <Text style={[styles.textLeft, styles.textSmall]}>
                Apopa, San Salvador.
              </Text>
              <Text style={[styles.textLeft, styles.textSmall]}>
                Tel. 2216-2013, Cel. 7700-8976.
              </Text>
            </View>
            <View style={[styles.sectionColumn, styles.mt_10]}>
              <Text style={[styles.textRight, styles.idOrder, styles.textWeightBold]}>
                #{workOrder?.id_work_order}
              </Text>
              <Text style={[styles.textRight, styles.groupOrder]}>
                Grupo #{workOrder?.group_order}
              </Text>
              <div
                style={[styles.alignRight, styles.solid_divider, styles.wd_50]}
              ></div>
              <Image
                style={[styles.qrCode, styles.alignRight, styles.mt_5]}
                src={createQR()}
              />
            </View>
          </View>
          <View style={[styles.sectionGroup, styles.mt_2]}>
            <View style={styles.sectionRow}>
              <div style={[styles.solid_divider, styles.wd_100]}></div>
            </View>
          </View>
          <View style={styles.sectionGroup}>
            <View style={styles.sectionRow}>
              <Text style={[styles.title, styles.textLeft, styles.mt_5, styles.textWeightMedium]}>
                {`Detalle de Orden.`}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow]}>
              <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`Servicio: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${workOrder?.service_name}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
              
            <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`Descripcion: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${workOrder?.description_service}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`Observaciones: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${workOrder?.observation_service}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`Cliente: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${client?.name} ${client?.lastname}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`DUI: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${client?.DUI}.`}
              </Text>
              </View>
              <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`NIT: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${client?.NIT}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`Empleado: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${employee?.name} ${employee?.lastname}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.textNormal, styles.textWeightMedium]}>
                {`Tipo de Pago: `}
              </Text>
              <Text style={[styles.textNormal]}>
                {`${method_payment[workOrder?.id_method_payment]}.`}
              </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
              <div style={[styles.solid_divider, styles.wd_100]}></div>
            </View>
            <View style={[styles.tableRow, styles.mt_2]}>
              <Text style={[styles.tableCell, styles.title, styles.textWeightMedium]}>
                Detalle del pago.
              </Text>
            </View>
            <View style={[styles.tableRow, styles.mt_5, styles.textWeightMedium]}>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textMedium]}
              >
                Precio
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textMedium]}
              >
                Adelanto
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textMedium]}
              >
                Restante
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                ${workOrder?.total_payment}
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                ${workOrder?.advance_payment}
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                ${workOrder?.remaining_payment}
              </Text>
            </View>
          </View>
          <View style={[styles.sectionGroup, styles.mt_5]}>
            <View style={styles.sectionRow}>
              <div style={[styles.solid_divider, styles.wd_100]}></div>
            </View>
          </View>
          <View style={[styles.table, styles.mt_20]}>
            <View style={styles.tableRow}>
              <Text
                style={[
                  styles.tableCell,
                  styles.textCenter,
                  styles.text_underline,
                  styles.textNormal,
                ]}
              >
                {formatDate(workOrder?.createdAt)}
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                {"_________"}
              </Text>
            </View>
            <View style={[styles.tableRow, styles.mt_5, styles.textWeightMedium]}>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                {"Fecha de registro."}
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                {"Fecha de entrega."}
              </Text>
            </View>
          </View>
          <View style={[styles.sectionGroup, styles.mt_5]}>
            <View style={styles.sectionRow}>
              <div style={[styles.solid_divider, styles.wd_100]}></div>
            </View>
          </View>
          <View style={[styles.sectionGroup, styles.mt_5]}>
            <Text style={[styles.textJustify, styles.textSmall]}>
              {`Nota: El presente documento, tiene como finalidad el respaldo, registro y solicitud de un trabajo o servicio, por parte de un cliente, detallando en este documento las especificaciones del servicio o trabajo solicitado a realizar.`}
            </Text>
          </View>
          <View style={[styles.table, styles.mt_50]}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.textCenter]}>
                {"____________"}
              </Text>
              <Text style={[styles.tableCell, styles.textCenter]}>
                {"____________"}
              </Text>
            </View>
            <View style={[styles.tableRow, styles.mt_5, styles.textWeightMedium]}>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                {"Entrego"}
              </Text>
              <Text
                style={[styles.tableCell, styles.textCenter, styles.textNormal]}
              >
                {"Recibio"}
              </Text>
            </View>
          </View>
          <View style={[styles.sectionGroup, styles.mt_10]}>
            <View style={styles.sectionRow}>
              <div style={[styles.dotted_divider, styles.wd_100]}></div>
            </View>
          </View>
          <View style={[styles.sectionGroup, styles.mt_2]}>
            <View style={[styles.sectionRow, styles.m_5, styles.p_5, styles.border_dotted]}>
              <Image style={[styles.qrCode]} src={createQR()} />
              <View style={[styles.sectionColumn, styles.ml_5]}>
                <Text style={[styles.textMedium]}>{`Servicio: ${workOrder?.service_name}`}</Text>
                <Text style={[styles.textSmall]}>{`Cliente: ${client?.name} ${client?.lastname}`}</Text>
                <Text style={[styles.textSmall]}>{`Empleado: ${employee?.name} ${employee?.lastname}`}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.sectionGroup]}>
            <View style={[styles.sectionRow, styles.m_5, styles.p_5, styles.border_dotted]}>
              <Image style={[styles.qrCode]} src={createQR()} />
              <View style={[styles.sectionColumn, styles.ml_5]}>
                <Text style={[styles.textMedium]}>{`Servicio: ${workOrder?.service_name}`}</Text>
                <Text style={[styles.textSmall]}>{`Cliente: ${client?.name} ${client?.lastname}`}</Text>
                <Text style={[styles.textSmall]}>{`Empleado: ${employee?.name} ${employee?.lastname}`}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
  )

  return (
    <PDFDownloadLink document={<MyDoc/>} fileName={`Orden de Trabajo #${workOrder?.id_work_order} .pdf`}>
    {({ blob, url, loading, error }) =>
      loading ? `Generando documento...` : `Descargar Orden de Trabajo #${workOrder?.id_work_order}!`
    }
  </PDFDownloadLink>
  );
};
