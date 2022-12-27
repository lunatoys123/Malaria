import React, { useContext, useCallback, useState } from "react";
import {
  ScrollView,
  Center,
  Radio,
  Button,
  View,
  VStack,
  Text,
} from "native-base";
import Card_Component from "../../sharedComponent/Card_Component";
import FormSigleSelect from "../../sharedComponent/Form/FormSigleSelect";
import FormRadioGroup from "../../sharedComponent/Form/FormRadioGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TherapyOptions,
  status_Option,
  Drug_Taken_Options,
  pills_taken_Options,
  missed_doses_Reason,
} from "../../Common/Options";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Report } from "../../Redux/Report/Selector";
import { ReportAction } from "../../Redux/Report/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS } from "../../Common/status_code";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { useFocusEffect } from "@react-navigation/native";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Operation_Mode } from "../../Common/status_code";

const Treatment = (props) => {
  const case_id = props.route.params.case_id;
  const mode = props.route.params.mode;
  const initialState = props.route.params.initialState;
  const dispatch = useDispatch();
  const ReportState = useSelector(Report());
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const { loading, Message, status } = ReportState;
      if (loading === LOADING_STATUS.FULFILLED && submit) {
        setVisible(true);
        setMessage(Message);
        setSubmit(false);
      }
    }, [ReportState, submit])
  );

  const initialValues = () => {
    if (mode === Operation_Mode.create) {
      return {
        Therapy: "",
        Received: "",
        Chemoprophylaxis_taken: "",
        Drug_taken: "",
        Drug_taken_Other: "",
        pills_taken: "",
        pills_taken_Other: "",
        missed_dose_reason: "",
        Side_Effect: "",
      };
    } else if (mode === Operation_Mode.edit) {
      return {
        Therapy: { id: initialState.Therapy, item: initialState.Therapy },
        Received: initialState.Received,
        Chemoprophylaxis_taken: initialState.Chemoprophylaxis_taken,
        Drug_taken: {
          id: initialState.Drug_taken,
          item: initialState.Drug_taken,
        },
        Drug_taken_Other: initialState.Drug_taken_Other,
        pills_taken: {
          id: initialState.pills_taken,
          item: initialState.pills_taken,
        },
        pills_taken_Other: initialState.pills_taken_Other,
        missed_dose_reason: {
          id: initialState.missed_dose_reason,
          item: initialState.missed_dose_reason,
        },
        Side_Effect: initialState.Side_Effect,
      };
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object().shape({
      Therapy: Yup.object().required("Therapy is required"),
      Received: Yup.string().required(
        "Please specify on whether user retrieved the treatment"
      ),
      Chemoprophylaxis_taken: Yup.string().required(
        "Please specify on whether user taken the malaria chmoprophylaxis"
      ),
      Drug_taken: Yup.object().required("Drug taken is required"),
      Drug_taken_Other: Yup.string().when("Drug_taken", {
        is: () => {
          return (
            !_.isEmpty(formik.values, "Drug_taken") &&
            _.get(formik.values, "Drug_taken").id === "Other"
          );
        },
        then: Yup.string().required(
          "This is needed when Drug Taken is 'other'"
        ),
      }),
      pills_taken: Yup.object().required("Pills taken is required"),
      pills_taken_Other: Yup.string().when("pills_taken", {
        is: () => {
          return (
            !_.isEmpty(formik.values, "pills_taken") &&
            _.get(formik.values, "pills_taken").id === "Other"
          );
        },
        then: Yup.string().required(
          "This is needed when pills taken is 'other'"
        ),
      }),
      missed_dose_reason: Yup.object().when("pills_taken", {
        is: () => {
          return (
            _.get(formik.values, "pills_taken").id !== "Yes, missed no dose"
          );
        },
        then: Yup.object().required("Missed dose reason is needed"),
      }),
      Side_Effect: Yup.string().when("missed_dose_reason", {
        is: () => {
          return (
            !_.isEmpty(formik.values, "missed_dose_reason") &&
            _.get(formik.values, "missed_dose_reason").id ===
              "Had a side effect"
          );
        },
        then: Yup.string().required("Please specify on the side effect"),
      }),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setSubmit(true);
      const Treatment_copy = _.cloneDeep(values);
      Treatment_copy.case_id = case_id;
      Treatment_copy.Drug_taken = Treatment_copy.Drug_taken.id;
      Treatment_copy.Therapy = Treatment_copy.Therapy.id;
      Treatment_copy.missed_dose_reason =
        Treatment_copy.missed_dose_reason === ""
          ? ""
          : Treatment_copy.missed_dose_reason.id;
      Treatment_copy.pills_taken = Treatment_copy.pills_taken.id;

      if (mode === Operation_Mode.create) {
        dispatch(ReportAction.AddTreatment(Treatment_copy));
      } else if (mode === Operation_Mode.edit) {
        const id = initialState._id;
        dispatch(
          ReportAction.EditTreatment({
            id: id,
            Treatment: Treatment_copy,
          })
        );
      }
    },
  });

  const onChange = (targetField) => {
    return (val) => {
      formik.setFieldValue(targetField, val);
    };
  };

  const SubmitWithAlert = async (values) => {
    //console.log("SubmitWithAlert", values);
    const validation = await formik.validateForm(values);
    if (!_.isEmpty(validation)) {
      console.log(validation);
    } else {
      formik.handleSubmit();
    }
  };

  const ReturnToReportPage = () => {
    setVisible(false);
    props.navigation.navigate("Main");
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 60 }}
      width="100%"
    >
      <Center>
        <Card_Component heading={"Management"}>
          <FormSigleSelect
            formik={formik}
            Label="Therapy for this attack"
            options={TherapyOptions}
            hideInputFilter={true}
            placeholder="Threapy"
            id="Therapy"
            onChange={onChange}
          />
          <FormRadioGroup formik={formik} Label="Received" id="Received">
            {status_Option.map((d) => (
              <Radio value={d.Value} size="sm" key={d.Value}>
                {d.Label}
              </Radio>
            ))}
          </FormRadioGroup>
        </Card_Component>
        <Card_Component heading={"Malaria Chemoprophylaxis"}>
          <FormRadioGroup
            formik={formik}
            Label="Was malaria chmoprophylaxis taken?"
            id="Chemoprophylaxis_taken"
          >
            {status_Option.map((d) => (
              <Radio value={d.Value} size="sm" key={d.Value}>
                {d.Label}
              </Radio>
            ))}
          </FormRadioGroup>
          <FormSigleSelect
            formik={formik}
            Label="Drugs Taken"
            options={Drug_Taken_Options}
            hideInputFilter={true}
            placeholder="Drugs Taken"
            onChange={onChange}
            id="Drug_taken"
          />
          {_.get(formik.values, "Drug_taken").id == "Other" && (
            <FormInputField
              formik={formik}
              Label="Specify (Drug Taken)"
              id="Drug_taken_Other"
            />
          )}
          <FormSigleSelect
            formik={formik}
            Label="Were all pills taken as prescribed?"
            options={pills_taken_Options}
            hideInputFilter={true}
            onChange={onChange}
            id="pills_taken"
          />
          {_.get(formik.values, "pills_taken") &&
            _.get(formik.values, "pills_taken").id === "Other" && (
              <FormInputField
                formik={formik}
                id="pills_taken_Other"
                Label="Specify (pills taken)"
              />
            )}
          {_.get(formik.values, "pills_taken") &&
            _.get(formik.values, "pills_taken").id !==
              "Yes, missed no dose" && (
              <FormSigleSelect
                formik={formik}
                Label="what is the reason for the missed doses?"
                options={missed_doses_Reason}
                hideInputFilter={true}
                onChange={onChange}
                id="missed_dose_reason"
              />
            )}

          {_.get(formik.values, "missed_dose_reason").id ==
            "Had a side effect" && (
            <FormInputField
              Label="side Effect (Please specify)"
              formik={formik}
              id="Side_Effect"
              isRequired={true}
            />
          )}
        </Card_Component>

        <Button
          w="90%"
          alignSelf="center"
          mt="3"
          onPress={() => SubmitWithAlert(formik.values)}
        >
          {mode === Operation_Mode.create
            ? "Submit Treatment"
            : mode === Operation_Mode.edit
            ? "Update Treatment"
            : null}
        </Button>
        <FancyAlert
          visible={visible}
          icon={
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                borderRadius: 50,
                width: "100%",
              }}
            >
              <AntIcon name="checkcircle" size={30} color="white" />
            </View>
          }
          style={{ backgroundColor: "white" }}
        >
          <VStack>
            <Text>{message}</Text>
            <Button onPress={() => ReturnToReportPage(false)} my={3}>
              OK
            </Button>
          </VStack>
        </FancyAlert>
      </Center>
    </ScrollView>
  );
};

export default Treatment;
