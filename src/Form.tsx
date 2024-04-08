import React from "react";
import { useState } from 'react';
import { useRef } from 'react';

import './views/index.css';

const Form = () => {

    // ここを追加
    const diceRef = useRef<HTMLInputElement>(null);
    const targetRef = useRef<HTMLInputElement>(null);
    // const [dice, setDice] = useState("0");
    // const [target, setTarget] = useState("0");
    const [critical, setCritical] = useState("0");
    const [avarage, setAvarage] = useState("0");
    const [maximum, setMaximum] = useState("0");
    const [diceError, setDiceError] = useState('')
    const [targetError, setTargetError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!diceRef.current) return;
        if (!targetRef.current) return;

        const diceValue: string = String(diceRef.current.value);
        const targetValue: string = String(targetRef.current.value);
        const diceNum: number = Number(diceRef.current.value);
        const targetNum: number = Number(targetRef.current.value);

        if (diceValue == "0" || isNaN(diceNum)) {
            setDiceError("1以上の半角数字を入力してください。");
        } else {
            setDiceError("");
        }

        if (targetValue == "0" || targetNum > 6 || isNaN(targetNum)) {
            setTargetError("1～6の半角数字を入力してください。");
        } else {
            setTargetError("");
        }

        if (diceValue == "" || targetValue == "" || diceValue == "0" || targetValue == "0" || isNaN(diceNum) || isNaN(targetNum)) {
            setAvarage("0");
            setMaximum("0");
            setCritical("0");
        } else {
            //正常ケース
            const critical: string = String((1 / 6 * diceNum));
            const average: string = String(((targetNum / 6 * diceNum) + (1 / 6 * diceNum)));
            const maximum: string = String(diceNum * 2);
            setAvarage(average);
            setMaximum(maximum);
            setCritical(critical);
        }
    };
    return (
        <div className="formContainer">
            <form>
                <h2>リヴァルチャー判定ダイス計算</h2><hr />
                <div className='uiForm'>
                    <div className='formField'>
                        ダイス数：<input type="text" ref={diceRef} onBlur={handleChange} />
                        {diceError && <label>{diceError}</label>}
                    </div>
                    <div className='formField'>
                        目標値：<input type="text" ref={targetRef} onBlur={handleChange} />
                        {targetError && <label>{targetError}</label>}
                    </div>
                </div >
                <h2>結果</h2><hr />
                平均ヒット数：{avarage}<br />
                最大ヒット数：{maximum}<br />
                クリティカル率：{critical}<br />
            </form>
        </div>
    );
};

export default Form;