import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editStaff } from "../API's/StaffAPI";
import { useTranslation } from "react-i18next";
import { useValidation } from "../../utils/validations";

function EditStaff({ items, isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const location = useLocation();
  // console.log("location in edit staff",location.state.items);
  const {StaffValidation} = useValidation();
  const [staffData, setStaffData] = useState(location.state.items || {});
  console.log("staffData", staffData);

  const [errors, setErrors] = useState({});

  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (items) {
      setStaffData(items);
    }
  }, [items]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("name is", name);
    console.log("value is", value);

    if (name === "profileImage") {
      setSelectImage(files[0]);
    } else {
      setStaffData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = StaffValidation(staffData);
    setErrors(formError);

    if (Object.keys(formError).length === 0) {
      const formData = new FormData();
      Object.keys(staffData).forEach((key) => {
        formData.append(key, staffData[key]);
      });
      if (selectImage) {
        formData.append("profileImage", selectImage);
      }

      const id = staffData._id;

      editStaff(id, formData)
        .then((response) => {
          if (response.data.status) {
            toast.success(t("Successfully_update_staff"));
            setTimeout(() => {
              navigate("/staff", { state: { items } });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrors({ [err.response.data.field]: t(err.response.data.message) });
        });
    }
  };
  return (
    <>
      <ToastContainer />
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
                              {t("Edit_Staff")}
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
                          <img
                            src={
                              selectImage
                                ? URL.createObjectURL(selectImage)
                                : `http://localhost:8080${staffData.profileImage}`
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
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <h6>{t("Profile_Image")}</h6>
                    </div>
                  </div>
                  <div className="col-xxl-10">
                    <form className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="fullname" className="custom-form-label">
                        {t("Full_Name")}{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="fullname"
                          placeholder={t("Enter_Name")}
                          name="staffName"
                          value={staffData.staffName}
                          onChange={handleChange}
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
                          name="staffPosition"
                          value={staffData.staffPosition}
                          onChange={handleChange}
                        >
                          <option value="Principle">{t("Principle")}</option>
                          <option value="Vice principle">{t("Vice_princeple")}</option>
                          <option value="Accountent">{t("Accountent")}</option>
                          <option value="Senior Teacher">{t("Senior_Teacher")}</option>
                          <option value="Teacher">{t("Teacher")}</option>
                          <option value="Other Staff">{t("Other_Staff")}</option>
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
                        {t("Email")} <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="email"
                          placeholder={t("Enter_Email")}
                          name="email"
                          value={staffData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className="required-validation">{errors.email}</p>
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
                          placeholder={t("Enter_Contect_Nubmer")}
                          name="phoneNumber"
                          value={staffData.phoneNumber}
                          onChange={handleChange}
                        />
                        {errors.phoneNumber && (
                          <p className="required-validation">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="joindate" className="custom-form-label">
                          {" "}
                          {t("Join_Date")}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="date"
                          className="custom-input-field"
                          id="joindate"
                          name="joinDate"
                          value={staffData.joinDate}
                          onChange={handleChange}
                        />
                        {errors.joinDate && (
                          <p className="required-validation">
                            {errors.joinDate}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="salary" className="custom-form-label">
                        {t("Salary")} <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="salary"
                          name="salary"
                          placeholder={t("Enetr_Salary")}
                          value={staffData.salary}
                          onChange={handleChange}
                        />
                        {errors.salary && (
                          <p className="required-validation">{errors.salary}</p>
                        )}
                      </div>
                      <div className="col-md-8">
                        <label htmlFor="gender" className="custom-form-label">
                        {t("Gender")} <span className="required-validation">*</span>
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
                              checked={staffData.gender === "other"}
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
                          name="description"
                          value={staffData.description}
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

export default EditStaff;
