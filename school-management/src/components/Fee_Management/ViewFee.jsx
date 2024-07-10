import React, { useState }  from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dummyprofile from '../assets/images/dummyProfile.png'
import camera from "../assets/images/camera.png";

function ViewFee({isOpen,setIsOpen}) {

     const navigate = useNavigate();
     const location = useLocation();

     const [ feeData, setFeeData] = useState(location.state.items);
     console.log(feeData);
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
                              View Fee
                            </li>
                          </ol>
                        </nav>
                        <h3>Fee's</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2">
                    <div className="addProjectlogo">
                      <div className="upload-img-box">
                        <div className="circle">
                          {/* <img src={dummyProfile} alt=""  */}
                          <img  src={feeData.profileImage ? `http://localhost:8080${feeData.profileImage}` : dummyprofile } />
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
                  </div>
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
                          disabled
                        />
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
                          disabled
                        />
                        
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
                          disabled
                        />
                        
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
                         disabled
                        />
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
                          disabled
                        >
                          <option>Section</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
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
                          disabled
                        />
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
                              disabled
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
                              disabled
                            />
                            <label className="ps-1" htmlFor="due">
                              Due
                            </label>
                          </div>
                        </span>
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
                          disabled
                        ></textarea>
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

export default ViewFee