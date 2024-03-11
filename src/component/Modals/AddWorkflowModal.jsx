import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useFlow } from "../../contextAPI";

const AddWorkflowModal = (props) => {
  const { nodes, edges, newTableData } = useFlow();
  const [workflowExistingData, setWorkflowExistingData] = useState([]);

  useEffect(() => {
    const workFlowData = localStorage.getItem("workFlowData");
    if (workFlowData) {
      setWorkflowExistingData(JSON.parse(workFlowData));
    }
  }, []);
  const validationSchema = Yup.object().shape({
    flowName: Yup.string()
      .matches(/^[A-Za-z0-9\s]+$/, "Invalid Flow Name")
      .required("Workflow name is required"),
  });
  const initialValues = { flowName: props.workFlowDataName || "" };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const workFlowData = {
        ...workflowExistingData,
        [values.flowName.toLowerCase()]: { nodes, edges, newTableData },
      };
      localStorage.setItem("workFlowData", JSON.stringify(workFlowData));
      localStorage.setItem(
        "workFlowDataName",
        JSON.stringify(values.flowName.toLowerCase())
      );
      setSubmitting(false);
      await Swal.fire({
        title: "Saved successfully!",
        text: "Workflow has been saved",
        icon: "success",
      });
      props.onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save the workflow
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="flowName">Enter Workflow Name</label>
                <Field
                  type="text"
                  id="flowName"
                  name="flowName"
                  className={`form-control ${
                    touched.flowName && errors.flowName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="flowName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

AddWorkflowModal.propTypes = {
  onHide: PropTypes.func,
  workFlowDataName: PropTypes.string,
};

export default AddWorkflowModal;
