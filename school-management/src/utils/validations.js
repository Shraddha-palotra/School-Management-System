import { useTranslation } from "react-i18next";

export const useValidation = () => {
  const { t } = useTranslation();

  // Validation for adding/edting  student
  const StudentValidation = (formData = {}) => {
    const {
      rollNumber,
      studentName,
      fatherName,
      motherName,
      phoneNumber,
      classname,
      dateOfBirth,
      section,
      gender,
      address,
      profileImage,
    } = formData;
    let formErrors = {};

    if (!profileImage) formErrors.profileImage = t("Please upload image");
    if (!rollNumber) formErrors.rollNumber = t("Roll Number is required");
    if (!studentName) formErrors.studentName = t("Full name is required");
    if (!fatherName) formErrors.fatherName = t("Father name is required");
    if (!motherName) formErrors.motherName = t("Mother name is required");

    const phonePattern = /^\d{10}$/;
    if (!phoneNumber) formErrors.phoneNumber = t("Phone number is required");
    else if (!phonePattern.test(phoneNumber))
      formErrors.phoneNumber = t(
        "Phone number should contain exactly 10 digits"
      );

    if (!classname) formErrors.classname = t("Class is required");
    if (!dateOfBirth)
      formErrors.dateOfBirth = t("Register date of birth is required");
    if (!section) formErrors.section = t("Section is required");
    if (!gender) formErrors.gender = t("Gender is required");
    if (!address) formErrors.address = t("Address is required");

    return formErrors;
  };

  // validation for adding/edting stafff

  const StaffValidation = (formData = {}) => {
    const {
      staffName,
      staffPosition,
      email,
      phoneNumber,
      joinDate,
      salary,
      gender,
      description,
      profileImage,
    } = formData;

    let formErrors = {};
    if (!profileImage) formErrors.profileImage = t("Please upload image");

    if (!staffName) formErrors.staffName = t("Staff name is required");

    if (!staffPosition)
      formErrors.staffPosition = t("Staff position  is required");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = t("Email is required");
    } else if (!emailPattern.test(email)) {
      formErrors.email = t("Please enter a valid email address");
    }

    const Pattern = /^\d{10}$/;

    if (!phoneNumber) {
      formErrors.phoneNumber = t("Phone number is required");
    } else if (!Pattern.test(phoneNumber)) {
      formErrors.phoneNumber = t(
        "Phone number should contain exactly 10 digits"
      );
    }

    if (!joinDate)
      formErrors.joinDate = t("Register join of date  is required");

    if (!salary) formErrors.salary = t("Salary is required");

    if (!gender) formErrors.gender = t("Gender is required");

    if (!description) formErrors.description = t("Description is required");
    return formErrors;
  };

  // validations for adding/edting fee student
  const FeeStudentValidation = (feeData = {}) => {
    let formErrors = {};

    const {
      studentName,
      fatherName,
      classname,
      quaterlyFee,
      feeStatus,
      section,
      description,
    } = feeData;

    if (!studentName) formErrors.studentName = t("Full name is required");

    if (!fatherName) formErrors.fatherName = t("Full name is required");

    if (!classname) formErrors.classname = t("Class is required");

    if (!quaterlyFee) formErrors.quaterlyFee = t("Quaterly Fee is required");

    if (!feeStatus) formErrors.feeStatus = t("Fee status is required");

    if (!section) formErrors.section = t("Section is required");

    if (!description) formErrors.description = t("Description is required");

    return formErrors;
  };
  return { StudentValidation, StaffValidation, FeeStudentValidation };
};
