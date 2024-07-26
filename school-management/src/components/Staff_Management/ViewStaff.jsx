import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import dummyprofile from "../assets/images/dummyProfile.png"
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import { useTranslation } from 'react-i18next';


function ViewStaff({isOpen,setIsOpen}) {

     
     const navigate = useNavigate();
     const location = useLocation(); 
    const {t} = useTranslation();
     const [staffData, setStaffData] = useState(location.state.items);
     console.log(staffData)

  return (
    <>
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
                                 {t("Staff")} 
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("View Staff")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("Staff")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            {/* <img src={dummyProfile} alt="" /> */}
                            <img  src={staffData.profileImage ? `http://localhost:8080${staffData.profileImage}` : dummyprofile } alt=''/>
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
                        <h6>{t("Profile Image")}</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label htmlFor="fullname" className="custom-form-label">
                            {t("Full Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="test"
                            className="custom-input-field"
                            id="fullname"
                            placeholder="Enter Name"
                            name='staffName'
                            value={staffData.staffName}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="role" className="custom-form-label">
                           {t("Staff Position")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <select className="custom-input-field"
                          name='staffPosition'
                            value={staffData.staffPosition}
                            disabled
                          >
                            <option>{t("Principle")}</option>
                            <option value="Vice principle">{t("Vice princeple")}</option>
                            <option value="Accountent">{t("Accountent")}</option>
                            <option value="Senior Teacher">{t("Senior Teacher")}</option>
                            <option value="Teacher">{t("Teacher")}</option>
                            <option value="Other Staff">{t("Other Staff")}</option>
                            <option value="Security">{t("Security")}</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="email" className="custom-form-label">
                          {t("Email")} <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="email"
                          placeholder="Enter Email"
                          name="email"
                          value={staffData.email}
                          disabled
                        />
                      </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="contact-number"
                            className="custom-form-label"
                          >
                            {t("Phone Number")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="contact-number"
                            placeholder="Enter Contect Nubmer"
                            name='phoneNumber'
                            value={staffData.phoneNumber}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="joindate" className="custom-form-label">
                            {" "}
                            {t("Join Date")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="joindate"
                            name='joinDate'
                            value={staffData.joinDate}
                            disabled
                          />
                          
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="salary" className="custom-form-label">
                            {t("Salary")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="salary"
                            name='salary'
                            placeholder="Enetr Salary"
                            value={staffData.salary}
                            disabled
                          />
                           
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
                                checked={staffData.gender === "male"}
                                disabled
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
                                checked={staffData.gender === "female"}
                                disabled
                             
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
                                checked={staffData.gender === "other"}
                                disabled
                                
                              />
                              <label className="ps-1" htmlFor="other">
                                {t("Other")}
                              </label>
                            </div>
                          </span>
                          
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="description"
                            className="custom-form-label"
                          >
                           {t("Description")}
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="description"
                            placeholder="Enter Description"
                            rows="6"
                            name='description'
                            value={staffData.description}
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

export default ViewStaff