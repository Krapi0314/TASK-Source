import './DarkMode.css'; 

const DarkMode = ({ darkTheme, onToggle }) => {
    return (
        <div className="preference_component wrapper">
            <h3>기본 설정</h3>
            <div className="theme_toggle">
                <span className="text">다크 모드</span>
                <label className="switch">
                    <input type="checkbox" checked={darkTheme} onChange={onToggle}></input>
                    <span className="slider"></span>
                </label>
                <p>밤에는 다크 모드를 켜는 것을 추천드려요.</p>
            </div>
        </div>
    );
}

export default DarkMode;