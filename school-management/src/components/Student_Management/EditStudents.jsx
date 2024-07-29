import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import  Axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useValidation } from '../../utils/validations';

function EditStudents({ items, isOpen, setIsOpen }) {

  const navigate = useNavigate();
  const {StudentValidation} = useValidation();
  const location = useLocation();
// console.log("location in edit student",location.state.items);

  const [studentData, setStudentData] = useState(location.state.items || {});
  console.log("studentData",studentData);
  
  const [errors, setErrors] = useState({});
   
  const [selectImage, setSelectImage] = useState(null);

  const {t} = useTranslation();

  useEffect(() => {
    if (items) {
     setStudentData(items);
    }
  }, [items]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("name is", name);
    console.log("value is", value);

  if(name === "profileImage"){
    setSelectImage(files[0]);
  }else{
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
    
  }; 

  // const validateForm = () => {
  //   let formErrors = {};
  //   if (!studentData.rollNumber) formErrors.rollNumber = t("Roll Number is required");
  //   if (!studentData.studentName) formErrors.studentName = t("Full name is required");
  //   if (!studentData.fatherName) formErrors.fatherName = t("Father name is required");
  //   if (!studentData.motherName) formErrors.motherName = t("Mother name is required");

  //   const pattern = /^\d{10}$/;
  //   if (!studentData.phoneNumber) {
  //     formErrors.phoneNumber = t("Phone number is required");
  //   } else if (!pattern.test(studentData.phoneNumber)) {
  //     formErrors.phoneNumber = t("Phone number should contain exactly 10 digits");
  //   }

  //   if (!studentData.classname) formErrors.classname = t("Class is required");
  //   if (!studentData.dateOfBirth) formErrors.dateOfBirth = t("Register date of birth is required");
  //   if (!studentData.section) formErrors.section = t("Section is required");
  //   if (!studentData.gender) formErrors.gender = t("Gender is required");
  //   if (!studentData.address) formErrors.address = t("Address is required");

  //   return formErrors;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      formData.append(key, studentData[key]);
    });
    if (selectImage) { 
      formData.append("profileImage", selectImage);
    }
   
    const formErrors = StudentValidation(studentData);
    setErrors(formErrors);
    console.log("student data on submit", studentData);

    if (Object.keys(formErrors).length === 0) {
      const id = studentData._id;
      
      Axios.put(`http://localhost:8080/student/editstudent/${id}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      )
      .then((response) => {
        if (response.data.status) {
          toast.success("Successfully added new student")
          setTimeout(()=>{
           navigate('/student');
          },1000)   
        }
        else {
          setErrors ({rollNumber : response.data.message})
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
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
                                    navigate("/student");
                                  }}
                                >
                                  {" "}
                                  {t("Student")}
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("Edit Student")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("Student")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            {/* <img src={dummyProfile} alt="" /> */}
                           <img src={selectImage ? URL.createObjectURL(selectImage) : `http://localhost:8080${studentData.profileImage}`}  alt=''/>
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
                              name="profileImage"
                              type="file"
                              accept="image/*"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <h6>{t("Profile Image")}</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="rollNumber" className="custom-form-label">
                          {t("Roll Number")}{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="rollNumber"
                          placeholder={t("Enter Roll Number")}
                          name='rollNumber'
                          value={studentData.rollNumber}
                          onChange={handleChange}
                        />
                        {errors.rollNumber && (
                          <p className="required-validation">
                            {errors.rollNumber}
                          </p>
                        )}
                      </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            {t("Student Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            placeholder={t("Enter Name")}
                            name='studentName'
                            value={studentData.studentName}
                            onChange={handleChange}
                          />
                          {errors.studentName && (
                            <p className="required-validation">{errors.studentName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="fathername"
                            className="custom-form-label"
                          >
                            {t("Father Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fathername"
                            placeholder={t("Enter Father Name")}
                            name='fatherName'
                            value={studentData.fatherName}
                            onChange={handleChange}
                          />
                          {errors.fatherName && (
                            <p className="required-validation">{errors.fatherName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="mothername"
                            className="custom-form-label"
                          >
                            {t("Mother Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="mothername"
                            placeholder={t("Enter Mother Name")}
                            name='motherName'
                            value={studentData.motherName}
                            onChange={handleChange}
                          />
                          {errors.motherName && (
                            <p className="required-validation">{errors.motherName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="dateofbirth" className="custom-form-label">
                            {t("Date Of Birth")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="dateofbirth"
                            name='dateOfBirth'
                            value={studentData.dateOfBirth}
                            onChange={handleChange}
                          />
                          {errors.dateOfBirth && (
                            <p className="required-validation">{errors.dateOfBirth}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="phonenumber" className="custom-form-label">
                            {t("Phone Number")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="phonenumber"
                            placeholder={t("Enter Number")}
                            name='phoneNumber'
                            value={studentData.phoneNumber}
                            onChange={handleChange}
                          />
                          {errors.phoneNumber && (
                            <p className="required-validation">{errors.phoneNumber}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="school-class"
                            className="custom-form-label"
                          >
                            {t("Class")} <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="school-class"
                            placeholder={t("Enter Class")}
                            name='classname'
                            value={studentData.classname}
                            onChange={handleChange}
                          />
                          {errors.classname && (
                            <p className="required-validation">{errors.classname}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="class-section"
                            className="custom-form-label"
                          >
                            {t("Section")}  <span className="required-validation">*</span>
                            
                          </label>
                          <select className="custom-input-field"
                          name='section'
                          value={studentData.section}
                          onChange={handleChange}
                          >
                            <option value="" 
                          >
                              {t("Section")} 
                            </option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                          {errors.section && (
                            <p className="required-validation">{errors.section}</p>
                          )}
                        </div>
                        <div className="col-md-8">
                          <label htmlFor="gender" className="custom-form-label">
                            {t("Gender")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={studentData.gender === "male"}
                                onChange={handleChange}
                              />
                              <label className="ps-1" htmlFor="male">
                                {t("Male")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={studentData.gender === "female"}
                                onChange={handleChange}
                              />
                              <label className="ps-1" htmlFor="female">
                                {t("Female")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="other"
                                type="radio"
                                name="gender"
                                value="other"
                                checked={studentData.gender === "other"}
                                onChange={handleChange}
                              />
                              <label className="ps-1" htmlFor="other">
                                {t("Other")}
                              </label>
                            </div>
                          </span>
                          {errors.gender && (
                            <p className="required-validation">{errors.gender}</p>
                          )}
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="address"
                            className="custom-form-label"
                          >
                            {" "}
                            {t("Address")}
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="address"
                            placeholder={t("Enter Address")}
                            rows="6"
                            value={studentData.address}
                            name='address'
                            onChange={handleChange}
                          ></textarea>
                          {errors.address && (
                            <p className="required-validation">{errors.address}</p>
                          )}
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                           onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("Update")}
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
  );

}
export default EditStudents

