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

    if (!profileImage) formErrors.profileImage = t("Please_upload_image");
    if (!rollNumber) formErrors.rollNumber = t("Roll_Number_required");
    if (!studentName) formErrors.studentName = t("Full_name_required");
    if (!fatherName) formErrors.fatherName = t("Father_name_required");
    if (!motherName) formErrors.motherName = t("Mother_name_required");

    const phonePattern = /^\d{10}$/;
    if (!phoneNumber) formErrors.phoneNumber = t("Phone_number_required");
    else if (!phonePattern.test(phoneNumber))
      formErrors.phoneNumber = t(
        "Phone_number_10_digits"
      );

    if (!classname) formErrors.classname = t("Class_required");
    if (!dateOfBirth)
      formErrors.dateOfBirth = t("Register_date_required");
    if (!section) formErrors.section = t("Section_required");
    if (!gender) formErrors.gender = t("Gender_required");
    if (!address) formErrors.address = t("Address_required");

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
    if (!profileImage) formErrors.profileImage = t("Please_upload_Image");

    if (!staffName) formErrors.staffName = t("Staff_name_required");

    if (!staffPosition)
      formErrors.staffPosition = t("Staff_position_required");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = t("Email_required");
    } else if (!emailPattern.test(email)) {
      formErrors.email = t("Please_email_address");
    }

    const Pattern = /^\d{10}$/;

    if (!phoneNumber) {
      formErrors.phoneNumber = t("Phone_number_required");
    } else if (!Pattern.test(phoneNumber)) {
      formErrors.phoneNumber = t(
        "Phone_number_10_digits"
      );
    }

    if (!joinDate)
      formErrors.joinDate = t("Register_join_required");

    if (!salary) formErrors.salary = t("Salary_required");

    if (!gender) formErrors.gender = t("Gender_required");

    if (!description) formErrors.description = t("Description_required");
    return formErrors;
  };

  // validations for adding/edting fee student
  const FeeStudentValidation = (feeData = {}) => {
    let formErrors = {};

    const {
      rollNumber,
      studentName,
      fatherName,
      classname,
      quaterlyFee,
      feeStatus,
      section,
      description,
    } = feeData;

    if (!rollNumber) formErrors.rollNumber = t("Roll_Number_required");

    if (!studentName) formErrors.studentName = t("Full_name_required");

    if (!fatherName) formErrors.fatherName = t("Full_name_required");

    if (!classname) formErrors.classname = t("Class_required");

    if (!quaterlyFee) formErrors.quaterlyFee = t("Quaterly_Fee_required");

    if (!feeStatus) formErrors.feeStatus = t("Fee_status_required");

    if (!section) formErrors.section = t("Section_required");

    if (!description) formErrors.description = t("Description_required");

    return formErrors;
  };
  return { StudentValidation, StaffValidation, FeeStudentValidation };
};
