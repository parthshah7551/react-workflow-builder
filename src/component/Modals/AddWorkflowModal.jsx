import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const AddWorkflowModal = (props) => {
  const validationSchema = Yup.object().shape({
    flowName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Invalid company Name format")
      .required("Workflow name is required"),
  });
  const initialValues = { flowName: "" };
  const handleSubmit = (values, { setSubmitting }) => {
    try {
      console.log("calling======<<<<<<<<<<");
      console.log(values);
      setSubmitting(false);
      Swal.fire({
        title: "Saved successfully!",
        text: "Workflow has been saved",
        icon: "success",
      });
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
};

export default AddWorkflowModal;
