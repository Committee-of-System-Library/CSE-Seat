import { useState } from "react";
import styled from "styled-components";
import { PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import SeatingChartModal from "../components/organisms/SeatingChartModal";
import { useSetRecoilState } from "recoil";
import { seatingChartModalAtom } from "../components/others/state";
import { ColorTable } from "../components/molecules/ColorTables";

const ApplyForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 523px;
    height: 100%;
    background: #fff;
    @media(min-width: 768px){
        border: solid;
        border-width: 0 1px;
        border-color: #ddd;
        box-shadow: 0 -5px 4px 1px #dedede;
    }
`;

const Apply = ({ data }) => {
    const rooms = ["101", "104", "108"];
    const [isTimeHope, setIsTimeHope] = useState([true, true]);
    const [isRoomHope, setIsRoomHope] = useState([true, true, true]);
    const [seatHope, setSeatHope] = useState('');
    const [friendHope, setFriendHope] = useState(['', '', '']);
    const setIsOpenSeatModal = useSetRecoilState(seatingChartModalAtom);

    const clickTime = (prop) => {
        const tempTimeHope = isTimeHope.slice(0, 2);
        tempTimeHope[prop] = !tempTimeHope[prop];
        setIsTimeHope(tempTimeHope);
    }

    const clickRoom = (prop) => {
        const tempRoomHope = isRoomHope.slice(0, 3);
        tempRoomHope[prop] = !tempRoomHope[prop];
        setIsRoomHope(tempRoomHope);
    }

    const clickSeatModalBtn = () => {
        setIsOpenSeatModal(true);
    }

    const handleSeat = (e) => {
        setSeatHope(e.target.value);
    }

    const handleFriend = (index, e) => {
        const tempFriendHope = friendHope.slice(0, 3);
        tempFriendHope[index] = e.target.value;
        setFriendHope(tempFriendHope);
    }

    const handleRoom = () => {
        const checkRoomNum = isRoomHope.filter(prop => prop).length;
        return checkRoomNum === 0 ? rooms : isRoomHope.map((prop, index) => {
            if (prop) return rooms[index];
            return;
        }).filter(prop => prop !== undefined);
    }

    const handleTime = () => {
        const checkTime = isTimeHope.filter(prop => prop).length;
        return checkTime === 0 ? [true, true] : isTimeHope;
    }

    const submit = (e) => {
        // 신청 처리가 되면 문구 뜨면서 처리해야함.
        e.preventDefault();
        const room = handleRoom();
        const time = handleTime();
        // console.log(seatHope);
        // console.log(friendHope);

        fetch(process.env.NEXT_PUBLIC_API_URL + "/seat/reservation", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                building_id: "414",
                seat_room: room,
                seat_num: seatHope,
                isToday: false,
                part1: time[0],
                part2: time[1],
            })
        })
    }

    return (
        <PageDiv dis="flex" jus="center">
            <HeadTitle title="apply" />
            <ApplyForm>
                <div className="title">
                    자리 신청
                    <div>
                        <ColorTable color="#5C9EFF" length="14px">신청</ColorTable>
                        <ColorTable length="14px">비신청</ColorTable>
                    </div>
                </div>
                <div className="bar" />
                <div className="time">
                    <span>
                        원하는 시간<br /><br />
                        <span>체크 안할 시 풀타임</span>
                    </span>
                    <div className="timeBtn0" onClick={() => clickTime(0)}>1부<span>(06:00~18:00)</span></div>
                    <div className="timeBtn1" onClick={() => clickTime(1)}>2부<span>(18:00~06:00)</span></div>
                </div>
                <div className="bar" />
                <div className="room">
                    <span>
                        원하는 강의실<br />
                        <span>(중복 가능)</span><br /><br />
                        <span>체크 안할 시 임의 배정</span>
                    </span>
                    <div className="roomBtn0" onClick={() => clickRoom(0)}>101호</div>
                    <div className="roomBtn1" onClick={() => clickRoom(1)}>104호</div>
                    <div className="roomBtn2" onClick={() => clickRoom(2)}>108호</div>
                </div>
                <div className="bar" />
                <div className="seat">
                    <span>
                        원하는 자리<br /><br />
                        <span>미입력 시 임의 배정</span>
                    </span>
                    <input type="text"
                        placeholder="숫자만 입력"
                        onChange={handleSeat}
                        value={seatHope} />
                    <div><div className="seatModalBtn" onClick={clickSeatModalBtn}>자리 배치표</div></div>
                </div>
                <div className="bar" />
                <div className="room">
                    <span>
                        친구<br />
                        <span>(최대 3명)</span><br /><br />
                        <span>자리가 없을 시 따로 앉거나<br />일부 인원만 배정될 수 있음.</span>
                    </span>
                    <input type="text"
                        placeholder="학번 입력"
                        onChange={(e) => handleFriend(0, e)}
                        value={friendHope[0]} />
                    <input type="text"
                        placeholder="학번 입력"
                        onChange={(e) => handleFriend(1, e)}
                        value={friendHope[1]} />
                    <input type="text"
                        placeholder="학번 입력"
                        onChange={(e) => handleFriend(2, e)}
                        value={friendHope[2]} />
                </div>
                <button onClick={submit}>신청하기</button>
            </ApplyForm >
            <SeatingChartModal data={data} />
            <style jsx>{`
                .title{
                    display: flex;
                    justify-content: space-between;
                    padding: 50px 15% 0 10%;
                    width: 100%;
                    height: 70px;
                    font-size: 22px;
                }
                .title > div{
                    display: flex;
                    flex-direction: column;
                    height: 70px;
                    font-size: 12px;
                }
                .bar{
                    width: 85%;
                    height: 1px;
                    border:solid;
                    border-width: 1px 0 0 0;
                    border-color: #ddd;
                    margin: 30px 0;
                }
                div > span{
                    padding-left: 10px;
                    width: 100%;
                    font-size: 18px;
                }
                div > span > span{
                    font-size: 14px;
                }
                .time{
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    grid-template-columns: 200px 1fr;
                    justify-items: center;
                    align-items: center;
                    width: 80%;
                    height: 80px;
                    row-gap: 6px;  
                }
                .time > span{
                    grid-column: 1/1;
                    grid-row: 1/3;
                }
                .time > div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 140px;
                    height: 35px;
                    cursor: pointer;
                    letter-spacing: 1px;
                    font-size: 15px;
                    white-space: nowrap;
                    padding: 0 0 0 8px;
                }
                .time > div > span{
                    font-size: 12px;
                    letter-spacing: 0.5px;
                }
                .timeBtn0{
                    border:solid;
                    border-width: 1px;
                    ${(isTimeHope[0] ? `
                    background: #5C9EFF;
                    border-color: #5C9EFF;
                    color: #fff;
                    ` : `
                    background: #fff;
                    border-color: #ddd;
                    color: #000;
                    `)}
                }
                .timeBtn0 > span{
                    ${(isTimeHope[0] ? `
                    color: #fff;
                    ` : `
                    color: #000;
                    `)}
                }
                .timeBtn1{
                    border:solid;
                    border-width: 1px;
                    ${(isTimeHope[1] ? `
                    background: #5C9EFF;
                    border-color: #5C9EFF;
                    color: #fff;
                    ` : `
                    background: #fff;
                    border-color: #ddd;
                    color: #000;
                    `)}
                }
                .timeBtn1 > span{
                    ${(isTimeHope[1] ? `
                    color: #fff;
                    ` : `
                    color: #000;
                    `)}
                }
                .room{
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    grid-template-columns: 200px 1fr;
                    justify-items: center;
                    align-items: center;
                    width: 80%;
                    height: 120px;
                    row-gap: 6px;   
                }
                .room > span {
                    grid-column: 1/1;
                    grid-row: 1/4;
                }
                .room > div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 140px;
                    height: 35px;
                    cursor: pointer;
                    letter-spacing: 1px;
                }
                .roomBtn0{
                    border:solid;
                    border-width: 1px;
                    ${(isRoomHope[0] ? `
                    background: #5C9EFF;
                    border-color: #5C9EFF;
                    color: #fff;
                    ` : `
                    background: #fff;
                    border-color: #ddd;
                    color: #000;
                    `)}
                }
                .roomBtn1{
                    border:solid;
                    border-width: 1px;
                    ${(isRoomHope[1] ? `
                    background: #5C9EFF;
                    border-color: #5C9EFF;
                    color: #fff;
                    ` : `
                    background: #fff;
                    border-color: #ddd;
                    color: #000;
                    `)}
                }
                .roomBtn2{
                    border:solid;
                    border-width: 1px;
                    ${(isRoomHope[2] ? `
                    background: #5C9EFF;
                    border-color: #5C9EFF;
                    color: #fff;
                    ` : `
                    background: #fff;
                    border-color: #ddd;
                    color: #000;
                    `)}
                }
                .seat{
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    grid-template-columns: 200px 1fr;
                    justify-items: center;
                    align-items: center;
                    width: 80%;
                    height: 100px;
                    row-gap: 6px;
                }
                .seat > span{
                    grid-column: 1/1;
                    grid-row: 1/3;
                }
                input{
                    text-align: center;
                    width: 140px;
                    height: 35px;
                    border: 1px solid #ddd;
                    outline: none;
                    font-size: 14px;
                    align-self: end;
                }
                input::placeholder{
                    font-size: 12px;
                    color: #aaa;
                }
                .seat > div{
                    display: flex;
                    justify-content: flex-end;
                    width: 140px;
                    align-self: start;
                    padding-top: 3px;
                }
                .seat .seatModalBtn{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 110px;
                    height: 30px;
                    border: solid;
                    border-width: 1px;
                    border-color: #ddd;
                    font-size: 14px;
                    cursor: pointer;
                }

                button{
                    width: 140px;
                    height: 40px;
                    margin: 80px 0 40px 0;
                    outline: none;
                    border: solid;
                    border-width: 1px;
                    border-color: #5C9EFF;
                    border-radius: 0;
                    background: #5C9EFF;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    letter-spacing: 4px;
                    cursor: pointer;
                }
            `}</style>
        </PageDiv >
    )
}

export async function getStaticProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "GET",
    });
    const data = await res.json();

    return {
        props: { data }
    }
}

export default Apply;