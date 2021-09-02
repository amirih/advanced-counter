import { useState } from "react";
import { Button, TimePicker } from "antd";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";

//@review tips:
// 1.sum of total time and another timers are not equal

const IndexPage = () => {
  const defaultTotalTime = moment("00:00:16", "HH:mm:ss");
  const defaultStepTime = moment("00:00:04", "HH:mm:ss");
  const defaultDelayTime = moment("00:0:04", "HH:mm:ss");
  const referenceTime = moment("00:0:00", "HH:mm:ss");

  const [totalTime, setTotalTime] = useState(defaultTotalTime);
  const [stepTime, setStepTime] = useState(defaultStepTime);
  const [delayTime, setDelayTime] = useState(defaultDelayTime);

  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

  const enable = false;
  const disable = true;

  let baseTotalTime;
  let baseStepTime;
  let baseDelayTime;
  let baseStartTime;

  let startTime;
  let isStepTurn = true;

  let advancedInterval = undefined;

  const resetTotalTime = (time = defaultTotalTime) => {
    setTotalTime(time);
  };
  const resetStepTime = (time = defaultStepTime) => {
    setStepTime(time);
  };
  const resetDelayTime = (time = defaultDelayTime) => {
    setDelayTime(time);
  };

  const resetAllToDefault = () => {
    resetTotalTime();
    resetStepTime();
    resetDelayTime();
  };
  const resetAllToBase = () => {
    resetTotalTime(baseTotalTime);
    resetStepTime(baseStepTime);
    resetDelayTime(baseDelayTime);
  };

  const initialBaseTimes = () => {
    baseTotalTime = totalTime;
    baseStepTime = stepTime;
    baseDelayTime = delayTime;
    baseStartTime = moment();
    startTime = moment();
  };
  const updateButtons = (startButton, StopButton) => {
    setStartButtonDisabled(startButton);
    setStopButtonDisabled(StopButton);
  };
  const startCounting = () => {
    updateButtons(disable, enable);
    initialBaseTimes();

    advancedInterval = setInterval(() => {
      countTotalTimer();
      if (isStepTurn) {
        countStepTimer();
      } else {
        countDelayTimer();
      }
    }, 200);
  };

  const countTotalTimer = () => {
    const timer = getTimerValue(baseTotalTime, baseStartTime);

    if (timer <= referenceTime) {
      stopTotalTimer();
      updateButtons(disable, enable);
    } else {
      setTotalTime(timer);
    }
  };
  //------------------------------refactored and reviewed

  const countStepTimer = () => {
    const timer = getTimerValue(baseStepTime, startTime);
    if (timer <= referenceTime) {
      setStepTime(baseStepTime);

      startTime = getNewStartTime(baseStepTime, startTime);
      isStepTurn = false;
    } else {
      setStepTime(timer);
    }
  };

  const countDelayTimer = () => {
    const timer = getTimerValue(baseDelayTime, startTime);

    if (timer <= referenceTime) {
      setDelayTime(baseDelayTime);
      startTime = getNewStartTime(baseDelayTime, startTime);

      isStepTurn = true;
    } else {
      setDelayTime(timer);
    }
  };
  const getTimerValue = (baseTime, startTime) => {
    return moment(baseTime.diff(moment(moment().diff(startTime))));
  };
  const getNewStartTime = (baseTime, startTime) => {
    return moment(startTime.add(baseTime.valueOf() - referenceTime.valueOf()));
  };
  const stopCounting = () => {
    setStartButtonDisabled(false);
    setStopButtonDisabled(true);

    stopTotalTimer();
    stopStepTimerAndResetTo();
    stopDelayTimerAndResetTo();
  };
  const stopTotalTimer = () => {
    clearInterval(advancedInterval);
    resetAllToBase();
  };

  return (
    <div className="container">
      <div>
        <TimePicker
          value={totalTime}
          placeholder="Total Time"
          onSelect={resetTotalTime}
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
          onSelect={resetStepTime}
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
          onSelect={resetDelayTime}
          clearIcon=""
          suffixIcon=""
        />
        <Button
          onClick={resetDelayTime}
          style={{ border: "none" }}
          icon={<GrPowerReset />}
        ></Button>

        <Button onClick={resetAllToDefault}>Reset All</Button>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button onClick={startCounting} disabled={startButtonDisabled}>
          Start
        </Button>
        <Button onClick={stopCounting} disabled={stopButtonDisabled}>
          Stop
        </Button>
      </div>
    </div>
  );
};

export default IndexPage;
