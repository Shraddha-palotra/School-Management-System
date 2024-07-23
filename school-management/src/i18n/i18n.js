import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDectector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "Action": "Action",
      "Admin": "Admin",
      "Profile": "Profile",
      "Change Password": "Change Password",
      "Log Out": "Log Out",
      "English": "English",
      "Spanish": "Spanish",

      // add student 
      "Add Student": "Add Student",
      "Student": "Student",
      "Enter Name" : "Enter Name",
      "Roll Number": "Roll Number",
      "Enter Roll Number": "Enter Roll Number",
      "Roll Number is required" : "Roll Number is required",
      "Full name is required": "Full name is required",
      "Father Name": "Father Name",
      "Enter Father's Name": "Enter Father's Name",
      "Father name is required": "Father name is required",
      "Mother Name": "Mother Name",
      "Enter Mother's Name": "Enter Mother's Name",
      "Mother name is required": "Mother name is required",
      "Date Of Birth": "Date Of Birth",
      "Register date of birth is required":"Register date of birth is required",
      "Phone Number": "Phone Number",
      "Enter Number": "Enter Number",
      "Phone number is required": "Phone number is required",
      "Phone number should contain exactly 10 digits":"Phone number should contain exactly 10 digits",
      "Class": "Class",
      "Enter Class": "Enter Class",
      "Class is required": "Class is required",
      "Section": "Section",
      "Section is required": "Section is required",
      "Gender": "Gender",
      "Male": "Male",
      "Female": "Female",
      "Other": "Other",
      "Gender is required": "Gender is required",
      "Address": "Address",
      "Enter Address": "Enter Address",
      "Address is required": "Address is required",
      "Profile Image": "Profile Image",
      "please upload image": "please upload image",
      "Successfully added new student": "Successfully added new student",

      // edit student 
      "Edit Student": "Edit Student",
      "Update" : "Update",
      "View Student" : "View Student",

      // student
      "Search Student": "Search Student",

      // Delete student
       "Delete Student": "Delete Student",
       "Are you sure you want to Delete": "Are you sure you want to Delete",
       "Cancel": "Cancel",
       "Confirm":  "Confirm",

    },
  },
  es: {
    translation: {
      "Action": "Acción",
      "Admin": "administración",
      "Profile": "Perfil",
      "Change Password": "Cambiar Contraseña",
      "Log Out": "Cerrar Sesión",
      "English": "Inglés",
      "Spanish": "Español",

      // add student 

      "Add Student": "Agregar Estudiante",
      "Student": "Estudiante",
      "Student Name": "Nombre del estudiante",
      "Enter Name" : "Ingrese su nombre",
      "Roll Number": "Número de Registro",
      "Enter Roll Number": "Ingrese el Número de Registro",
      "Roll Number is required":"Se requiere el número de rollo",
      "Full name is required": "Se requiere el nombre completo",
      "Father Name": "Nombre del Padre",
      "Enter Father Name": "Ingrese el Nombre del Padre",
      "Father name is required": "Se requiere el nombre del padre",
      "Mother Name": "Nombre de la Madre",
      "Enter Mother Name": "Ingrese el Nombre de la Madre",
      "Mother name is required": "Se requiere el nombre de la madre",
      "Date Of Birth": "Fecha de Nacimiento",
      "Register date of birth is required": "Se requiere registrar la fecha de nacimiento",
      "Phone Number": "Número de Teléfono",
      "Enter Number": "Ingrese el Número",
      "Phone number is required": "Se requiere el número de teléfono",
      "Phone number should contain exactly 10 digits": "El número de teléfono debe contener exactamente 10 dígitos",
      "Class": "Clase",
      "Enter Class": "Ingrese la Clase",
      "Class is required": "Se requiere la clase",
      "Section": "Sección",
      "Section is required": "Se requiere la sección",
      "Gender": "Género",
      "Male": "Masculino",
      "Female": "Femenino",
      "Other": "Otro",
      "Gender is required": "Se requiere género",
      "Address": "Dirección",
      "Enter Address": "Ingrese la Dirección",
      "Address is required": "Se requiere la dirección",
      "Profile Image": "Imagen de Perfil",
      "please upload image": "por favor suba la imagen",
      "Successfully added new student": "Estudiante nuevo agregado con éxito",

      // edit student 
      "Edit Student" : "Editar estudiante",
      "Update": "Actualizar",
      "View Student" : "Ver estudiante",

      // student
      "Search Student": "Buscar estudiante",

      // Delete 
      "Are you sure you want to Delete": "¿Estás segura de que quieres eliminar",
      "Delete Student" : "Eliminar estudiante",
      "Cancel": "Cancelar",
      "Confirm": "Confirmar",

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
