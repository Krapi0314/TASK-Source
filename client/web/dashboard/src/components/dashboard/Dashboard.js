import './Dashboard.css';
import { useEffect, useState } from "react";
import { homepageURL, serverURL } from '../../config'

function Dashboard({ passUserInfo }) {
    const [todoItems, setTodoItems] = useState([]);
    const [pomodoroItem, setPomodoroItem] = useState([]);
    const [isPatched, setIsPatched] = useState(false);

    const [userInfo, setUserInfo] = useState("");

    const [todoItemsCount, setTodoItemsCount] = useState(0);
    const [todoItemsDoneCount, setTodoItemsDoneCount] = useState(0);

    const [pomoCount, setPomoCount] = useState(0);
    const [pomoTotalCount, setPomoTotalCount] = useState(0);
    const [pomoTimer, setPomoTimer] = useState({});

    const userIdLocation = document.cookie.split('; ').find(row => row.startsWith('userId'));
    const userId = userIdLocation === undefined ? window.location.replace(homepageURL) : userIdLocation.split('=')[1];

    // Read
    useEffect(() => {
        if (!isPatched) {
            // GET 방식으로 서버 전송
            fetch(`${serverURL}/api/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userId)
            })
                .then((response) => response.json())
                .then((newUserInfo) => {
                    console.log("유저 정보 가져옴: ", { newUserInfo });
                    setUserInfo(newUserInfo);
                    passUserInfo(newUserInfo);

                    // User가 Fetch되면 todo, pomodoro Item Fetch하기
                    refreshDashboardItems();    
                });

            setIsPatched(true);
        }
    }, [isPatched]);

    useEffect(() => { // 임시
        calTodoItemsCount();
        calTodoItemsDoneCount();
        calPomdoroCount();
    }, [todoItems, pomodoroItem]);

    function refreshDashboardItems() {
        // Todo
        fetch(`${serverURL}/api/todos`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userId)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Todo Items: ", data);
                setTodoItems(data);
            });
        // Pomodoro
        fetch(`${serverURL}/api/pomodoro`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userId)
        })
            .then((response) => response.json())
            .then((info) => {
                console.log("서버로부터 Pomodoro 정보 가져옴: ", info.timerSet, info.pomo, info.maxPomo, info.totalPomo);
                setPomodoroItem(info);
            });
    }

    function calTodoItemsCount() {
        setTodoItemsCount(todoItems.length);
    }

    function calTodoItemsDoneCount() {
        setTodoItemsDoneCount(todoItems.filter(todoItem => todoItem.isDone).length);
    }

    function calPomdoroCount() {
        const timerSet = pomodoroItem.timerSet;

        setPomoCount(pomodoroItem.pomo);
        setPomoTotalCount(pomodoroItem.totalPomo);
        setPomoTimer({
            minutes: Math.floor(timerSet / 60),
            seconds: timerSet % 60
        });
    }

    return (
        <div className="dashboard">
            <div className="dashboard_user_info component">
                <img className="user_picture" src={userInfo.pictureUrl} alt={userInfo.name}></img><br></br>
                <h2 style={{ display: 'inline-block', marginBottom: '5%' }}>{userInfo.name}</h2><span>님의 대시보드</span>
                <span className="dashboard_refresh" onClick={refreshDashboardItems}> ↻</span>
                <hr></hr>
            </div>
            <div className="dashboard_content component">
                <div className="dashboard_daily_do">
                    <a href="./dailydo" target="_blank" rel="noreferrer"><div className="daily_do_app_picture"></div></a>
                    <h2>오늘 할 일</h2>
                    <ul>
                        <li><p>오늘 할 일 달성률</p><hr></hr><h1>{todoItemsCount !== 0 ? Math.round((todoItemsDoneCount / todoItemsCount) * 100) : '0'}%</h1></li>
                    </ul>
                </div>
                <div className="dashboard_pomodoro">
                    <a href="./pomodoro" target="_blank" rel="noreferrer"><div className="pomodoro_app_picture"></div></a>
                    <h2>뽀모도로</h2>
                    <ul>
                        <li><p>나의 집중력</p><hr></hr><h1>{isNaN(pomoTimer.seconds) ? '0분0초' : pomoTimer.minutes + '분' + pomoTimer.seconds + '초'}</h1></li>
                        <li><p>오늘 한 뽀모</p><hr></hr><h1>{pomoCount} 뽀모</h1></li>
                        <li><p>지금까지 한 총 뽀모</p><hr></hr><h1>{pomoTotalCount} 뽀모</h1></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;