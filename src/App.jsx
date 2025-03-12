import {useEffect, useState} from 'react'
import incoming from './assets/icons/incoming.svg'
import outgoing from './assets/icons/outgoing.svg'
import missed from './assets/icons/missed.svg'
import missedCall from './assets/icons/missed-call.svg'
import CustomSelect from './components/CustomSelect';

import './App.css'

function App() {

  const [calls, setCalls] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [sortBy, setSortBy] = useState('date');
  const [selectedValue, setSelectedValue] = useState('');
  const [filter, setFilter] = useState(false);

  const [inOut, setInOut] = useState('');

  const toggleOrder = () => {
    setOrder(prevOrder => prevOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        let  url = `https://api.skilla.ru/mango/getList?limit=150&order=${order}&sort_by=${sortBy}`;
        if (inOut && inOut.trim() !== '') {
          url += `&in_out=${inOut}`;
        }
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

        const ratedResults = data.results.map(item => {
          const random = Math.floor(Math.random() * 3) + 1;
          const messages = {
            1: 'Отлично',
            2: 'Нормально',
            3: 'Плохо',
          };
          const styles = {
            1: 'bg-[#DBF8EF] text-[#00A775] border border-[#00A775] rounded-md px-2 py-1.5',
            2: 'bg-[#E8EAF6] text-[#3F51B5] border border-[#3F51B5] rounded-md px-2 py-1.5',
            3: 'bg-[#FEE9EF] text-[#EC3665] border border-[#EC3665] rounded-md px-2 py-1.5',
          };

          const randomSource = Math.floor(Math.random() * 5) + 1;
          const source ={
            1: 'Rabota.ru',
            2: 'Санкт-Петербург',
            3: 'Google',
            4: 'Yandex',
            5: '',
          };

          return {
            ...item,
            rating: {
              value: random,
              message: messages[random],
              style: styles[random],
            },
            source: {
              name: source[randomSource],
            },
          };
        });

        setCalls(ratedResults);
      }catch (e){
        console.error(e);
      }
    };

    fetchCalls();
  }, [order,sortBy,inOut]);

  const options = [
    { value: '', label: 'Все типы' },
    { value: '1', label: 'Входящие' },
    { value: '0', label: 'Исходящие' },
  ];

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

console.log(calls)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
      <div className={'container max-w-[1440px] mx-auto'}>

        <div className={'flex justify-between items-center'}>
          <div className={'flex items-center'}>
            <CustomSelect
                options={options}
                value={selectedValue}
                onChange={handleSelectChange}
                setInOut={setInOut}
                setFilter={setFilter}
            />
            <div className={'group'}>
              {
                filter ? (
                    <button className={'text-[#5E7793] cursor-pointer group-hover:text-[#015EF5] transition duration-300 ease-linear'}
                            onClick={() => {
                              setFilter(false);
                              setSelectedValue('');
                              setInOut('')
                            }}>
                      Сбросить фильтры <span className={'text-[#ADBFDF] group-hover:text-[#015EF5] transition duration-300 ease-linear'}>x</span>
                    </button>
                ) : null
              }
            </div>
          </div>
        </div>
        <div className={'bg-white rounded-xl'}>
          <div className={'grid grid-cols-[5%_5%_10%_1fr_1fr_1fr_3fr] py-6 border-b border-[#EAF0FA] px-10'}>
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
            <div className={'flex items-center justify-end text-[#5E7793]'}>
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
                  className={'grid grid-cols-[5%_5%_10%_1fr_1fr_1fr_3fr] bg-white rounded-xl border-b border-[#EAF0FA] py-6 px-10 hover:bg-[#F8FAFD] transition duration-300 ease-linear'}
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
                  <span>{call.source.name}</span>
                </div>
                <div className={'flex items-center'}>
                  {call.rating && (
                      <span className={call.rating.style}>{call.rating.message}</span>
                  )}
                </div>
                <div className={'flex items-center justify-end'}>
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
