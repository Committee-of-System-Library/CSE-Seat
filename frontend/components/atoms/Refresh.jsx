import { useState } from "react";
import { useRecoilState } from "recoil";
import { refreshIndexAtom } from "../others/state";
import SquareImg from "./Img";

const Refresh = () => {
    const [refreshData, setRefreshData] = useRecoilState(refreshIndexAtom);
    const [isReadyToRefresh, setIsReadyToRefresh] = useState(true);
    const [cycle, setCycle] = useState(0);

    const handleData = () => {
        setCycle(cycle + 1);
        if (!isReadyToRefresh) return;
        setIsReadyToRefresh(false);
        setRefreshData(!refreshData);
        setTimeout(() => {
            setIsReadyToRefresh(true);
        }, 1000);
    }

    return <>
        <div className="refreshData" onClick={handleData}>
            <SquareImg length="25px" src="images/refresh.png" />
        </div>
        <style jsx>{`
            .refreshData{
                display: flex;
                align-items:center;
                justify-content: center;
                transform: rotate(${(cycle * 360)}deg);
                width: 40px;
                height: 40px;
                transition: 1s;
                background: #fff;
                border: solid;
                border-radius: 50% 50%;
                border-width: 1px;
                border-color: #ccc;
                cursor: pointer;
            }    
        `}</style>
    </>
}

export default Refresh;