import {useEffect, useState} from 'react'
import incoming from './assets/icons/incoming.svg'
import outgoing from './assets/icons/outgoing.svg'
import missed from './assets/icons/missed.svg'
import missedCall from './assets/icons/missed-call.svg'

import './App.css'

function App() {

  const [calls, setCalls] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [sortBy, setSortBy] = useState('date');


  const toggleOrder = () => {
    setOrder(prevOrder => prevOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const url = `https://api.skilla.ru/mango/getList?limit=150&order=${order}&sort_by=${sortBy}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer testtoken',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCalls(data.results);
      }catch (e){
        console.error(e);
      }
    };

    fetchCalls();
  }, [order,sortBy]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

console.log(calls)
  return (
      <div className={'container max-w-[1440px] mx-auto'}>
        <button onClick={toggleOrder}>
          Сортировать: {order === 'ASC' ? 'По возрастанию' : 'По убыванию'}
          {}
        </button>
        <div className={'flex justify-between items-center'}>

        </div>
        <div className={'bg-white px-10 rounded-xl'}>
          <div className={'grid grid-cols-[5%_5%_10%_3fr_1fr_1fr_1fr] py-6 border-b border-[#EAF0FA]'}>
            <div className={'flex items-center text-[#5E7793]'}>Тип</div>
            <div className={'flex items-center text-[#5E7793]'}>
              <button onClick={() => {
              toggleOrder();
              setSortBy('date');
            }}>
              Время: {order === 'ASC' ? '↑' : '↓'}
              </button>
            </div>
            <div className={'flex items-center text-[#5E7793]'}>Сотрудники</div>
            <div className={'flex items-center text-[#5E7793]'}>Звонок</div>
            <div className={'flex items-center text-[#5E7793]'}>Источник</div>
            <div className={'flex items-center text-[#5E7793]'}>Оценка</div>
            <div className={'flex items-center text-[#5E7793]'}>
              <button onClick={() => {
                toggleOrder();
                setSortBy('duration');
              }}>
                Длительность: {order === 'ASC' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          {calls.map((call, index) => (
              <div
                  className={'grid grid-cols-[5%_5%_10%_3fr_1fr_1fr_1fr] bg-white rounded-xl border-b border-[#EAF0FA] py-6'}
                  key={index}>
                <div className={'flex items-center'}>
                  {call.in_out === 1 ? (
                      call.status === 'Дозвонился' ? (
                          <img src={incoming} alt=""/>
                      ) : call.status === 'Не дозвонился' ? (
                          <img src={missed} alt=""/>
                      ) : null
                  ) : call.in_out === 0 ? (
                      call.status === 'Дозвонился' ? (
                          <img src={outgoing} alt=""/>
                      ) : call.status === 'Не дозвонился' ? (
                          <img src={missedCall} alt=""/>
                      ) : null
                  ) : null
                  }
                </div>
                <div className={'flex items-center'}>{call.date.match(/\d{2}:\d{2}/)[0]}</div>
                <div className={'flex items-center'}><img className={'rounded-[50%] w-[32px] h-[32px]'}
                                                          src={call.person_avatar} alt=""/></div>
                <div className={'flex flex-col justify-center'}>
                  {call.contact_name ? (
                      <>
                        <span className={'block'}>{call.contact_name}</span>
                        <span
                            className={'block text-[#5E7793]'}>{call.partner_data.name ? call.partner_data.name : '+ ' + call.partner_data.phone}</span>
                      </>
                  ) : (
                      <>
                        <span className={'block'}>{'+ ' + call.partner_data.phone}</span>
                      </>
                  )
                  }
                </div>
                <div className={'flex items-center text-[#5E7793]'}>
                  {

                  }
                </div>
                <div className={'flex items-center'}><span
                    className={'bg-[#DBF8EF] text-[#00A775] border border-[#00A775] rounded-md px-2 py-1.5'}>Отлично</span>
                </div>
                <div className={'flex items-center'}>
                  {
                    formatTime(call.time) !== '00:00' ? (
                        <>{formatTime(call.time)}</>
                    ) : null
                  }
                </div>
              </div>
          ))
          }
        </div>

      </div>
  )
}

export default App
