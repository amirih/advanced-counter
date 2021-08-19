import { useState } from "react";
import { Button, InputNumber, TimePicker } from "antd";
import { GrPowerReset } from "react-icons/gr";

const IndexPage = () => {
  const defaultTotalMinutes = 30;
  const defaultTotalSeconds = 0;

  const [totalMinutes, setTotalMinutes] = useState(defaultTotalMinutes);
  const [totalSeconds, setTotalSeconds] = useState(defaultTotalSeconds);

  const resetTotals = () => {
    setTotalMinutes(defaultTotalMinutes);
    setTotalSeconds(defaultTotalSeconds);
  };
  const inputNumber = () => (
    <div>
      <InputNumber
        value={totalMinutes}
        onChange={(e) => setTotalMinutes(e)}
        min={1}
        bordered={false}
        autoFocus
      />
      <InputNumber
        value={totalSeconds}
        onChange={(e) => setTotalSeconds(e)}
        min={0}
        bordered={false}
        autoFocus
      />
      <Button
        icon={<GrPowerReset />}
        style={{ border: "none" }}
        onClick={resetTotals}
      />
    </div>
  );

  return (
    <div className="container">
      {inputNumber()}
      {inputNumber()}
    </div>
  );
};

export default IndexPage;
