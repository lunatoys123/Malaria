import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";

export const getCaseByCaseId = async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const case_id = values.case_id;

	const response = await axios.get(`${URL}/Malaria/Case/getCaseByCaseId`, {
		params: { case_id },
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.data;
};

export const getTreatmentByCaseId = async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const case_id = values.case_id;

	const response = await axios.get(`${URL}/Malaria/Case/getTreatmentByCaseId`, {
		params: { case_id },
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.data;
};

export const getLaboratoryByCaseId = async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const case_id = values.case_id;

	const response = await axios.get(`${URL}/Malaria/Case/getLaboratoryByCaseId`, {
		params: { case_id },
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.data;
};

export const getPersonalInformationById = async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const Patient_id = values.Patient_id;

	const response = await axios.get(`${URL}/Malaria/Patient/getPatientById`, {
		params: { Patient_id },
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.data;
};

export const generatePDF = async id => {
	const jwt = await AsyncStorage.getItem("jwt");

	const response = await axios.get(`${URL}/Malaria/Case/view/case/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const data = response.data;
	console.log(data);

	const Patient = data.Patient;
	const Clinical_Complications = data.Clinical_Complications;
	const Hospitalization = data.Hospitalization;
	const Previous_Diagnosis_Malaria = data.Previous_Diagnosis_Malaria;
	const Symptoms = data.Symptoms;
	const Treatment = data.Treatment;
	const Laboratory = data.Laboratory;

	const container = "display: grid; grid-template-columns: 25% 25% 25% 25%;";
	const sectionItem =
		"grid-area: span 1 / span 4; background-color: #189BE5; border-style: solid; border-width: 1px; padding: 10px;";
	const columnHeader =
		"background-color: lightblue; border-style: solid; border-width: 1px; flex: 1; word-wrap: break-word; padding: 10px;";
	const columndata =
		"border-style: solid; border-width: 1px; text-align: center; padding: 10px; word-wrap: break-word;";
	const LongItem =
		"grid-area: span 1 / span 3; border-style: solid; border-width: 1px; word-wrap: break-word; padding: 10px;";
	const rowItem =
		"grid-area: span 1 / span 4; border-style: solid; border-width: 1px; word-wrap: break-word; background-color: #74A1F6; padding-left: 10px;";

	const html = `
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
			</head>
			<body>
				<header style="text-align: center; margin-bottom: 1em;"><strong>Malaria Report</strong></header>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Patient Information</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Name</div>
						<div style="${columndata}">${Patient.Name}</div>
						<div style="${columnHeader}">Gender</div>
						<div style="${columndata}">${Patient.Gender}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Email</div>
						<div style="${columndata}">${Patient.Email}</div>
						<div style="${columnHeader}">Phone</div>
						<div style="${columndata}">${Patient.Phone}</div>
					</div>
					${
						Patient.Gender === "Female"?
						`<div style="${container}" class="breakavoid">
						    <div style="${columnHeader}">Pregnant</div>
							<div style="${columndata}">${Patient.Pregnant ? "Yes" : "No"}</div>
							<div style="${columnHeader}">Pregnant Date</div>
							<div style="${columndata}">${Patient.PregnantDate.substring(0, 10)}</div>
						</div>`:``
					}
				</div>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Home Address</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Contact Person</div>
						<div style="${columndata}">${Patient.Home.Contact_Person}</div>
						<div style="${columnHeader}">Contact Person Telephone</div>
						<div style="${columndata}">${Patient.Home.Contact_Person_Tel}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Location</div>
						<div style="${columndata}">${Patient.Home.Location}</div>
						<div style="${columnHeader}">Home Telephone</div>
						<div style="${columndata}">${Patient.Home.Telphone}</div>
					</div>
				</div>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Work Address</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Contact Person</div>
						<div style="${columndata}">${Patient.Work.Contact_Person}</div>
						<div style="${columnHeader}">Contact Person Telephone</div>
						<div style="${columndata}">${Patient.Work.Contact_Person_Tel}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Location</div>
						<div style="${columndata}">${Patient.Work.Location}</div>
						<div style="${columnHeader}">Work Telephone</div>
						<div style="${columndata}">${Patient.Work.Telphone}</div>
					</div>
				</div>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Clinical Complication</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Complications</div>
						<div style="${LongItem}">${Clinical_Complications.Complications.join(" , ")}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Description</div>
						<div style="${LongItem}">${Clinical_Complications.Description}</div>
					</div>
				</div>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Symtoms</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Sign</div>
						<div style="${LongItem}">${Symptoms.Sign.join(" , ")}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Symptomatic</div>
						<div style="${columndata}">${Symptoms.Symptomatic}</div>
						<div style="${columnHeader}">Onset Date</div>
						<div style="${columndata}">${Symptoms.Onset_date.substring(0, 10)}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Remark</div>
						<div style="${LongItem}">${Symptoms.Remark}</div>
					</div>
				</div>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Hospitalization</div>
					</div>
					${Hospitalization.map((d, index) => {
						return `
									<div style="${container}" class="breakavoid">
										<div style="${rowItem}">Hospitalzation Record ${index + 1}</div>
									</div>
									<div style="${container}" class="breakavoid">
										<div style="${columnHeader}">Admit Date</div>
										<div style="${columndata}">${d.Admit_Date.substring(0, 10)}</div>
										<div style="${columnHeader}">Work Telephone</div>
										<div style="${columndata}">${d.DisCharge_Date.substring(0, 10)}</div>
									</div>
									<div style="${container}" class="breakavoid">
										<div style="${columnHeader}">City</div>
										<div style="${columndata}">${d.City}</div>
										<div style="${columnHeader}">Address</div>
										<div style="${columndata}">${d.Street_Address}</div>
									</div>
									<div style="${container}" class="breakavoid">
										<div style="${columnHeader}">Zip Code</div>
										<div style="${columndata}">${d.Zip_Code}</div>
										<div style="${columnHeader}">Hospital</div>
										<div style="${columndata}">${d.Hospital}</div>
									</div>
									<div style="${container}" class="breakavoid">
										<div style="${columnHeader}">Discharge Diagnosis</div>
										<div style="${LongItem}">${d.Discharge_Diagnosis}</div>
									</div>
								`;
					}).join("")}
				</div>
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
				    <div style="${container}" class="breakavoid">
					    <div style="${sectionItem}">Previous Diagnosis Malaria</div>
					</div>
					<div style="${container}" class="breakavoid">
						${
							Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous === "No"
								? `<div style="${columnHeader}">Malaria Diagnosed Previously</div>
							<div style="${LongItem}">${Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous}</div>`
								: `<div style="${columnHeader}">Malaria Diagnosed Previously</div>
							<div style="${columndata}">${Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous}</div>
							<div style="${columnHeader}">Previous illness Date</div>
							<div style="${columndata}">${Previous_Diagnosis_Malaria.Previous_illness_date.substring(
										0,
										10
								  )}</div>
							<div style="${columnHeader}">Previous Diagnosis</div>
							<div style="${LongItem}">${Previous_Diagnosis_Malaria.Previously_Diagnosis}</div>`
						}
					</div>
				</div>
				${
					typeof Treatment !== "undefined"
						? `<div style="width: 90%; justify-content: center; align-items: center; margin: auto;">
						<div style="${container}" class="breakavoid">
							<div style="${sectionItem}">Treatment</div>
						</div>
						<div style="${container}" class="breakavoid">
							<div style="${columnHeader}">Drug taken</div>
							<div style="${columndata}">${
								Treatment.Drug_taken === "Other" ? Treatment.Drug_taken_Other : Treatment.Drug_taken
						  }</div>
							<div style="${columnHeader}">Therapy</div>
							<div style="${columndata}">${
								Treatment.Therapy === "Other" ? Treatment.Therapy_Other : Treatment.Therapy
						  }</div>
						</div>
						<div style="${container}" class="breakavoid">
							${
								Treatment.pills_taken === "Yes, missed no dose"
									? `
										<div style="${columnHeader}">pills taken as prescribed</div>
										<div style="${LongItem}">${Treatment.pills_taken}</div>
									`
									: `
										<div style="${columnHeader}">pills taken as prescribed</div>
										<div style="${columndata}">${Treatment.pills_taken}</div>
										<div style="${columnHeader}">Missed dose reason</div>
										<div style="${columndata}">${Treatment.missed_dose_reason}</div>
									`
							}
						</div>
						<div style="${container}" class="breakavoid">
							<div style="${columnHeader}">Side Effect</div>
							<div style="${LongItem}">${Treatment.Side_Effect}</div>
						</div>
					</div>`
						: ``
				}
				${
					typeof Laboratory !== "undefined"
						? `
						<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
							<div style="${container}" class="breakavoid">
								<div style="${sectionItem}">Laboratory</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${rowItem}">Blood Smear</div>
								<div style="${columnHeader}">Collection Date</div>
								<div style="${columndata}">${Laboratory.Blood_Smear.Collection_Date.substring(0, 10)}</div>
								<div style="${columnHeader}">Status</div>
								<div style="${columndata}">${Laboratory.Blood_Smear.status}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Laboratory Name</div>
								<div style="${columndata}">${Laboratory.Blood_Smear.Laboratory_name}</div>
								<div style="${columnHeader}">Phone Number</div>
								<div style="${columndata}">${Laboratory.Blood_Smear.Phone_Number}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Description</div>
								<div style="${LongItem}">${Laboratory.Blood_Smear.Description}</div>

							</div>
							<div style="${container}" class="breakavoid">
								<div style="${sectionItem}">PCR_Of_Blood</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${rowItem}">Blood Smear</div>
								<div style="${columnHeader}">Collection Date</div>
								<div style="${columndata}">${Laboratory.PCR_of_Blood.Collection_Date.substring(0, 10)}</div>
								<div style="${columnHeader}">Status</div>
								<div style="${columndata}">${Laboratory.PCR_of_Blood.status}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Laboratory Name</div>
								<div style="${columndata}">${Laboratory.PCR_of_Blood.Laboratory_name}</div>
								<div style="${columnHeader}">Phone Number</div>
								<div style="${columndata}">${Laboratory.PCR_of_Blood.Phone_Number}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Description</div>
								<div style="${LongItem}">${Laboratory.PCR_of_Blood.Description}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${sectionItem}">RDT</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${rowItem}">Blood Smear</div>
								<div style="${columnHeader}">Collection Date</div>
								<div style="${columndata}">${Laboratory.RDT.Collection_Date.substring(0, 10)}</div>
								<div style="${columnHeader}">Status</div>
								<div style="${columndata}">${Laboratory.RDT.status}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Laboratory Name</div>
								<div style="${columndata}">${Laboratory.RDT.Laboratory_name}</div>
								<div style="${columnHeader}">Phone Number</div>
								<div style="${columndata}">${Laboratory.RDT.Phone_Number}</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Type</div>
								<div style="${LongItem}">${
								Laboratory.RDT.Type === "Other" ? Laboratory.RDT.Type_Other : Laboratory.RDT.Type
						  }</div>
							</div>
							<div style="${container}" class="breakavoid">
								<div style="${columnHeader}">Description</div>
								<div style="${LongItem}">${Laboratory.RDT.Description}</div>
							</div>
						</div>
					`
						: ``
				}
				<div style="width: 90%; justify-content: center; align-items: center; margin: auto;" class="breakavoid">
					<div style="${container}" class="breakavoid">
						<div style="${sectionItem}">Person In charge</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Doctor</div>
						<div style="${columndata}">${data.Doctor}</div>
						<div style="${columnHeader}">Status Date</div>
						<div style="${columndata}">${data.Status_date.substring(0, 10)}</div>
					</div>
					<div style="${container}" class="breakavoid">
						<div style="${columnHeader}">Patient Status</div>
						<div style="${columndata}">${data.Patient_Status}</div>
						<div style="${columnHeader}">Report Status</div>
						<div style="${columndata}">${data.Report_Status}</div>
					</div>
				</div>
			</body>
			<style>
				@page print {
					.pagebreak { break-before: page; }
					.breakavoid { break-inside: avoid; }
				}
				@media print {
					.pagebreak { break-before: page; }
					.breakavoid { break-inside: avoid; }
				}
				@page print {
					.pagebreak { page-break-before: always; }
					.breakavoid { break-inside: avoid; }
				}
				@media print {
					.pagebreak { break-before: always; }
					.breakavoid { break-inside: avoid; }
				}
			</style>
		</html>
		`;
	await Print.printAsync({
		html: html,
		printerUrl: "",
	});
};
