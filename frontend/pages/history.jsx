import { BorderDiv, PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import styled from "styled-components";
import SeatHistory from "../components/organisms/SeatHistory";
import { completeHistoryAtom } from "../components/others/state";
import { useRecoilValue } from "recoil";
import SquareImg from "../components/atoms/Img";

const HistoryDiv = styled(BorderDiv)`
    max-width: 723px;
`;

const History = () => {
    const completeHistoryData = useRecoilValue(completeHistoryAtom);

    return (
        <PageDiv dis="flex" ali="center" dir="column">
            <HeadTitle title="history" />
            <HistoryDiv>
                <div className="title">입퇴실 / 신청 기록 열람</div>
                {
                    completeHistoryData?.data.length === 0 ?
                        <div className="nothing">
                            <SquareImg
                                src="/images/nothing.png"
                                length="180px"
                                opacity="0.3" />
                            <span>신청 기록이 없습니다.</span>
                        </div>
                        :
                        <div className="seatHistorys">
                            {
                                completeHistoryData?.data.map((prop, index) => {
                                    const { apply: { time: applyTime }, date, part1, part1End, part2, state, want } = prop;
                                    const splitDate = date.split('-');
                                    const handledDate = `${splitDate[0]}년 ${splitDate[1][0] === '0' ? splitDate[1][1] : splitDate[1]}월 ${splitDate[2][0] === '0' ? splitDate[2][1] : splitDate[2]}일`
                                    return <SeatHistory
                                        key={prop, index}
                                        date={handledDate}
                                        part1={part1}
                                        part1End={part1End}
                                        part2={part2}
                                        state={state}
                                        detail={{ applyTime, want }}
                                    />
                                })
                            }
                        </div>
                }
            </HistoryDiv>
            <style jsx>{`
                .title{
                    padding: 6% 0 30px 4%;
                    width: 100%;
                    height: 100px;
                    font-size: 22px;
                }
                .seatHistorys{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background: #f9f9f9;
                }
                .nothing{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }
                .nothing > span{
                    margin-top: 30px;
                    font-size: 35px;
                    font-weight: 600;
                    color: #b3b3b3;
                }
            `}</style>
        </PageDiv>
    )
}

export default History;