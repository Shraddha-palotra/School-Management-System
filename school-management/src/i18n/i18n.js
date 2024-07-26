import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDectector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      Action: "Action",
      Admin: "Admin",
      Profile: "Profile",
      "Change Password": "Change Password",
      "Log Out": "Log Out",
      English: "English",
      Spanish: "Spanish",

      //add student
      "Add Student": "Add Student",
      Student: "Student",
      "Enter Name": "Enter Name",
      "Roll Number": "Roll Number",
      "Enter Roll Number": "Enter Roll Number",
      "Roll Number is required": "Roll Number is required",
      "Full name is required": "Full name is required",
      "Father Name": "Father Name",
      "Enter Father Name": "Enter Father Name",
      "Father name is required": "Father name is required",
      "Mother Name": "Mother Name",
      "Enter Mother Name": "Enter Mother Name",
      "Mother name is required": "Mother name is required",
      "Date Of Birth": "Date Of Birth",
      "Register date of birth is required":
        "Register date of birth is required",
      "Phone Number": "Phone Number",
      "Enter Number": "Enter Number",
      "Phone number is required": "Phone number is required",
      "Phone number should contain exactly 10 digits":
        "Phone number should contain exactly 10 digits",
      Class: "Class",
      "Enter Class": "Enter Class",
      "Class is required": "Class is required",
      Section: "Section",
      "Section is required": "Section is required",
      Gender: "Gender",
      Male: "Male",
      Female: "Female",
      Other: "Other",
      "Gender is required": "Gender is required",
      Address: "Address",
      "Enter Address": "Enter Address",
      "Address is required": "Address is required",
      "Profile Image": "Profile Image",
      "please upload image": "please upload image",
      "Successfully added new student": "Successfully added new student",

      // edit student
      "Edit Student": "Edit Student",
      Update: "Update",
      "View Student": "View Student",

      // student
      "Search Student": "Search Student",

      // Delete student
      "Delete Student": "Delete Student",
      "Are you sure you want to Delete": "Are you sure you want to Delete",
      Cancel: "Cancel",
      Confirm: "Confirm",

      // staff
      Staff: "Staff",
      "Search Staff": "Search Staff",
      Id: "Id",
      "Staff Name": "Staff Name",
      "Staff Position": "Staff Position",
      "Join Date": "Join Date",
      Salary: "Salary",
      Contact: "Contact",
      "Enetr Salary": "Enetr Salary",
      Edit: "Edit",
      Delete: "Delete",
      View: "View",

      // add staff
      "Full Name": "Full Name",
      Position: "Staff Position",
      Email: "Email",
      "Enter Email": "Enter Email",
      "Contact Number": "Phone Number",
      "Enter Contact Nubmer": "Enter Contact Nubmer",
      Description: "Description",
      "Enter Description": "Enter Description",
      "Add Staff": "Add Staff",
      "Please upload image": "Please upload image",
      "Staff name is required": "Staff name is required",
      "Staff position  is required": "Staff position  is required",
      "Email is required": "Email is required",
      "Please enter a valid email address":
        "Please enter a valid email address",
      "Register join of date  is required":
        "Register join of date  is required",
      "Salary is required": "Salary is required",
      "Description is required": "Description is required",
      Principle: "Principle",
      "Vice Principle": "Vice Principle",
      Accountent: "Accountent",
      "Senior Teacher": "Senior Teacher",
      Teacher: "Teacher",
      "Other Staff": "Other Staff",
      Security: "Security",
      "Delete Staff": "Delete Staff",

      // Fee Students
      "Student Name": "Student Name",
      "Enter Quarterly Fee": "Enter Quarterly Fee",
      Status: "Status",
      Paid: "Paid",
      Due: "Due",
      "Add Fee": "Add Fee",
      Fee: "Fee",
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      "Edit Fee": "Edit Fee",
      "View Fee": "View Fee",
      "Student name , father name or status are wrong.":
        "Student name, father name or status are wrong.",
      "Quarterly Fee is required": "Quarterly Fee is required",
      "Fee status is required": "Fee status is required",
      "Enter Quarterly fee": "Enter Quarterly fee",
      "Quarterly fee": "Quarterly fee",
      "Quaterly Fee is required": "Quaterly Fee is required",

      //   dashboard

      Dashboard: "Dashboard",
      Welcome: "Welcome",
      "High school": "High school",
      "Total Student's": "Total Student's",
      "Total Staff": "Total Staff",
      "Due Amount's": "Due Fee Amount's",
      "Student's": "Student's",

      // forgotpassword

      "Forgot Password": "Forgot Password",
      "Enter the email address associated with your account.":
        "Enter the email address associated with your account.",
      "Enter Email Address": "Enter Email Address",
      Continue: "Continue",
      Back: "Back",
      "Check your email box for the password link":
        "Check your email box for the password link",

      // login
      Login: "Login",
      "Hey, Enter your details to get sign in to your account":
        "Hey, Enter your details to get sign in to your account",

      Password: "Password",
      "Enter Password": "Enter Password",
      "Remember Me": "Remember Me",
      "Forgot Password?": "Forgot Password?",
      "Successfully Login": "Successfully Login",
      "Don't have an Account?": "Don't have an Account?",
      SignUp: "SignUp",

      "Password is required": "Password is required",
      "Password should be at least 8 characters":
        "Password should be at least 8 characters",
    },
  },
  es: {
    translation: {
      Action: "Acción",
      Admin: "administración",
      Profile: "Perfil",
      "Change Password": "Cambiar Contraseña",
      "Log Out": "Cerrar Sesión",
      English: "Inglés",
      Spanish: "Español",

      // add student

      "Add Student": "Agregar Estudiante",
      Student: "Estudiante",
      "Student Name": "Nombre del estudiante",
      "Enter Name": "Ingrese su nombre",
      "Roll Number": "Número de Registro",
      "Enter Roll Number": "Ingrese el Número de Registro",
      "Roll Number is required": "Se requiere el número de rollo",
      "Full name is required": "Se requiere el nombre completo",
      "Father Name": "Nombre del Padre",
      "Enter Father Name": "Ingrese el Nombre del Padre",
      "Father name is required": "Se requiere el nombre del padre",
      "Mother Name": "Nombre de la Madre",
      "Enter Mother Name": "Ingrese el Nombre de la Madre",
      "Mother name is required": "Se requiere el nombre de la madre",
      "Date Of Birth": "Fecha de Nacimiento",
      "Register date of birth is required":
        "Se requiere registrar la fecha de nacimiento",
      "Phone Number": "Número de Teléfono",
      "Enter Number": "Ingrese el Número",
      "Phone number is required": "Se requiere el número de teléfono",
      "Phone number should contain exactly 10 digits":
        "El número de teléfono debe contener exactamente 10 dígitos",
      Class: "Clase",
      "Enter Class": "Ingrese la Clase",
      "Class is required": "Se requiere la clase",
      Section: "Sección",
      "Section is required": "Se requiere la sección",
      Gender: "Género",
      Male: "Masculino",
      Female: "Femenino",
      Other: "Otro",
      "Gender is required": "Se requiere género",
      Address: "Dirección",
      "Enter Address": "Ingrese la Dirección",
      "Address is required": "Se requiere la dirección",
      "Profile Image": "Imagen de Perfil",
      "please upload image": "por favor suba la imagen",
      "Successfully added new student": "Estudiante nuevo agregado con éxito",

      // edit student
      "Edit Student": "Editar estudiante",
      Update: "Actualizar",
      "View Student": "Ver estudiante",

      // student
      "Search Student": "Buscar estudiante",

      // Delete Student
      "Are you sure you want to Delete": "Estás segura de que quieres eliminar",
      "Delete Student": "Eliminar estudiante",
      Cancel: "Cancelar",
      Confirm: "Confirmar",

      //  staff
      Staff: "Personal",
      "Search Staff": "Buscar Personal",
      Id: "Id",
      "Staff Name": "Nombre del Personal",
      "Staff Position": "Posición del Personal",
      "Join Date": "Fecha de Ingreso",
      gender: "Género",
      Salary: "Salario",
      "Enetr Salary": "Ingrese Salario",
      Contact: "Contacto",

      // add staff
      "Full Name": "Nombre Completo",
      Position: "Cargo del Personal",
      Email: "Correo Electrónico",
      "Enter Email": "Ingrese correo electrónico",
      "Contact Number": "Número de Teléfono",
      "Enter Contact Nubmer": "Ingrese Número de Teléfono",
      Description: "Descripción",
      "Enter Description": "Ingrese Descripción",
      "Add Staff": "Agregar personal",
      "Please upload image": "Por favor sube imagen",
      "Staff name is required": "El nombre del personal es obligatorio.",
      "Staff position  is required": "Se requiere puesto de personal",
      "Email is required": "correo electronico es requerido",
      "Please enter a valid email address":
        "Por favor, introduce una dirección de correo electrónico válida",
      "Register join of date  is required":
        "Se requiere registrarse para unirse a la fecha",
      "Salary is required": "Se requiere salario",
      "Description is required": "Se requiere descripción",
      Principle: "Director",
      "Vice Principle": "Subdirector",
      Accountent: "Contador",
      "Senior Teacher": "Profesor Senior",
      Teacher: "Profesor",
      "Other Staff": "Otro Personal",
      Security: "Seguridad",
      "Delete Staff": "Eliminar personal",

      // fee student
      "Enter Quarterly Fee": "Ingrese la tarifa trimestral",
      Status: "Estado",
      Paid: "Pagado",
      Due: "Debido",
      "Add Fee": "Agregar tarifa",
      Fee: "Tarifas",
      "Student name , father name or status are wrong.":
        "El nombre del estudiante, el nombre del padre o el estado son incorrectos.",
      "Quarterly Fee is required": "Se requiere tarifa trimestral",
      "Fee status is required": "Se requiere estado de la tarifa",
      "Enter Quarterly fee": "Ingrese la tarifa trimestral",
      "Quarterly fee": "Cuota trimestral",
      "Quaterly Fee is required": "Se requiere tarifa trimestral",
      "Edit Fee": "Editar tarifa",
      "View Fee": "Ver tarifa",

      // dashboard
      Dashboard: "Tablero",
      Welcome: "Bienvenido",
      "High school": "Escuela secundaria",
      "Total Student's": "Total de estudiantes",
      "Total Staff": "Total de personal",
      "Due Amount's": "Montos de tarifas vencidas",
      "Student's": "Del estudiante",

      // forgotpassword

      "Forgot Password": "Olvidé mi contraseña",
      "Enter the email address associated with your account.":
        "Ingrese la dirección de correo electrónico asociada a su cuenta.",

      "Enter Email Address": "Ingrese dirección de correo electrónico",
      Continue: "Continuar",
      Back: "Atrás",

      "Check your email box for the password link":
        "Revise su bandeja de entrada para el enlace de la contraseña",

      // login

      Login: "Iniciar sesión",
      "Hey, Enter your details to get sign in to your account":
        "Hola, ingresa tus detalles para acceder a tu cuenta",

      Password: "Contraseña",
      "Enter Password": "Ingrese contraseña",
      "Remember Me": "Recuérdame",
      "Forgot Password?": "¿Olvidaste tu contraseña?",
      "Successfully Login": "Inicio de sesión exitoso",
      "Don't have an Account?": "¿No tienes una cuenta?",
      SignUp: "Registrarse",

      "Password is required": "La contraseña es obligatoria",
      "Password should be at least 8 characters":
        "La contraseña debe tener al menos 8 caracteres",
    },
  },
};
i18n
  .use(LanguageDectector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
