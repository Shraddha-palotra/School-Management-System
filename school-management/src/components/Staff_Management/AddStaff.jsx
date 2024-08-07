import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import camera from "../assets/images/camera.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addStaff } from "../API's/StaffAPI";
import { useTranslation } from "react-i18next";
import { useValidation } from "../../utils/validations";

function AddStaff({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {StaffValidation } = useValidation();
  const [staffName, setStaffName] = useState("");
  const [staffPosition, setStaffPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDiscription] = useState("");
  const [errors, setErrors] = useState({});

  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    // console.log(handleSubmit);
    // console.log(staffName);
    // console.log(staffPosition);
    // console.log(email);
    // console.log(phoneNumber);
    // console.log(joinDate);
    // console.log(salary);
    // console.log(description);
    // console.log(gender);

    const formData = {
      staffName,
      staffPosition,
      email,
      phoneNumber,
      joinDate,
      salary,
      gender,
      description,
      profileImage,
    };

    // Validate form data
    const formErrors = StaffValidation(formData);
    setErrors(formErrors);

   

    if (Object.keys(formErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("staffName", staffName);
      formDataToSend.append("staffPosition", staffPosition);
      formDataToSend.append("email", email);
      formDataToSend.append("phoneNumber", phoneNumber);
      formDataToSend.append("joinDate", joinDate);
      formDataToSend.append("salary", salary);
      formDataToSend.append("gender", gender);
      formDataToSend.append("description", description);

      if (profileImage) formDataToSend.append("profileImage", profileImage);
      console.log("fromdata is ", formData);

      try {
        const response = await addStaff(formDataToSend); 
        if (response.status) {
          toast.success(t("Successfully_added_staff"));
          setTimeout(() => {
            navigate("/staff");
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data) {
          setErrors({ [err.response.data.field]:t(err.response.data.message) });
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
                                  {t("Staff")}
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("Add_Staff")}
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
                            <img
                              src={
                                profileImage
                                  ? URL.createObjectURL(profileImage)
                                  : `http://localhost:8080${profileImage}`
                              }
                              alt=""
                            />
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
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                        {errors.profileImage && (
                          <p className="required-validation">
                            {errors.profileImage}
                          </p>
                        )}
                        <h6>{t("Profile_Image")}</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            {t("Full_Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            placeholder={t("Enter_Name")}
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
                          />
                          {errors.staffName && (
                            <p className="required-validation">
                              {errors.staffName}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="role" className="custom-form-label">
                            {t("Staff_Position")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <select
                            className="custom-input-field"
                            value={staffPosition}
                            onChange={(e) => setStaffPosition(e.target.value)}
                          >
                            <option value="">{t("Position")}</option>
                            <option value="Principle">{t("Principle")}</option>
                            <option value="Vice principle">
                              {t("Vice_princeple")}
                            </option>
                            <option value="Accountent">
                              {t("Accountent")}
                            </option>
                            <option value="Senior Teacher">
                              {t("Senior_Teacher")}
                            </option>
                            <option value="Teacher">{t("Teacher")}</option>
                            <option value="Other Staff">
                              {t("Other_Staff")}
                            </option>
                            <option value="Security">{t("Security")}</option>
                          </select>
                          {errors.staffPosition && (
                            <p className="required-validation">
                              {errors.staffPosition}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email" className="custom-form-label">
                            {t("Email")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="email"
                            placeholder={t("Enter_Email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <p className="required-validation">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="contact-number"
                            className="custom-form-label"
                          >
                            {t("Phone_Number")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="contact-number"
                            placeholder={t("Enter_Contact_Nubmer")}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          {errors.phoneNumber && (
                            <p className="required-validation">
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="joindate"
                            className="custom-form-label"
                          >
                            {" "}
                            {t("Join_Date")}
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
                            <p className="required-validation">
                              {errors.joinDate}
                            </p>
                          )}
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
                            placeholder={t("Enetr-Salary")}
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                          />
                          {errors.salary && (
                            <p className="required-validation">
                              {errors.salary}
                            </p>
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
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)}
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
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
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
                                checked={gender === "other"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="other">
                                {t("Other")}
                              </label>
                            </div>
                          </span>
                          {errors.gender && (
                            <p className="required-validation">
                              {errors.gender}
                            </p>
                          )}
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
                            placeholder={t("Enter_Description")}
                            rows="6"
                            value={description}
                            onChange={(e) => setDiscription(e.target.value)}
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
                            {t("Add_Staff")}
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
