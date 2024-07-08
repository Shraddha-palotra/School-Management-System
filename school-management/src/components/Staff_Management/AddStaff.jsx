import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import dummyProfile from "../assets/images/dummyProfile.png";
import camera from "../assets/images/camera.png";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios  from "axios";

function AddStaff({isOpen,setIsOpen}) {

  const navigate = useNavigate();

  const [staffName, setStaffName] = useState("");
  const [staffPosition, setStaffPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDiscription] = useState("");
  const [errors, setErrors] = useState({});

   
  const handleSubmit = (e) => {
    e.preventDefault();


    console.log(handleSubmit);
    console.log(staffName);
    console.log(staffPosition);
    console.log(phoneNumber);
    console.log(joinDate);
    console.log(salary);
    console.log(description);
    console.log(gender);


    let formErrors = {};
  
    if (!staffName) formErrors.staffName = "Staff name is required";

   if (!staffPosition) formErrors.staffPosition = "Staff position  is required";

   const Pattern = /^\d{10}$/;

   if (!phoneNumber) {
     formErrors.phoneNumber = "Phone number is required";
   } else if (!Pattern.test(phoneNumber)) {
     formErrors.phoneNumber = "Phone number should contain exactly 10 digits";
   }
   

   if (!joinDate) formErrors.joinDate = "Register join of date  is required";

   if (!salary) formErrors.salary = "Salary is required";

   if (!gender) formErrors.gender = "Gender is required";

   if (!description) formErrors.description = "Description is required";

   setErrors(formErrors);     

  Axios.post("http://localhost:8080/staff/addstaff",{
       
    staffName,
    staffPosition,
    phoneNumber,
    joinDate,
    salary,
    gender,
    description
  })
  .then((response) => {
    console.log(response);
    console.log("response is",response.data);
    if (response.data.status) {
      console.log("insdie whne status true");
      toast.success("Successfully added new staff")
      setTimeout(()=>{
        navigate('/staff')
      },1000)
    }
  })
  .catch((err) => {
    console.log(err);
  });

};

  return (
    <>
    <ToastContainer/>
      <div className="wapper">
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
                                    navigate("/staff");
                                  }}
                                >
                                  Staff
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                Add Staff
                              </li>
                            </ol>
                          </nav>
                          <h3>Staff</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
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
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label htmlFor="fullname" className="custom-form-label">
                            Full Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="test"
                            className="custom-input-field"
                            id="fullname"
                            placeholder="Enter Name"
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
                          />
                           {errors.staffName && (
                            <p className="required-validation">{errors.staffName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="role" className="custom-form-label">
                            Staff Position{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <select className="custom-input-field"
                            value={staffPosition}
                            onChange={(e) => setStaffPosition(e.target.value)}
                          >
                            <option value="">Position</option>
                            <option value="Principle">Principle</option>
                            <option value="Vice principle">Vice princeple</option>
                            <option value="Accountent">Accountent</option>
                            <option value="Senior Teacher">Senior Teacher</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Other Staff">Other Staff</option>
                            <option value="Security">Security</option>
                          </select>
                          {errors.staffPosition && (
                            <p className="required-validation">{errors.staffPosition}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="contact-number"
                            className="custom-form-label"
                          >
                            Phone Number{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="contact-number"
                            placeholder="Enter Contect Nubmer"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                           {errors.phoneNumber && (
                            <p className="required-validation">{errors.phoneNumber}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="joindate" className="custom-form-label">
                            {" "}
                            Join Date
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="joindate"
                            value={joinDate}
                            onChange={(e) => setJoinDate(e.target.value)}
                          />
                           {errors.joinDate && (
                            <p className="required-validation">{errors.joinDate}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="salary" className="custom-form-label">
                            Salary{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="salary"
                            placeholder="Enetr Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                          />
                           {errors.salary && (
                            <p className="required-validation">{errors.salary}</p>
                          )}
                        </div>
                        <div className="col-md-8">
                          <label htmlFor="gender" className="custom-form-label">
                            Gender{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="male">
                                Male
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="female">
                                Female
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="other"
                                type="radio"
                                name="gender"
                                value="other"
                                checked={gender === "other"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="other">
                                Other
                              </label>
                            </div>
                          </span>
                          {errors.gender && (
                            <p className="required-validation">{errors.gender}</p>
                          )}
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="description"
                            className="custom-form-label"
                          >
                            Description
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="description"
                            placeholder="Enter Description"
                            rows="6"
                            value={description}
                            onChange={(e) => setDiscription(e.target.value)}
                          ></textarea>
                           {errors.description && (
                            <p className="required-validation">{errors.description}</p>
                          )}
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                          onClick={handleSubmit}
                          className="custom-btn col-md-4"
                          
                          >
                            Add Staff
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
      </div>
    </>
  );
}

export default AddStaff;
