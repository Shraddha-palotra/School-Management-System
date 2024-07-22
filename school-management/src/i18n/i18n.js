import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDectector from 'i18next-browser-languagedetector';

const resources = {
     en: {
       translation: {
         "Action": "Action",
         "Admin": "Admin",
         "Profile": "Profile",
         "Change Password": "Change Password",
         "Log Out": "Log Out",
         "English": "English",
         "Spanish": "Spanish"
       }
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
       }
     }
   };
i18n
.use(LanguageDectector)
.use(initReactI18next)
.init({
     resources,
     fallbackLng: 'en',
     interpolation: {
          escapeValue: false
     }
});

export default i18n;