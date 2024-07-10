import React, { useState } from 'react'
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import { useLocation, useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dummyProfile from "../assets/images/dummyProfile.png"
import  Axios  from 'axios';

function EditFee({ items, isOpen, setIsOpen}) {

     const navigate = useNavigate();

     const location = useLocation();
     console.log("location in edit ",location.state.items)

     const [feeData, setFeeData ] = useState(location.state.items || {});
          console.log("feeData is ",feeData);

      const [errors, setErrors] = useState({});
      
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFeeData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
      };

      const validateForm = () => {
          let formErrors =  {};

          const { studentName, fatherName, classname, quaterlyFee, feeStatus, section, description } = feeData;
         
          if (!studentName) formErrors.studentName = "Full name is required";

          if (!fatherName) formErrors.fatherName = "Full name is required";
      
          if (!classname) formErrors.classname = "Class is required";
      
          if (!quaterlyFee) formErrors.quaterlyFee = "QuaterlyFee is required";
      
          if (!feeStatus) formErrors.feeStatus = "Fee status is required";
      
          if (!section) formErrors.section = "Section is required";
      
          if (!description) formErrors.description = "Description is required";
      
         return formErrors;
      };

      const handleSubmit = (e) => {
          e.preventDefault();

          const formErrors = validateForm();
          setErrors(formErrors);
          console.log("fee data on submit",feeData);

          if  (Object.keys(formErrors).length === 0) {
               const id = feeData._id;

               Axios.put(`http://localhost:8080/fee/editfees/${id}`,
                    feeData
               )
               .then((response) => {
                    if (response.data.status) {
                         toast.success("Successfully added new data")
                         setTimeout(()=>{
                           navigate('/fee', { state: { items } });
                         },1000)   
                       }
               })
               .catch((err) => {
                    console.log(err);
                  });
          }
      }
       

  return (
    <>
    <ToastContainer/>
     <Sidebar isOpen={isOpen} />
      <div className={`main-container ${isOpen && "main-content_large"}`}>
        <HeaderDash isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="content">
          <div className="row mb-3">
            <div className="col-xxl-12">
              <div className="form-body">
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="greetingsText mb-3">
                      <div className="greetingsText-heading">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <button
                                onClick={() => {
                                  navigate("/fee");
                                }}
                              >
                                Fee's
                              </button>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              Edit Fee
                            </li>
                          </ol>
                        </nav>
                        <h3>Fee's</h3>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-xxl-2">
                    <div className="addProjectlogo">
                      <div className="upload-img-box">
                        <div className="circle">
                          <img src={dummyProfile} alt="" />
                        </div>
                        <div className="p-image ml-auto">
                          <label htmlFor="logoSelect">
                            <div>
                              <img src={camera} alt="" />
                            </div>
                          </label>
                          <input
                            className="file-upload"
                            id="logoSelect"
                            name="projectLogo"
                            type="file"
                            accept="image/*"
                          />
                        </div>
                      </div>
                      <h6>Profile Image</h6>
                    </div>
                  </div> */}
                  <div className="col-xxl-10">
                    <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="rollnumber" className="custom-form-label">
                          Roll Number{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="rollnumber"
                          placeholder="Enter Roll Number"
                          value={feeData.rollNumber}
                          onChange={handleChange}
                        />
                        {errors.rollNumber && (
                          <p className="required-validation">
                            {errors.rollNumber}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="fullname" className="custom-form-label">
                          Student Name{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="fullname"
                          placeholder="Enter Name"
                          name='studentName'
                          value={feeData.studentName}
                          onChange={handleChange}
                          disabled
                        />
                        {errors.studentName && (
                          <p className="required-validation">
                            {errors.studentName}
                          </p>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label
                          htmlFor="fathername"
                          className="custom-form-label"
                        >
                          Father Name{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="fathername"
                          placeholder="Enter Fahter's  Name"
                          name='fatherName'
                          value={feeData.fatherName}
                          onChange={handleChange}
                          disabled
                        />
                        {errors.fatherName && (
                          <p className="required-validation">
                            {errors.fatherName}
                          </p>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label
                          htmlFor="school-class"
                          className="custom-form-label"
                        >
                          Class <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="school-class"
                          placeholder="Enter Class"
                          name="classname"
                          value={feeData.classname}
                          onChange={handleChange}
                          disabled
                        />
                        {errors.classname && (
                          <p className="required-validation">
                            {errors.classname}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="class-section"
                          className="custom-form-label"
                        >
                          Section <span className="required-validation">*</span>
                        </label>
                        <select
                          className="custom-input-field"
                          name='section'
                          value={feeData.section}
                          onChange={handleChange}
                          disabled
                        >
                          <option>Section</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                        {errors.section && (
                          <p className="required-validation">
                            {errors.section}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="quarterly"
                          className="custom-form-label"
                        >
                          Enter Quarterly Fee{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="quarterly"
                          placeholder="Enter Quarterly fee"
                          name="quaterlyFee"
                          value={feeData.quaterlyFee}
                          onChange={handleChange}
                        />
                        {errors.quaterlyFee && (
                          <p className="required-validation">
                            {errors.quaterlyFee}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="status" className="custom-form-label">
                          Status <span className="required-validation">*</span>
                        </label>
                        <span className="d-flex">
                          <div className="containGender">
                            <input
                              id="paid"
                              type="radio"
                              name="feeStatus"
                              value="paid"
                              checked={feeData.feeStatus === "paid"}
                              onChange={handleChange}
                            />
                            <label className="ps-1" htmlFor="paid">
                              Paid
                            </label>
                          </div>
                          <div className="containGender">
                            <input
                              id="due"
                              type="radio"
                              name="feeStatus"
                              value="due"
                              checked={feeData.feeStatus === "due"}
                              onChange={handleChange}
                            />
                            <label className="ps-1" htmlFor="due">
                              Due
                            </label>
                          </div>
                        </span>
                        {errors.feeStatus && (
                          <p className="required-validation">
                            {errors.feeStatus}
                          </p>
                        )}
                      </div>

                      <div className="col-md-8">
                        <label
                          htmlFor="description"
                          className="custom-form-label"
                        >
                          Description <span className="required-validation">*</span>
                        </label>
                        <textarea
                          type="text"
                          className="custom-input-field"
                          id="description"
                          placeholder="Enter Description"
                          rows="6"
                          name="description"
                          value={feeData.description}
                          onChange={handleChange}
                        ></textarea>
                        {errors.description && (
                          <p className="required-validation">
                            {errors.description}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12 mt-4">
                        <button
                          onClick={handleSubmit}
                          className="custom-btn col-md-4"
                        >
                         Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditFee