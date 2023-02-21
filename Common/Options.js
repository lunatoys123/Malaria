import { Admin_Role, Normal_User_Role } from "./role";
import { GetAllHospital } from "./Admin_Function";
// Radio Group Option

export const report_status = [
	{
		Label: "Preliminary",
		Value: "Preliminary",
	},
	{
		Label: "Final",
		Value: "Final",
	},
];

export const Gender_option = [
	{
		Label: "Male",
		Value: "Male",
	},
	{
		Label: "Female",
		Value: "Female",
	},
];

export const status_Option = [
	{
		Label: "Yes",
		Value: "Yes",
	},
	{
		Label: "No",
		Value: "No",
	},
	{
		Label: "Unknown",
		Value: "Unknown",
	},
];

export const Laboratory_result_Option = [
	{
		Label: "Positive",
		value: "Positive",
	},
	{
		Label: "Negative",
		value: "Negative",
	},
	{
		Label: "Not done",
		value: "Not done",
	},
	{
		Label: "Unknown",
		value: "Unknown",
	},
];

export const RDT_Type_Option = [
	{
		Label: "BinaxNow",
		value: "BinaxNow",
	},
	{
		Label: "Other",
		value: "Other",
	},
];

//Single and multiple select options
export const Signs = [
	{
		id: "Fever",
		item: "Fever",
	},
	{
		id: "Headache",
		item: "Headache",
	},
	{
		id: "Abdominal pain",
		item: "Abdominal pain",
	},
	{
		id: "Chills",
		item: "Chills",
	},
	{
		id: "Sweats",
		item: "Sweats",
	},
	{
		id: "Myalgia",
		item: "Myalgia",
	},
];

export const Clinical_Complications = [
	{
		id: "Cerebral malria",
		item: "Cerebral malria",
	},
	{
		id: "Spleen ruture",
		item: "Spleen ruture",
	},
	{
		id: "ARDS pulmonary edma",
		item: "ARDS pulmonary edma",
	},
	{
		id: "Anemia",
		item: "Anemia",
	},
];

export const Diagnosis = [
	{
		id: "P. falciparum",
		item: "P. falciparum",
	},
	{
		id: "P. malariae",
		item: "P. malariae",
	},
	{
		id: "Not Determined",
		item: "Not Determined",
	},
	{
		id: "P. vivax",
		item: "P. vivax",
	},
	{
		id: "P. ovale",
		item: "P. ovale",
	},
	{
		id: "Unknown",
		item: "Unknown",
	},
];

export const TherapyOptions = [
	{
		id: "Chlorquine",
		item: "Chloroquine",
	},
	{
		id: "Primaquine",
		item: "Primaquine",
	},
	{
		id: "Pyrimethamine-sulfadoxine",
		item: "Pyrimethamine-sulfadoxine",
	},
	{
		id: "Mefloquine",
		item: "Mefloquine",
	},
	{
		id: "Atovaquone-proguanil",
		item: "Atovaquone-proguanil",
	},
	{
		id: "Exchange transfusion",
		item: "Exchange transfusion",
	},
	{
		id: "Tetracycline/doxycycline",
		item: "Tetracycline/doxycycline",
	},
	{
		id: "Quinine/quindine",
		item: "Quinine/quindine",
	},
	{
		id: "Other",
		item: "Other",
	},
];

export const Drug_Taken_Options = [
	{
		id: "Chloroquine",
		item: "Chloroquine",
	},
	{
		id: "Doxycycline",
		item: "Doxycycline",
	},
	{
		id: "Atovaquone-proguanil",
		item: "Atovaquone-proguanil",
	},
	{
		id: "Mefloroquine",
		item: "Mefloroquine",
	},
	{
		id: "Primqauine",
		item: "Primqauine",
	},
	{
		id: "Other",
		item: "Other",
	},
];

export const pills_taken_Options = [
	{
		id: "Yes, missed no dose",
		item: "Yes, missed no dose",
	},
	{
		id: "No, missed one to few does",
		item: "No, missed one to few does",
	},
	{
		id: "No, missed more than a few, but less than half of the doses",
		item: "No, missed more than a few, but less than half of the doses",
	},
	{
		id: "No, missed half or more of the doses",
		item: "No, missed half or more of the doses",
	},
	{
		id: "Other",
		item: "Other",
	},
];

export const missed_doses_Reason = [
	{
		id: "Forget",
		item: "Forget",
	},
	{
		id: "Didn't think needed",
		item: "Didn't think needed",
	},
	{
		id: "Had a side effect",
		item: "Had a side effect",
	},
	{
		id: "Was advised by others to stop",
		item: "Was advised by others to stop",
	},
	{
		id: "Prematurely stopped taking once home",
		item: "Prematurely stopped taking once home",
	},
];

export const Laboratory_Positive = [
	{
		id: "P. falciparum",
		item: "P. falciparum",
	},
	{
		id: "P. vivax",
		item: "P. vivax",
	},
	{
		id: "P. malariae",
		item: "P. malariae",
	},
	{
		id: "P. ovale",
		item: "P. ovale",
	},
	{
		id: "Not determined",
		item: "Not determined",
	},
	{
		id: "Unknown",
		item: "Unknown",
	},
];

export const RDT_Options = [
	{
		id: "P. falciparum",
		item: "P. falciparum",
	},
	{
		id: "P .vivax, malariae, or ovale",
		item: "P.vivax, malariae, or ovale",
	},
	{
		id: "Mixed infection (P. falciparum and P. vivax, malariae, or ovale)",
		item: "Mixed infection (P. falciparum and P. vivax, malariae, or ovale)",
	},
];

export const Role_Options = [
	{
		id: Admin_Role,
		item: "Admin",
	},
	{
		id: Normal_User_Role,
		item: "Normal User",
	},
];

export const Patient_Status = [
	{
		id: "survived",
		item: "survived",
	},
	{
		id: "Stable",
		item: "Stable",
	},
	{
		id: "Emergency",
		item: "Emergency",
	},
	{
		id: "Died",
		item: "Died",
	},
	{
		id: "Unknown",
		item: "Unknown",
	},
];
