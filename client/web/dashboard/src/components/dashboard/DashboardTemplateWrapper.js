import { useEffect } from 'react';
import Dashboard from './Dashboard';
import './DashboardTemplateWrapper.css';
import Navigation from '../fixed/Navigation';

function DashboardTemplateWrapper({ darkTheme }) {

    useEffect(() => { // 랜더링 이후 다크 모드 설정 (추후 리팩토링)
        const navigation = document.querySelector('.navigation');
    
        if(darkTheme) {  
          navigation.classList.add('dark');
        }
        else {
          navigation.classList.remove('dark');
        }
      }, [ darkTheme ]);

    return (
    <div className="navigation-dashboard_wrapper">
        <Navigation></Navigation>
        <Dashboard></Dashboard>
    </div>
    );
  }
  
  export default DashboardTemplateWrapper;