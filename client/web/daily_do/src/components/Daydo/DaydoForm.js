import './DaydoForm.css';

const DaydoForm = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className="daydo-form">
            <span>+</span>   
            <input type="text" value={value} onChange={onChange} onKeyPress={onKeyPress}/>
            <button onClick={onCreate}>추가</button>
        </div>
    );
}

export default DaydoForm;