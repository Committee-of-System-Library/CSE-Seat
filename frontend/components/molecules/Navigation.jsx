import { MyLink } from "../atoms/Div";

const Navigation = () => {
    return (
        <>
            <div className="navDiv">
                <MyLink href="/" width="100%">
                    <span>자리 확인</span>
                </MyLink>
                <div></div>
                <MyLink href="/history" width="100%">
                    <span>내 기록 보기</span>
                </MyLink>
                {/* <div></div>
                <MyLink href="/apply" width="100%">
                    <span>자리 신청</span>
                </MyLink> */}
                {/*navDiv width 원래 400*/}
            </div>
            <style jsx>{`
            .navDiv{
                display:flex;
                width: 100%;
                align-items: center;
            }
            .navDiv div{
                width: 1px;
                height: 15px;
                background: #ddd;
                border:solid;
                border-width:1px;
                border-color:#ddd;
            }
            span{
                font-size: 16px;
                white-space: nowrap;
            }
            @media(min-width:768px){
                .navDiv{
                    width: 300px;
                    margin-left: 20px;
                }
            }
            @media(max-width:767px){
                .navDiv{
                    width: 100%;
                    height: 50px;
                    border-top: solid;
                    border-width: 1px;
                    border-color: #eee;
                }
            }
        `}</style>
        </>
    );
}

export default Navigation;