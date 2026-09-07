
import { useTranslation } from 'react-i18next';
import './App.css'
import { Layout } from './components/layout/layout'

function App() {

    const { i18n } = useTranslation();
    const changeLanguage = () => {
    i18n.changeLanguage(
        i18n.language === "he" ? "en" : "he"
    );
};
    return (
        <Layout />
        
    )

    
}

export default App
