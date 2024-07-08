import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import dummyProfile from "../assets/images/dummyProfile.png";
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Axios  from 'axios';

function EditStaff({ items, isOpen, setIsOpen }) {

     const navigate = useNavigate();

     const location = useLocation();
     // console.log("location in edit student",location.state.items);

     const [staffData , setStaffData ] = useState(location.state.items || {});
     console.log("staffData",staffData);

     const [errors, setErrors] = useState({});

     const handleChange = (e) => {
          const {name, value} = e.target;
          setStaffData((prevData) => ({
               ...prevData,
               [name] : value,
          }))
     }

     const validateForm = () => {
          let formErrors = {};
      
          if (!staffData.staffName) formErrors.staffName = "Staff name is required";
          if (!staffData.staffPosition) formErrors.staffPosition = "Staff position is required";
          
      
          const pattern = /^\d{10}$/;
          if (!staffData.phoneNumber) {
            formErrors.phoneNumber = "Phone number is required";
          } else if (!pattern.test(staffData.phoneNumber)) {
            formErrors.phoneNumber = "Phone number should contain exactly 10 digits";
          }
      
          if (!staffData.joinDate) formErrors.joinDate = "Staff joining date is required";
          if (!staffData.salary) formErrors.salary = "salary is required";
          if (!staffData.gender) formErrors.gender = "Gender is required";
          if (!staffData.description) formErrors.description = "Description is required";
      
          return formErrors;
        };
      
     const handleSubmit = (e) => {
         e.preventDefault();

         const formError = validateForm();
         setErrors(formError);
         console.log("staff data on submit ",staffData);

         if(Object.keys(formError).length === 0 )  {
          const id = staffData._id;

          Axios.put(`http://localhost:8080/staff/editstaffs/${id}`,
               staffData
          ).then((response) => {
               if(response.data.status){
               toast.success("Successfully added new staff")
          setTimeout(()=>{
            navigate('/staff', { state: { items } });
          },1000)
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
                                Edit Staff
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
                            name='staffName'
                            value={staffData.staffName}
                            onChange={handleChange}
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
                          name='staffPosition'
                            value={staffData.staffPosition}
                            onChange={handleChange}
                          >
                            <option>Principle</option>
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
                            name='phoneNumber'
                            value={staffData.phoneNumber}
                            onChange={handleChange}
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
                            name='joinDate'
                            value={staffData.joinDate}
                            onChange={handleChange}
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
                            name='salary'
                            placeholder="Enetr Salary"
                            value={staffData.salary}
                            onChange={handleChange}
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
                                checked={staffData.gender === "male"}
                                onChange={handleChange}
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
                                checked={staffData.gender === "female"}
                                onChange={handleChange}
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
                                checked={staffData.gender === "other"}
                                onChange={handleChange}
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
                            name='description'
                            value={staffData.description}
                            onChange={handleChange}
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

export default EditStaff