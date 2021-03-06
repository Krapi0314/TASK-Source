import { useEffect, useState } from 'react'
import DaydoItemList from './DaydoItemList'
import DaydoForm from './DaydoForm'
import './DaydoListTemplate.css'
import DaydoSlider from './DaydoSlider'
import { homepageURL, serverURL } from '../../config'

const DayDoListTemplate = ({ darkTheme }) => {
    const today = new Date();

    const [ allDaydoItemList, setAllDaydoItemList ] = useState([]);
    const [ daydoItemList, setDaydoItemList ] = useState([]);

    const [ formInput, setFormInput ] = useState('');
    const [ fetched, setFetched ] = useState(false);
    
    const userIdLocation = document.cookie.split('; ').find(row => row.startsWith('userId'));
    const userId = userIdLocation === undefined ? window.location.replace(homepageURL) : userIdLocation.split('=')[1];
    
    // 설정의 요일별 할 일 목록의 세팅되어 있는 요일
    // 기준은 JAVA 요일 시스템을 따름 (그 날의 요일)
    const [ day, setDay ] = useState(today.getDay() === 0 ? 7 : today.getDay()); 

    useEffect(() => { // 다크 모드 
        console.log()
        const inputs = document.querySelectorAll('input');
    
        if(darkTheme) {  
          inputs.forEach(input => input.classList.add('dark'));
        }
        else {
          inputs.forEach(input => input.classList.remove('dark'));
        }
      });
      
    // FETCH - POST
    useEffect(() => {
        // 서버로부터 모든 요일의 Daydo 목록 가져오기
        if(!fetched) {
            fetch(`${serverURL}/api/daydos`, {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(userId)
            })
            .then((response) => response.json())
            .then((items) => {
                console.log("서버로부터 모든 요일별 Daydo 목록 가져옴: ", items);
                setFetched(true);
                setAllDaydoItemList(items);
            });
        }

                    
        // 초기로 설정되어 있는 요일에 해당하는 요일별 할 일 목록 생성
        // !! Java에서 day = 1 ~ 7 : 월요일 ~ 일요일 | JavaScript에서 day = 0 ~ 6 : 일요일 ~ 토요일
        const defaultDaydoItemList = allDaydoItemList.filter(daydoItem => daydoItem.day === day);
            
        setDaydoItemList(defaultDaydoItemList);
    }, [fetched, allDaydoItemList, day]);

    // CREATE - POST 
    function handleCreate() {
        // Form 안의 내용을 초기화
        setFormInput('');

        // 서버로 보낼 객체 아이템 생성
        const newDaydoItem = {
            userId: userId,
            content: formInput,
            day: day
        };
        
        // POST 방식으로 서버 전송
        fetch(`${serverURL}/api/daydo`, {
            method : 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newDaydoItem)
        }) // 서버에서 받은 응답을 객체화 후, DaydoItemList에 추가 (컴포넌트 re-render됨)
        .then((response) => response.json())
        .then((newDaydoItem) => {
            console.log("새 Todo 아이템 생성됨: ", newDaydoItem);
            setDaydoItemList([...daydoItemList, newDaydoItem]);
            
            // 서버에서 다시 목록 가져오기
            setFetched(false);
         })
    }
    
    // REMOVE - DELETE
    function handleRemove(id) {
        // 서버와 클라이언트 따로따로 처리됨
        const updatedDaydoItemList = daydoItemList.filter(daydoItem => daydoItem.id !== id);
        const updatedAllDaydoItemList = allDaydoItemList.filter(daydoItem => daydoItem.id !== id);

        //서버
        fetch(`${serverURL}/api/daydo/${id}`, {
            method: 'DELETE',
            headers : {
                'content-type' : 'application/json'
            }           
        })
        .then((response) => response.json())
        .then((deletedId) => {
            console.log("ID:", deletedId, " 삭제됨");
        });

        // 클라이언트
        setDaydoItemList(updatedDaydoItemList);
        setAllDaydoItemList(updatedAllDaydoItemList);
    }
  
    // UPDATE (content) - PUT
    function handleDaydoInputChange(e, id) {
        // 서버와 클라이언트 따로따로 처리됨
        const index = daydoItemList.findIndex(daydoItem => daydoItem.id === id);
        const selectedItem = daydoItemList[index];
        selectedItem.content = e.target.value;

        // 서버
        fetch(`${serverURL}/api/daydo/${id}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(selectedItem)
        })
        .then((response) => response.json())
        .then((updatedId) => {
            console.log("ID:", updatedId, " 업데이트됨");
        });

        // 클라이언트
        const updatedDaydoItemList = [...daydoItemList];
        updatedDaydoItemList[index] = {
            ...selectedItem,
        };

        const allDayItemListIndex = allDaydoItemList.findIndex(daydoItem => daydoItem.id === id);
        const updatedAllDaydoItemList = [...allDaydoItemList];
        updatedAllDaydoItemList[allDayItemListIndex] = {
            ...selectedItem,
        };

        setDaydoItemList(updatedDaydoItemList);
        setAllDaydoItemList(updatedAllDaydoItemList);
    }

    function handleFormInputChange(e) {
        setFormInput(e.target.value);
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            handleCreate();
        }
    }

    function handleSlider(e) {
        if(e.target.className === 'right') {
            if(day === 7) {
                setDay(1);
            }
            else {
                setDay(day+1);
            }
        }
        else {
            if(day === 1) {
                setDay(7);
            }
            else {
                setDay(day-1);
            }
        }
    }

    
    return (
        <div className="template-wrapper daydo-list-template-wrapper">
            <div className="daydo-title-wrapper">
                <DaydoSlider day={day} onSlide={handleSlider}></DaydoSlider>
            </div>
            <p></p>
            <div className="daydo-list-wrapper">
                <DaydoItemList
                    day={day}
                    daydoList={daydoItemList}
                    onRemove={handleRemove}
                    onChange={handleDaydoInputChange}
                />
            </div>
            <div className="daydo-form-wrapper">
                <DaydoForm
                    value={formInput}
                    onChange={handleFormInputChange}
                    onCreate={handleCreate}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}

export default DayDoListTemplate;