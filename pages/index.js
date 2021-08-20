import { useState } from "react";
import { Button, TimePicker } from "antd";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";

const IndexPage = () => {
  const defaultTotalTime = moment("00:30:00", "HH:mm:ss");
  const defaultStepTime = moment("00:01:00", "HH:mm:ss");
  const defaultDelayTime = moment("00:0:05", "HH:mm:ss");
  const referenceTime = moment("00:0:00", "HH:mm:ss");

  const [totalTime, setTotalTime] = useState(defaultTotalTime);
  const [stepTime, setStepTime] = useState(defaultStepTime);
  const [delayTime, setDelayTime] = useState(defaultDelayTime);

  const onSelectTotalTime = (time) => {
    setTotalTime(time);
  };
  const onSelectStepTime = (time) => {
    setStepTime(time);
  };
  const onSelectDelayTime = (time) => {
    setDelayTime(time);
  };
  const resetTotalTime = () => {
    setTotalTime(defaultTotalTime);
  };
  const resetStepTime = () => {
    setStepTime(defaultStepTime);
  };
  const resetDelayTime = () => {
    setDelayTime(defaultDelayTime);
  };

  const startCounting = () => {
    const baseCountingTime = moment();
    const baseTotalTime = totalTime;
    const baseStepTime = stepTime;
    const baseDelayTime = delayTime;

    do {
      countDownTotalTime(baseTotalTime, baseCountingTime);
      countDownDelayAndStep(baseDelayTime, baseStepTime, baseCountingTime);
    } while (totalTime.isBefore(moment().startOf("day")));
  };
  const countDownDelayAndStep = (
    baseDelayTime,
    baseStepTime,
    baseCountingTime
  ) => {
    countDownDelayTime(baseDelayTime, baseCountingTime);
    countDownStepTime(baseStepTime, baseCountingTime);
  };
  const countDownTotalTime = (baseTotalTime, baseCountingTime) => {
    setInterval(() => {
      setTotalTime(
        moment(baseTotalTime.diff(moment(moment().diff(baseCountingTime))))
      );
    }, 1000);
  };
  const countDownDelayTime = (baseDelayTime, baseCountingTime) => {
    setInterval(() => {
      const downCounter = moment(
        baseDelayTime.diff(moment(moment().diff(baseCountingTime)))
      );

      setDelayTime(downCounter);
      if (downCounter.isBefore(moment().startOf("day")))
        setDelayTime(baseDelayTime);
      return;
    }, 1000);
  };

  const countDownStepTime = (baseStepTime, baseCountingTime) => {
    setInterval(() => {
      const downCounter = moment(
        baseStepTime.diff(moment(moment().diff(baseCountingTime)))
      );
      setStepTime(downCounter);
      if (downCounter.isBefore(moment().startOf("day")))
        setStepTime(baseStepTime);
      return;
    }, 1000);
  };

  //utils
  const getMilSeconds = (moment) => {
    return moment.valueOf() - referenceTime.valueOf();
  };
  return (
    <div className="container">
      <div>
        <p>{JSON.stringify(stepTime)}</p>
        <TimePicker
          value={totalTime}
          placeholder="Total Time"
          onSelect={onSelectTotalTime}
          clearIcon=""
          suffixIcon=""
        />
        <Button
          onClick={resetTotalTime}
          style={{ border: "none" }}
          icon={<GrPowerReset />}
        ></Button>
        <TimePicker
          value={stepTime}
          placeholder="Step Time"
          onSelect={onSelectStepTime}
          clearIcon=""
          suffixIcon=""
        />
        <Button
          onClick={resetStepTime}
          style={{ border: "none" }}
          icon={<GrPowerReset />}
        ></Button>
        <TimePicker
          value={delayTime}
          placeholder="Delay Time"
          onSelect={onSelectDelayTime}
          clearIcon=""
          suffixIcon=""
        />
        <Button
          onClick={resetDelayTime}
          style={{ border: "none" }}
          icon={<GrPowerReset />}
        ></Button>
        <Button onClick={startCounting}> Start Counting</Button>
      </div>
    </div>
  );
};

export default IndexPage;
