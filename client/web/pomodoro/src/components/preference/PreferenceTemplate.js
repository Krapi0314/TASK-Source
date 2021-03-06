import './PreferenceTemplate.css';
import DarkMode from "./DarkMode";
import TimerChange from "./TimerChange";

const PreferenceTemplate = ({ darkTheme, onToggle }) => {

    return (
        <div className="preference_template wrapper">
            <h1 style={{ fontSize: '3rem', marginBottom: '5%' }}>설정</h1>
            <ul>
                <li>
                    <TimerChange></TimerChange>
                </li>
                <li>
                    <DarkMode darkTheme={darkTheme} onToggle={onToggle}></DarkMode>
                </li>
            </ul>
        </div>
    );
}

export default PreferenceTemplate;